import React from 'react';
import classnames from 'classnames';
import { FieldAttributes, FormikBag } from 'formik';
import { IconStatusInformationItalicNormal } from '@bcmi-labs/react-icons';

import { Select, SelectProps } from '../select';
import { Input, InputProps } from '../input/input';
import { PhoneInput, PhoneInputProps } from '../phoneInput/PhoneInput';
import { Textarea, TextareaProps } from '../input/textarea';
import { Checkbox, CheckboxProps } from '../checkbox/Checkbox';
import { CheckboxGroupItem } from '../checkbox/CheckboxGroupItem';
import { RadioGroupItem } from '../checkbox/RadioGroupItem';
import { CheckboxGroup, CheckboxGroupProps } from '../input/group/CheckboxGroup';
import { RadioGroup, RadioGroupProps } from '../input/group/RadioGroup';
import { Address, AddressProps } from '../input/address';

import style from './form.module.scss';
import { ConfigFieldInterface } from './SupportField';
import { GenericFieldProps } from '../utils';
import { WrapperProps } from '../wrapper';

import { TriggerIcon } from '../TriggerIcon/';
import { PopoverTrigger } from '../dialogs/popover/PopoverTrigger';

interface CommonFieldInterface {
  field: FieldAttributes<any>;
  initialValue?: any;
  fieldConfig: ConfigFieldInterface;
  touched: boolean;
  error: string;
  form?: FormikBag<any, any>;
}

interface configFieldProps extends GenericFieldProps, WrapperProps {
  minlen: number | null;
  maxlen: number | null;
}
function useConfigFieldProps({
  fieldConfig,
  touched,
  error,
}: Pick<CommonFieldInterface, 'fieldConfig' | 'touched' | 'error'>): configFieldProps {
  return {
    label: fieldConfig.label || fieldConfig.id,
    isDisabled: fieldConfig.disabled || false,
    isRequired: fieldConfig.required || false,
    isReadOnly: fieldConfig.readonly || false,
    error: error && touched ? error : null,
    infoMsg: error && touched ? null : fieldConfig.infoMsg,
    placeholder: fieldConfig.placeholder || null,
    minlen: fieldConfig.minLen || null,
    maxlen: fieldConfig.maxLen || null,
    name: fieldConfig.id,
    id: fieldConfig.id,
    children: fieldConfig.children || null,
    helper: !!fieldConfig.helperText ? (
      <PopoverTrigger
        TriggerElement={
          <TriggerIcon
            tiny={true}
            className={classnames(style['help-button-trigger'], {
              [style['help-button-trigger--absolute']]:
                fieldConfig.type !== 'checkboxgroup' && fieldConfig.type !== 'radiogroup',
            })}
          >
            <IconStatusInformationItalicNormal />
          </TriggerIcon>
        }
        isDismissable={true}
        popoverPlacement="right-end"
      >
        {fieldConfig.helperText}
      </PopoverTrigger>
    ) : null,
  };
}

export function SupportSelect({
  field,
  fieldConfig,
  form,
  touched,
  error,
  initialValue,
}: CommonFieldInterface): React.ReactElement {
  const configProps = { ...useConfigFieldProps({ fieldConfig, error, touched }) };

  const options = Array.isArray(fieldConfig.values)
    ? fieldConfig.values.map((val) => {
        return { value: val.value.toString(), label: val.label || val.value.toString(), infoMsg: val.infoMsg };
      })
    : [];

  let defaultValues = initialValue || null;
  if (field.value) {
    defaultValues = field.value;
  }

  defaultValues = (Array.isArray(defaultValues) ? defaultValues : [defaultValues]).filter((v) => !!v);

  const selectProps: SelectProps = {
    ...configProps,
    options,
    defaultValue: defaultValues,
    onChange: (value) => {
      // select component with isMulti sets value to [] when it's clearable
      // we need to manually reset it to "" to have checks on parentFieldValue
      // working correctly
      if (Array.isArray(value) && value.length === 0) {
        value = '';
      }

      form.setFieldValue(field.name, value);
    },
    onBlur: field.onBlur,
    isMulti: fieldConfig.isMulti || false,
  };

  return <Select {...selectProps} />;
}

export function SupportCheckbox({
  field,
  fieldConfig,
  touched,
  error,
  form,
  initialValue,
}: CommonFieldInterface): React.ReactElement {
  const configProps = { ...useConfigFieldProps({ fieldConfig, error, touched }) };

  let defaultSelected = initialValue || false;
  if (field.value) {
    defaultSelected = field.value;
  }

  const checkboxProps: CheckboxProps = {
    ...configProps,
    value: 'true',
    defaultSelected,
    onChange: (value) => {
      form.setFieldValue(field.name, value.target.checked ? value.target.checked.toString() : '');
    },
    onBlur: field.onBlur,
  };

  return <Checkbox {...checkboxProps} />;
}

export function SupportCheckboxGroup({
  field,
  fieldConfig,
  touched,
  error,
  form,
  initialValue,
}: CommonFieldInterface): React.ReactElement {
  const configProps = { ...useConfigFieldProps({ fieldConfig, error, touched }) };

  const onChange = React.useCallback(
    (value) => {
      form.setFieldValue(field.name, value.length > 0 ? value : []);
    },
    [field.name, form]
  );

  let defaultValue = initialValue || [];
  if (field.value) {
    defaultValue = field.value;
  }

  const checkboxGroupProps: CheckboxGroupProps = {
    ...configProps,
    defaultValue,
    onChange,
    // onBlur: field.onBlur,
  };

  return (
    <CheckboxGroup {...checkboxGroupProps}>
      {Array.isArray(fieldConfig.values)
        ? fieldConfig.values.map((val) => {
            return <CheckboxGroupItem label={val.label} value={val.value} key={val.value} />;
          })
        : null}
    </CheckboxGroup>
  );
}

export function SupportRadioGroup({
  field,
  fieldConfig,
  touched,
  error,
  form,
  initialValue,
}: CommonFieldInterface): React.ReactElement {
  const configProps = { ...useConfigFieldProps({ fieldConfig, error, touched }) };

  let defaultValue = initialValue || '';
  if (field.value) {
    defaultValue = field.value;
  }

  const radioGroupProps: RadioGroupProps = {
    ...configProps,
    orientation: 'vertical',
    defaultValue,
    onChange: (value) => {
      form.setFieldValue(field.name, value);
    },
    // onBlur: field.onBlur,
  };

  return (
    <RadioGroup {...radioGroupProps}>
      {Array.isArray(fieldConfig.values)
        ? fieldConfig.values.map((val) => {
            return <RadioGroupItem label={val.label} value={val.value} key={val.value} />;
          })
        : null}
    </RadioGroup>
  );
}

export function SupportInput({
  field,
  fieldConfig,
  touched,
  error,
  initialValue,
}: CommonFieldInterface): React.ReactElement {
  const configProps = { ...useConfigFieldProps({ fieldConfig, error, touched }) };

  let value = initialValue || '';
  if (field.value) {
    value = field.value;
  }

  const inputProps: InputProps = {
    ...configProps,
    value,
    onChange: field.onChange,
    onBlur: field.onBlur,
  };

  return <Input {...inputProps} />;
}

export function SupportPhoneInput({
  field,
  fieldConfig,
  form,
  touched,
  error,
  initialValue,
}: CommonFieldInterface): React.ReactElement {
  const configProps = { ...useConfigFieldProps({ fieldConfig, error, touched }) };

  let value = initialValue || '';
  if (field.value) {
    value = field.value;
  }

  const phoneInputProps: PhoneInputProps = {
    ...configProps,
    value,
    onChange: (value) => {
      form.setFieldValue(field.name, value);
    },
    onBlur: field.onBlur,
  };
  return <PhoneInput {...phoneInputProps} />;
}

export function SupportAddress({
  field,
  fieldConfig,
  form,
  touched,
  error,
  initialValue,
}: CommonFieldInterface): React.ReactElement {
  const configProps = { ...useConfigFieldProps({ fieldConfig, error, touched }) };

  let value = initialValue || null;
  if (field.value) {
    value = field.value;
  }

  const onChange = React.useCallback(
    (value) => {
      form.setFieldValue(field.name, value);
    },
    [field.name, form]
  );

  const placeAutocomplete: AddressProps = {
    ...configProps,
    value,
    onChange,
    onBlur: field.onBlur,
  };
  return <Address {...placeAutocomplete} />;
}

export function SupportTextarea({
  field,
  fieldConfig,
  touched,
  error,
  initialValue,
}: CommonFieldInterface): React.ReactElement {
  const configProps = { ...useConfigFieldProps({ fieldConfig, error, touched }) };

  let value = initialValue || '';
  if (field.value) {
    value = field.value;
  }

  const textareaProps: TextareaProps = {
    ...configProps,
    maxRows: 8,
    value,
    onChange: field.onChange,
    onBlur: field.onBlur,
  };

  return <Textarea {...textareaProps} />;
}

export function Empty({ fieldConfig }: Partial<CommonFieldInterface>): React.ReactElement {
  return <div className={classnames(style['empty'], 'empty')}>{fieldConfig.children}</div>;
}

export function HLine(): React.ReactElement {
  return <div className={classnames(style['form-hr'], 'form-hr')}></div>;
}
