import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { Loader, LoaderProps } from '.';

export default {
  title: 'ZeroHeight/Loader',
  component: Loader,
};

const Template: Story<LoaderProps> = (args) => <Loader {...args} />;

export const Basic = Template.bind({});
Basic.args = {};

export const Tiny = Template.bind({});
Tiny.args = {
  ...Basic.args,
  tiny: true,
};
