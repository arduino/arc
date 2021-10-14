import React, { useReducer, useState } from 'react';
import { Formik, Form, FormikProps } from 'formik';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import classNames from 'classnames';
import { ConfigFieldInterface } from './SupportField';
import { FormLayout } from './FormLayout';
import { addRequesterFields, buildValidationShape, form2Ticket, postTicket, fillFields } from './utils';
import { Button } from '../button';

import style from './form.module.scss';
import { FormConfirm } from './FormConfirm';
import { WithBemClasses } from '../utils';

/**
 * This interface is extensively documentated in SupportForm.mdx file.
 * Refer to it for usage informations
 */
export interface FormConfigInterface {
  title: string | React.ReactNode | null;
  footer?: string | React.ReactNode;
  inlineSubmit?: boolean;
  reCaptchaKey: string;
  reCaptchaLanguage?: string;
  useRecaptchaNet?: boolean;
  onSubmissionMessage: string | React.ReactNode;
  mustBeConfirmed?: boolean;
  tags?: string[];
  endpoint?: string;
  onSubmit?: (formValues) => Promise<Response>;
  onSuccess?: (formValues) => void;
  fields: ConfigFieldInterface[][];
}

export interface SupportFormPropsInterface extends WithBemClasses {
  /** form configuration. Read SupportForm.mdx file for additional documentation */
  config: FormConfigInterface;
}

interface formState {
  submitting: boolean;
  phase: 'collect' | 'confirm' | 'submitted';
}
type formStateActions = 'reset' | 'send' | 'requireConfirm' | 'done' | 'sendFail';
const formInitialState: formState = { submitting: false, phase: 'collect' };

function formStateReducer(state: formState, action: { type: formStateActions }): formState {
  switch (action.type) {
    case 'reset':
      return { ...state, submitting: false, phase: 'collect' };
    case 'send':
      return { ...state, submitting: true };
    case 'sendFail':
      return { ...state, submitting: false };
    case 'requireConfirm':
      return { ...state, phase: 'confirm' };
    case 'done':
      return { ...state, phase: 'submitted', submitting: false };
    default:
      throw new Error();
  }
}

function SupportFormInner(props: SupportFormPropsInterface): React.ReactElement {
  const config = addRequesterFields(props.config);

  const fieldsFlatArray = config.fields.reduce((prev, curr) => [...prev, ...curr], []);

  const initialValues = fieldsFlatArray.reduce((prev, curr) => {
    let value = '';
    if (curr.initialValue) {
      value = curr.initialValue;
    }

    return { ...prev, [curr.id]: value };
  }, {});

  const validationSchema = buildValidationShape(fieldsFlatArray);

  const [formState, dispatchFormState] = useReducer(formStateReducer, formInitialState);

  const [submissionError, setSubmissionError] = useState('');

  const { executeRecaptcha } = useGoogleReCaptcha();

  async function nextFormPhaseHandler(values: Record<string, string>, actions): Promise<void> {
    if (formState.submitting) {
      return;
    }

    // handle next phase depending on the current one and the config
    if (formState.phase === 'collect' && config.mustBeConfirmed) {
      dispatchFormState({ type: 'requireConfirm' });
      return;
    }

    dispatchFormState({ type: 'send' });
    setSubmissionError('');

    const token = await executeRecaptcha('supportform');

    const withAutomaticFields = { ...values, ...fillFields(values, fieldsFlatArray) };

    const ticket = form2Ticket(withAutomaticFields, fieldsFlatArray, config.tags || []);

    // Create a promise that rejects after 15seconds
    // So that users stop waiting in vain if there are network/backend issues
    const timeout = new Promise((resolve, reject) => {
      const id = setTimeout(() => {
        clearTimeout(id);
        reject('Timed out');
      }, 15000);
    });

    let submitPromise = null;
    if (config.onSubmit) {
      submitPromise = config.onSubmit(withAutomaticFields);
    } else {
      submitPromise = postTicket(ticket, token, config.endpoint);
    }

    Promise.race([submitPromise, timeout])
      .then((response) => {
        if (!response.ok) {
          dispatchFormState({ type: 'sendFail' });
          setSubmissionError('Something went wrong. Please try again later.');
        } else {
          actions.resetForm();
          dispatchFormState({ type: 'done' });

          if (config.onSuccess) {
            config.onSuccess(withAutomaticFields);
          }
        }
      })
      .catch(() => {
        setSubmissionError('Something went wrong. Please try again later.');
        dispatchFormState({ type: 'sendFail' });
      });
  }

  return (
    <div className={classNames(style.supportForm, 'supportForm', props.className)}>
      {config.title && <h1 className={classNames(style.formTitle, 'formTitle')}>{config.title}</h1>}
      {formState.phase === 'submitted' && (
        <div className={classNames(style.submissionMessage, 'submissionMessage')}>
          {typeof config.onSubmissionMessage === 'string'
            ? config.onSubmissionMessage.split('\n').map((row, i) => <p key={i}>{row}</p>)
            : config.onSubmissionMessage}
          <div className={classNames(style.backButtonWrapper, 'backButtonWrapper')}>
            <Button
              className={classNames(props.className)}
              onPress={(): void => {
                dispatchFormState({ type: 'reset' });
              }}
            >
              Enter another request
            </Button>
          </div>
        </div>
      )}
      {(formState.phase === 'collect' || formState.phase === 'confirm') && (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={nextFormPhaseHandler}>
          {({
            values,
            errors,
            touched,
            submitForm,
            isValid,
          }: FormikProps<Record<string, unknown>>): React.ReactElement => (
            <Form className={classNames(style[formState.phase], `supportForm--${formState.phase}`)}>
              {formState.phase === 'collect' && (
                <FormLayout
                  values={values}
                  errors={errors}
                  touched={touched}
                  fields={config.fields}
                  inlineSubmit={config.inlineSubmit || false}
                  submitForm={submitForm}
                  isValid={isValid}
                  submitting={formState.submitting}
                  mustBeConfirmed={config.mustBeConfirmed}
                />
              )}
              {formState.phase === 'confirm' && (
                <FormConfirm
                  values={values}
                  fields={config.fields}
                  submitForm={submitForm}
                  backFn={() => {
                    dispatchFormState({ type: 'reset' });
                  }}
                  submitting={formState.submitting}
                />
              )}
              {submissionError.length > 0 && (
                <div className={classNames(style.submissionError, 'supportRow')}>{submissionError}</div>
              )}
              <div className={classNames(style.recaptchaTerms, 'supportRow')}>
                This site is protected by reCAPTCHA and the Google{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">
                  Terms of Service
                </a>{' '}
                apply.
              </div>
            </Form>
          )}
        </Formik>
      )}
      {config.footer && <div className={classNames(style.formFooter, 'formFooter')}>{config.footer}</div>}
    </div>
  );
}

export function SupportForm(props: SupportFormPropsInterface): React.ReactElement {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={props.config.reCaptchaKey}
      language={props.config.reCaptchaLanguage || null}
      useRecaptchaNet={props.config.useRecaptchaNet || null}
    >
      <SupportFormInner {...props} />
    </GoogleReCaptchaProvider>
  );
}
