import React from 'react';
import { Story } from '@storybook/react';
import { Checkbox, CheckboxProps } from './Checkbox';

export default {
  title: 'ZeroHeight/Checkbox',
  component: Checkbox,
};

const Template: Story<CheckboxProps> = (args) => <Checkbox {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  onChange: (e) => {
    console.log(e.target.name, e.target.value, e.target.checked);
  },
  label: 'A Label',
  name: 'a-checkbox',
  value: 'a-value',
  isRequired: true,
};

export const Checked_Controlled = Template.bind({});
Checked_Controlled.args = {
  ...Basic.args,
  isSelected: true,
};

export const Checked_Uncontrolled = Template.bind({});
Checked_Uncontrolled.args = {
  ...Basic.args,
  defaultSelected: true,
};

export const Indeterminate = Template.bind({});
Indeterminate.args = {
  ...Basic.args,
  isIndeterminate: true,
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
