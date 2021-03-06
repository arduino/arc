import React from 'react';
import { Story } from '@storybook/react';
import { Loader, LoaderProps } from '.';

export default {
  title: 'ZeroHeight/Loader',
  component: Loader,
};

const Template: Story<LoaderProps> = (args) => <Loader {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  linecolor: '#cccccc',
  bgcolor: '#fff',
};

export const Tiny = Template.bind({});
Tiny.args = {
  ...Basic.args,
  tiny: true,
};
