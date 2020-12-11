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
  onPress: action('onPress'),
  full: false,
  className: 'Other Class name',
  loading: false,
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...Basic.args,
  variant: 'secondary',
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  ...Basic.args,
  variant: 'tertiary',
};

export const Ghost = Template.bind({});
Ghost.args = {
  ...Basic.args,
  variant: 'ghost',
};

export const Warning = Template.bind({});
Warning.args = {
  ...Basic.args,
  variant: 'warning',
};

export const Loading = Template.bind({});
Loading.args = {
  ...Basic.args,
  loading: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Basic.args,
  isDisabled: true,
};
