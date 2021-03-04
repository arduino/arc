import React from 'react';
import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import { Textarea, TextareaProps } from './textarea';

export default {
  title: 'ZeroHeight/Textarea',
  component: Textarea,
};

const Template: Story<TextareaProps> = (args) => <Textarea {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  onChange: action('onChange'),
  onBlur: action('onBlur'),
  className: '',
  value: null,
  label: 'Textarea Label',
  placeholder: 'Enter some text here',
};

export const NoPlaceholder = Template.bind({});
NoPlaceholder.args = {
  ...Basic.args,
  placeholder: null,
};

export const Error = Template.bind({});
Error.args = {
  ...Basic.args,
  error: 'Something broke',
};

export const MaxRows = Template.bind({});
MaxRows.args = {
  ...Basic.args,
  maxRows: 8,
};

export const MaxLen = Template.bind({});
MaxLen.args = {
  ...Basic.args,
  maxLength: 100,
};
