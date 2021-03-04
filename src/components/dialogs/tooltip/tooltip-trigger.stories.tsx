import React from 'react';
import { Story } from '@storybook/react';
import { TooltipTrigger, TooltipTriggerProps } from './TooltipTrigger';

export default {
  title: 'ZeroHeight/TooltipTrigger',
  component: TooltipTrigger,
};

const Template: Story<TooltipTriggerProps> = (args) => <TooltipTrigger {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  TriggerElement: <button>open tooltip</button>,
  children: 'Tooltip content',
};

export const ControlledOpen = Template.bind({});
ControlledOpen.args = {
  ...Basic.args,
  isOpen: true,
};

export const StartOpen = Template.bind({});
StartOpen.args = {
  ...Basic.args,
  defaultOpen: true,
};

export const DivTrigger = Template.bind({});
DivTrigger.args = {
  ...Basic.args,
  TriggerElement: <div>open tooltip</div>,
};

export const Popover = Template.bind({});
Popover.args = {
  ...Basic.args,
  tooltipType: 'popover',
  TriggerElement: <div>open popover</div>,
  children: 'This is the content of a popover, generally used for longer text',
};
