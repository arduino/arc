import React from 'react';
import { Story } from '@storybook/react';
import { TriggerIcon, TriggerIconProps } from '.';
import { IconNavigationMenuMoreGrid, IconStatusInformationNormal } from '@arduino/react-icons';

export default {
  title: 'ZeroHeight/TriggerIcon',
  component: TriggerIcon,
};

const Template: Story<TriggerIconProps> = (args) => <TriggerIcon {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  children: <IconNavigationMenuMoreGrid />,
  className: 'Other Class name',
  isDisabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Basic.args,
  isDisabled: true,
};

export const Tiny = Template.bind({});
Tiny.args = {
  ...Basic.args,
  children: <IconStatusInformationNormal />,
  tiny: true,
};
