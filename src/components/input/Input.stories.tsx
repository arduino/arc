import React from 'react';
import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Input, InputProps } from './input';
import { IconOperationReloadArrow } from '@arduino/react-icons';

export default {
  title: 'ZeroHeight/Input',
  component: Input,
} as Meta;

const Template: Story<InputProps> = (args: InputProps) => <Input {...args} />;

const baseArgs = {
  label: 'Input with placeholder',
  onChange: action('onChange'),
  onBlur: action('onBlur'),
};

export const Basic = Template.bind({});
Basic.args = {
  label: 'Input with placeholder',
  placeholder: 'This is a placeholder',
  value: null,
  successMsg: null,
  error: null,
  infoMsg: null,
  onChange: action('onChange'),
  onBlur: action('onBlur'),
};

export const Clearable = Template.bind({});
Clearable.args = {
  ...baseArgs,
  label: 'Clearable input',
  value: 'Clearable text',
  clearable: true,
  onChange: (event) => {
    console.log({ value: event.target.value });
  },
};

export const NoPlaceholder = Template.bind({});
NoPlaceholder.args = {
  label: 'Input without placeholder',
};

export const Small = Template.bind({});
Small.args = {
  placeholder: 'Input without placeholder',
  isSmall: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...baseArgs,
  label: 'Disabled input without placeholder',
  isDisabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  ...baseArgs,
  label: 'Readonly input without placeholder',
  value: 'Readonly Value',
  isReadOnly: true,
};

export const AdditionalButtons = Template.bind({});
AdditionalButtons.args = {
  ...baseArgs,
  label: 'Additional Buttons',
  value: 'Some Text text',
  buttons: [
    <div key="reload" onClick={action('additional button')}>
      <IconOperationReloadArrow />
    </div>,
  ],
};

export const Required = Template.bind({});
Required.args = {
  ...baseArgs,
  label: 'Required input',
  isRequired: true,
};

export const SuccessMessage = Template.bind({});
SuccessMessage.args = {
  ...baseArgs,
  label: 'Input with success message',
  successMsg: 'Success message',
};

export const ErrorMessage = Template.bind({});
ErrorMessage.args = {
  ...baseArgs,
  label: 'Input with success message',
  error: 'Error message',
};

export const InfoMessage = Template.bind({});
InfoMessage.args = {
  ...baseArgs,
  label: 'Input with success message',
  infoMsg: 'Info message',
};

export const WithLinkInInfoMessage = Template.bind({});
WithLinkInInfoMessage.args = {
  ...baseArgs,
  infoMsg: 'A [Link](https://www.arduino.cc) in the message',
};
