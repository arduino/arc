import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { Map, MapProps } from '.';

export default {
  title: 'ZeroHeight/Map',
  component: Map,
};

const Template: Story<MapProps> = (args) => <Map {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  color: '#cccccc',
  bgcolor: '#fff',
};

export const Tiny = Template.bind({});
Tiny.args = {
  ...Basic.args,
  tiny: true,
};
