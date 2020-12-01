import React from 'react';
import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react/types-6-0';
import { Checkbox, CheckboxProps } from '.';

export default {
  title: 'ZeroHeight/Checkbox',
  component: Checkbox,
};

const Template: Story<CheckboxProps> = (args) => <Checkbox {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  onChange: action('onChange'),
  onBlur: action('onBlur'),
  label: 'A Label',
  required: true,
};

export const Checked = Template.bind({});
Checked.args = {
  ...Basic.args,
  checked: true,
};

export const Unchecked = Template.bind({});
Unchecked.args = {
  ...Basic.args,
  checked: false,
};

export const Indeterminate = Template.bind({});
Indeterminate.args = {
  ...Basic.args,
  indeterminate: true,
};

export const WithLinkInLabel = Template.bind({});
WithLinkInLabel.args = {
  ...Basic.args,
  label: 'A [Link](https://www.arduino.cc) in the Label',
};

export const LongLabel = Template.bind({});
LongLabel.args = {
  ...Basic.args,
  label:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
};
