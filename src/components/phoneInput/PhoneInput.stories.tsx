import React from 'react';
import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react/types-6-0';
import { PhoneInput, PhoneInputProps, PhoneRegion } from './PhoneInput';

export default {
  title: 'ZeroHeight/PhoneInput',
  component: PhoneInput,
} as Meta;

const Template: Story<PhoneInputProps> = (args: PhoneInputProps) => <PhoneInput {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  label: 'Phone number',
  placeholder: 'Phone number',
  value: null,
  successMsg: null,
  error: null,
  infoMsg: null,
  onChange: action('onChange'),
  onBlur: action('onBlur'),
};

const baseArgs = {
  label: 'Phone number',
  onChange: action('onChange'),
  onBlur: action('onBlur'),
};

export const Clearable = Template.bind({});
Clearable.args = {
  ...baseArgs,
  label: 'Clearable Phone number',
  value: '+39 000 0000000',
  clearable: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...baseArgs,
  label: 'Disabled Phone number',
  value: '+39 000 0000000',
  disabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  ...baseArgs,
  label: 'ReadOnly Phone number',
  value: '+39 000 0000000',
  readOnly: true,
};

export const DisabledDropdown = Template.bind({});
DisabledDropdown.args = {
  ...baseArgs,
  label: 'DisabledDropdown Phone number',
  value: '+39 000 0000000',
  disableDropdown: true,
};

export const Europe = Template.bind({});
Europe.args = {
  ...baseArgs,
  label: 'Europe Countries',
  value: '+39 000 0000000',
  regions: PhoneRegion.EUROPE,
};

export const EuropeAndAmerica = Template.bind({});
EuropeAndAmerica.args = {
  ...baseArgs,
  label: 'Europe Countries',
  value: '+39 000 0000000',
  regions: [PhoneRegion.EUROPE, PhoneRegion.AMERICA],
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
