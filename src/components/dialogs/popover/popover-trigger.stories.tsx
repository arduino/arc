import React from 'react';
import { Story } from '@storybook/react';
import { PopoverTrigger, PopoverTriggerProps } from './PopoverTrigger';
import { OverlayContainer, OverlayProvider } from 'react-aria';
import { IconNavigationMenuMoreGrid } from '@bcmi-labs/react-icons';
import { TriggerIcon } from '../../TriggerIcon';

export default {
  title: 'ZeroHeight/PopoverTrigger',
  component: PopoverTrigger,
};

const Template: Story<PopoverTriggerProps> = (args) => (
  <OverlayProvider>
    <OverlayContainer>
      <PopoverTrigger {...args} />
    </OverlayContainer>
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
  isOpen: true,
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

// export const StartOpen = Template.bind({});
// StartOpen.args = {
//   ...Basic.args,
//   defaultOpen: true,
// };

// export const DivTrigger = Template.bind({});
// DivTrigger.args = {
//   ...Basic.args,
//   TriggerElement: <div>open tooltip</div>,
// };

// export const Popover = Template.bind({});
// Popover.args = {
//   ...Basic.args,
//   tooltipType: 'popover',
//   TriggerElement: <div>open popover</div>,
//   children: 'This is the content of a popover, generally used for longer text',
// };
