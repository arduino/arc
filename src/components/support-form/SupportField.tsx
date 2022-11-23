import * as React from 'react';
import classNames from 'classnames';
import { FastField, FormikErrors, FormikTouched, FormikValues } from 'formik';

import {
  SupportSelect,
  SupportCheckbox,
  SupportInput,
  SupportUploadInput,
  SupportTextarea,
  Empty,
  SupportPhoneInput,
  HLine,
  SupportCheckboxGroup,
  SupportRadioGroup,
  SupportAddress,
} from './FieldTypes';

import style from './form.module.scss';

interface ConfigFieldValueInterface {
  label?: string;
  tags?: string[];
  value: string;
  infoMsg?: string;
}

/**
 * This interface is extensively documentated in SupportForm.mdx file.
 * Refer to it for usage informations
 */
export interface ConfigFieldInterface {
  id: string;
  customId?: number; // zendesk custom field ID. If setted, the field value will be copied to zendesk
  attachToBody?: boolean; // if true, include the field in the body message
  type:
    | 'input'
    | 'select'
    | 'checkbox'
    | 'checkboxgroup'
    | 'radiogroup'
    | 'email'
    | 'textarea'
    | 'address'
    | 'empty'
    | 'phone'
    | 'hr-line'
    | 'file';
  label?: string;
  generateFn?: (from: FormikValues) => string;
  placeholder?: string;
  values?: ConfigFieldValueInterface[];
  isMulti?: boolean;
  disabled?: boolean;
  infoMsg?: string;
  tags?: string[];
  required?: boolean;
  readonly?: boolean;
  minLen?: number;
  maxLen?: number;
  initialValue?: string;
  showOnParentField?: { parentFieldId: string; parentFieldValue: string }[];
  children?: React.ReactElement;
  helperText?: string;
}

interface SupportFieldProps {
  error: FormikErrors<any>;
  touched: FormikTouched<any>;
  fieldConfig: ConfigFieldInterface;
  value: any;
}

function _SupportField(props: SupportFieldProps): React.ReactElement {
  const { error, touched, fieldConfig } = props;

  let component = null;
  let validate = null;

  switch (fieldConfig.type) {
    case 'checkbox':
      component = SupportCheckbox;
      break;

    case 'checkboxgroup':
      component = SupportCheckboxGroup;
      break;

    case 'radiogroup':
      component = SupportRadioGroup;
      break;

    case 'select':
      component = SupportSelect;
      break;

    case 'textarea':
      component = SupportTextarea;
      break;

    case 'input':
    case 'email':
      component = SupportInput;
      break;

    case 'phone':
      component = SupportPhoneInput;
      break;

    case 'address':
      component = SupportAddress;
      validate = (value) => {
        if (fieldConfig.required && (!value || value.address.length === 0)) {
          return 'Required';
        }
        if (value && value.address.length > 0 && value.address.length < 10) {
          return 'Address is too short';
        }
        if (value && value.address.length > 0 && (value.lat === null || value.lng === null)) {
          return 'Invalid Address';
        }
      };
      break;

    case 'empty':
      component = Empty;
      break;

    case 'hr-line':
      component = HLine;
      break;

    case 'file':
      component = SupportUploadInput;
      break;

    default:
      break;
  }

  return (
    <div className={classNames(style.field, 'field')}>
      <FastField
        name={fieldConfig.id}
        component={component}
        validate={validate}
        fieldConfig={fieldConfig}
        error={error}
        touched={touched}
      />
    </div>
  );
}
export const SupportField = React.memo(_SupportField);
