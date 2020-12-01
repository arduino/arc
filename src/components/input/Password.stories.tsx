import React from 'react';
import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Password, PasswordProps } from './password';

export default {
  title: 'ZeroHeight/Password',
  component: Password,
} as Meta;

const Template: Story<PasswordProps> = (args: PasswordProps) => <Password {...args} />;

const baseArgs = {
  label: 'Password with placeholder',
  onChange: action('onChange'),
  onBlur: action('onBlur'),
};

export const Basic = Template.bind({});
Basic.args = {
  label: 'Password with placeholder',
  placeholder: 'This is a placeholder',
  value: null,
  successMsg: null,
  error: null,
  infoMsg: null,
  onChange: action('onChange'),
  onBlur: action('onBlur'),
};

export const NoPlaceholder = Template.bind({});
NoPlaceholder.args = {
  label: 'Password without placeholder',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...baseArgs,
  label: 'Disabled Password without placeholder',
  disabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  ...baseArgs,
  label: 'Readonly Password without placeholder',
  value: 'Readonly Value',
  readOnly: true,
};

export const Required = Template.bind({});
Required.args = {
  ...baseArgs,
  label: 'Required Password',
  required: true,
};

export const SuccessMessage = Template.bind({});
SuccessMessage.args = {
  ...baseArgs,
  label: 'Password with success message',
  successMsg: 'Success message',
};

export const ErrorMessage = Template.bind({});
ErrorMessage.args = {
  ...baseArgs,
  label: 'Password with success message',
  error: 'Error message',
};
