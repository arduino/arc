import React from 'react';
import { Story } from '@storybook/react';
import { PopoverTrigger, PopoverTriggerProps } from './PopoverTrigger';
import { OverlayProvider } from 'react-aria';
import { IconNavigationMenuMoreGrid } from '@bcmi-labs/react-icons';
import { TriggerIcon } from '../../TriggerIcon';

export default {
  title: 'ZeroHeight/PopoverTrigger',
  component: PopoverTrigger,
};

const Template: Story<PopoverTriggerProps> = (args) => (
  <OverlayProvider>
    <PopoverTrigger {...args} />
  </OverlayProvider>
);

export const Basic = Template.bind({});
Basic.args = {
  TriggerElement: <button>open popover</button>,
  isDismissable: true,
  children: 'Popover content',
};

export const ControlledOpen = Template.bind({});
ControlledOpen.args = {
  ...Basic.args,
};

export const WithTriggerIcon = Template.bind({});
WithTriggerIcon.args = {
  TriggerElement: (
    <TriggerIcon tag="button" className="removeButtonStyle">
      <IconNavigationMenuMoreGrid />
    </TriggerIcon>
  ),
  isDismissable: true,
  children: 'Popover content',
};
