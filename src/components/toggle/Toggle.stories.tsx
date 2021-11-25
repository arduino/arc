import React from 'react';
import { Story } from '@storybook/react';
import { Toggle, ToggleProps } from '.';

export default {
  title: 'ZeroHeight/Toggle',
  component: Toggle,
};

const Template: Story<ToggleProps> = (args) => <Toggle {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  label: 'Inactive',
  activeLabel: 'Active',
  onChange: (value) => {
    console.log(value);
  },
};

export const CustomColor = Template.bind({});
CustomColor.args = {
  label: 'Custom colors',
  colors: { on: '#f1c40f', off: '#f39c12' },
  offHandleColor: '#c11f09',
  onHandleColor: '#3f65b6',
};

export const Controlled = Template.bind({});
Controlled.args = {
  label: 'Inactive',
  activeLabel: 'Active',
  onChange: () => {
    return false;
  },
};
