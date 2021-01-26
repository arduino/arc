import React from 'react';
import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Address, AddressProps } from './address';

export default {
  title: 'ZeroHeight/Address',
  component: Address,
} as Meta;

const Template: Story<AddressProps> = (args: AddressProps) => <Address {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  label: 'Address',
  placeholder: 'This is a placeholder',
  value: null,
  successMsg: null,
  error: null,
  infoMsg: null,
  onChange: action('onChange'),
  onBlur: action('onBlur'),
};
