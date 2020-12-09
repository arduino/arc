import React from 'react';
import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react/types-6-0';
import { IconButton, IconButtonProps } from '.';
import { IconNavigationMenuMoreGrid } from '@bcmi-labs/react-icons';

export default {
  title: 'ZeroHeight/IconButton',
  component: IconButton,
};

const Template: Story<IconButtonProps> = (args) => <IconButton {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  ['aria-label']: 'always set an aria label',
  children: <IconNavigationMenuMoreGrid />,
  onButtonClick: action('onButtonClick'),
  className: 'Other Class name',
  onPress: (ev) => {
    console.log(ev);
  },
  isDisabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Basic.args,
  isDisabled: true,
};
