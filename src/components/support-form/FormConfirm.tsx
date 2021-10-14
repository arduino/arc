import React from 'react';
import classNames from 'classnames';
import { ConfigFieldInterface } from './SupportField';
import { Button } from '../button';

import style from './form.module.scss';
import { FormLayoutRow } from './FormLayoutRow';
import { SupportCheckbox, Empty, HLine } from './FieldTypes';
import { TextWithLink } from '../textWithLink';

interface FormLayoutConfirmFieldProps {
  field: ConfigFieldInterface;
  formValues: Record<string, any>;
}
export function FormLayoutConfirmField({ field, formValues }: FormLayoutConfirmFieldProps): React.ReactElement {
  // check if the fields has a correspondin value or if it's hidden
  if (!formValues.hasOwnProperty(field.id) || field.generateFn || field.disabled) {
    return null;
  }

  let innercComp = null;

  switch (field.type) {
    case 'hr-line':
      innercComp = <HLine />;
      break;

    case 'empty':
      innercComp = <Empty fieldConfig={field} />;
      break;

    case 'checkbox':
      const cbConfig = {
        field,
        fieldConfig: { ...field, readonly: true },
        touched: null,
        error: null,
        initialValue: formValues[field.id],
      };
      innercComp = <SupportCheckbox {...cbConfig} />;
      break;

    default:
      let values = formValues[field.id];

      if (Array.isArray(formValues[field.id])) {
        values = formValues[field.id].join(', ');
      }

      if (field.type === 'address') {
        values = formValues[field.id].address;
      }

      innercComp = (
        <>
          <span className={classNames(style.fieldConfirmLabel, 'field__label')}>
            <TextWithLink text={field.label} />:
          </span>
          <span className={classNames(style.fieldConfirmValue, 'field__value')}>{values || '<no value>'}</span>{' '}
        </>
      );
      break;
  }

  return <div className={classNames(style.field, 'field')}>{innercComp}</div>;
}

interface FormConfirmProps {
  fields: ConfigFieldInterface[][];
  values: any;
  backFn: () => void;
  submitForm: () => Promise<any>;
  submitting: boolean;
}
function _FormConfirm({
  fields,
  values: formValues,
  submitForm,
  backFn,
  submitting,
}: FormConfirmProps): React.ReactElement {
  const confirmRow = (
    <div className={classNames(style.field, style.confirmButtons)} key="confirm_btn">
      <div>
        <Button onPress={backFn} {...{ isDisabled: submitting }} variant="secondary" className={classNames('backBtn')}>
          Back
        </Button>
      </div>
      <div>
        <Button
          onPress={submitForm}
          {...{ isDisabled: submitting }}
          loading={submitting}
          className={classNames('submitBtn')}
        >
          Submit
        </Button>
      </div>
    </div>
  );

  const rows = [];
  for (let index = 0; index < fields.length; index++) {
    const renderFields = fields[index].map((field) => (
      <FormLayoutConfirmField field={field} formValues={formValues} key={field.id} />
    ));

    rows.push(<FormLayoutRow key={index}>{renderFields}</FormLayoutRow>);
  }

  // Add the back / confirm row
  rows.push(<FormLayoutRow key={fields.length}>{confirmRow}</FormLayoutRow>);

  return <>{rows}</>;
}
export const FormConfirm = React.memo(_FormConfirm);
