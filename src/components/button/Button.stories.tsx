import React from 'react';
import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react/types-6-0';
import { Button, ButtonProps } from '.';

export default {
  title: 'ZeroHeight/Button',
  component: Button,
};

const Template: Story<ButtonProps> = (args) => <Button {...args}>Label</Button>;

export const Basic = Template.bind({});
Basic.args = {
  onButtonClick: action('onButtonClick'),
  grey: false,
  invert: false,
  full: false,
  className: 'Other Class name',
  loading: false,
  disabled: false,
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  ...Basic.args,
  tertiary: true,
};

export const Loading = Template.bind({});
Loading.args = {
  ...Basic.args,
  loading: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Basic.args,
  disabled: true,
};
