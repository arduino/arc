import React from 'react';
import { FormikErrors, FormikTouched } from 'formik';
import classNames from 'classnames';
import { SupportField, ConfigFieldInterface } from './SupportField';
import { Button } from '../button';

import style from './form.module.scss';
import { FormLayoutRow } from './FormLayoutRow';

interface FormLayoutFieldProps {
  field: ConfigFieldInterface;
  formValues: Record<string, any>;
  errors: FormikErrors<unknown>;
  touched: FormikTouched<unknown>;
}
export function FormLayoutField({ field, formValues, touched, errors }: FormLayoutFieldProps): React.ReactElement {
  // check if the field has a parent
  if (field.showOnParentField && field.showOnParentField.length > 0) {
    let fieldIsShown = false;

    // for every parent check their values
    for (const parentField of field.showOnParentField) {
      const parentValues = parentField.parentFieldId in formValues ? formValues[parentField.parentFieldId] : [];
      // normalize parent values to array. This makes checking easier
      const parentValuesArray = Array.isArray(parentValues) ? parentValues : [parentValues];

      if (parentValuesArray.includes(parentField.parentFieldValue)) {
        fieldIsShown = true;
        break;
      }
    }

    // if the field is not show, cleanup existing state in the form
    if (!fieldIsShown) {
      delete formValues[field.id];
      delete errors[field.id];
      delete touched[field.id];
      return null;
    }
  }

  return field.generateFn ? null : (
    <SupportField
      key={field.id}
      error={errors[field.id]}
      touched={touched[field.id]}
      fieldConfig={field}
      value={formValues[field.id] || ''}
    />
  );
}

interface FormLayoutProps {
  fields: ConfigFieldInterface[][];
  values: any;
  errors: FormikErrors<unknown>;
  touched: FormikTouched<unknown>;
  inlineSubmit: boolean;
  submitClass?: string;
  submitForm: () => Promise<any>;
  isValid: boolean;
  submitting: boolean;
  mustBeConfirmed: boolean;
}
function _FormLayout({
  fields,
  values: formValues,
  errors,
  touched,
  inlineSubmit,
  submitClass,
  submitForm,
  isValid,
  submitting,
  mustBeConfirmed,
}: FormLayoutProps): React.ReactElement {
  const submitBtn = (
    <div
      className={classNames(style.field, style.submitButton, submitClass, 'submit_btn', {
        [style.inlineSubmit]: inlineSubmit,
      })}
      key="submit_btn"
    >
      <div>
        <Button
          onPress={submitForm}
          {...{ disabled: !isValid || submitting }}
          loading={submitting}
          className={classNames('submitBtn')}
        >
          {mustBeConfirmed ? 'Next' : 'Submit'}
        </Button>
      </div>
    </div>
  );

  const rows = [];
  for (let index = 0; index < fields.length; index++) {
    const renderFields = fields[index].map((field) => (
      <FormLayoutField field={field} formValues={formValues} errors={errors} touched={touched} key={field.id} />
    ));

    // if on the last row add the submit button
    if (index === fields.length - 1 && inlineSubmit) {
      renderFields.push(submitBtn);
    }
    rows.push(<FormLayoutRow key={index}>{renderFields}</FormLayoutRow>);
  }

  // if not inlineSubmit, put the submitButton in a new row
  if (!inlineSubmit) {
    rows.push(<FormLayoutRow key={fields.length}>{submitBtn}</FormLayoutRow>);
  }

  return <>{rows}</>;
}
export const FormLayout = React.memo(_FormLayout);
