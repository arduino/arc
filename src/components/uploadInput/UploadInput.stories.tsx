import React from 'react';
import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react/types-6-0';
import { UploadInput, UploadInputProps } from './UploadInput';

export default {
  title: 'ZeroHeight/PhoneInput',
  component: UploadInput,
} as Meta;

const Template: Story<UploadInputProps> = (args: UploadInputProps) => <UploadInput {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  label: 'Upload number',
  placeholder: 'Upload number',
  value: null,
  successMsg: null,
  error: null,
  infoMsg: null,
  onChange: action('onChange'),
  onBlur: action('onBlur'),
};

const baseArgs = {
  label: 'Upload number',
  onChange: action('onChange'),
  onBlur: action('onBlur'),
};

export const Clearable = Template.bind({});
Clearable.args = {
  ...baseArgs,
  label: 'Clearable Upload number',
  value: '+39 000 0000000',
  clearable: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...baseArgs,
  label: 'Disabled Phone number',
  value: '+39 000 0000000',
  isDisabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  ...baseArgs,
  label: 'ReadOnly Phone number',
  value: '+39 000 0000000',
  isReadOnly: true,
};

export const DisabledDropdown = Template.bind({});
DisabledDropdown.args = {
  ...baseArgs,
  label: 'DisabledDropdown Phone number',
  value: '+39 000 0000000',
  disableDropdown: true,
};

export const OnlyCountries = Template.bind({});
OnlyCountries.args = {
  ...baseArgs,
  label: 'Only Countries',
  value: '+39 000 0000000',
  onlyCountries: ['it', 'us', 'de', 'gb'],
};

export const PreferredCountries = Template.bind({});
PreferredCountries.args = {
  ...baseArgs,
  label: 'Preferred Countries',
  value: '+39 000 0000000',
  preferredCountries: ['it', 'us', 'de', 'gb'],
};

export const ExcludeCountries = Template.bind({});
ExcludeCountries.args = {
  ...baseArgs,
  label: 'Exclude Countries ug, us',
  value: '+39 000 0000000',
  excludeCountries: ['ug', 'us'],
};

export const AutoFormatOff = Template.bind({});
AutoFormatOff.args = {
  ...baseArgs,
  label: 'Auto Format Off',
  value: '+380500000000',
  autoFormat: false,
};

export const NotEditableCountryCode = Template.bind({});
NotEditableCountryCode.args = {
  ...baseArgs,
  label: 'Not Editable Country Code',
  value: '+380500000000',
  countryCodeEditable: false,
};
