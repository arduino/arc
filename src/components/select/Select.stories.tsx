import React from 'react';
import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react/types-6-0';
import { Select, SelectProps } from '.';

export default {
  title: 'ZeroHeight/Select',
  component: Select,
  argTypes: {
    value: { control: 'array' },
  },
};

const Template: Story<SelectProps> = (args) => <Select {...args} />;

type OptionType = { value: null | string; label: string; infoMsg?: string };

const deviceFilterOptions: Array<OptionType> = [
  { value: 'Due', label: 'Due' },
  { value: 'MEGA2560', label: 'MEGA2560' },
  { value: 'MKR1000', label: 'MKR1000' },
  { value: 'MKR WiFi 1010', label: 'MKR WiFi 1010' },
  { value: 'MKR FOX 1200', label: 'MKR FOX 1200' },
  { value: 'MKR WAN 1300', label: 'MKR WAN 1300' },
  { value: 'MKR WAN 1310', label: 'MKR WAN 1310' },
  { value: 'MKR GSM 1400', label: 'MKR GSM 1400' },
  { value: 'MKR NB 1500', label: 'MKR NB 1500' },
  { value: 'MKR Vidor 4000', label: 'MKR Vidor 4000' },
  { value: 'MKRZERO', label: 'MKRZERO' },
  { value: 'Nano', label: 'Nano' },
  { value: 'NANO 33 IoT', label: 'NANO 33 IoT' },
  { value: 'NANO 33 BLE', label: 'NANO 33 BLE' },
  { value: 'NANO 33 BLE Sense', label: 'NANO 33 BLE Sense' },
  { value: 'NANO Every', label: 'NANO Every' },
  { value: 'UNO', label: 'UNO' },
  { value: 'UNO WiFi Rev.2', label: 'UNO WiFi Rev.2' },
  { value: 'Zero', label: 'Zero' },
  { value: 'Yún Rev.2', label: 'Yún Rev.2' },
];

export const Basic = Template.bind({});
Basic.args = {
  onChange: action('onChange'),
  onBlur: action('onBlur'),
  label: 'Products',
  className: 'device-filter',
  options: deviceFilterOptions,
  defaultValue: null,
};

export const NoPlaceholder = Template.bind({});
NoPlaceholder.args = {
  ...Basic.args,
  placeholder: null,
};

export const NoLabel = Template.bind({});
NoLabel.args = {
  ...Basic.args,
  placeholder: 'Select a product',
  label: null,
};

export const Small = Template.bind({});
Small.args = {
  ...Basic.args,
  placeholder: 'Select a product',
  label: null,
  size: 'small',
};

export const Multiselect = Template.bind({});
Multiselect.args = {
  ...Basic.args,
  isMulti: true,
};

export const CustomPlaceholder = Template.bind({});
CustomPlaceholder.args = {
  ...Basic.args,
  isMulti: true,
  placeholder: "Search here, don't be shy :)",
};

export const SelectedOptions = Template.bind({});
SelectedOptions.args = {
  ...Basic.args,
  defaultValue: deviceFilterOptions[8],
};

export const SelectedOptionsMulti = Template.bind({});
SelectedOptionsMulti.args = {
  ...Multiselect.args,
  defaultValue: [deviceFilterOptions[4], deviceFilterOptions[7]],
};

export const LabelWithId = Template.bind({});
LabelWithId.args = {
  ...Basic.args,
  id: 'element-id',
};

export const Required = Template.bind({});
Required.args = {
  ...Basic.args,
  isRequired: true,
};

export const FieldInfoMessage = Template.bind({});
FieldInfoMessage.args = {
  ...Basic.args,
  infoMsg: 'a [Message](http://www.arduino.cc) in a bottle.',
};

const optionsWithInfoMsg = [
  { value: 'Item 1', label: 'Info message', infoMsg: 'Item 1 selected' },
  { value: 'Item 2', label: 'No info message' },
  { value: 'Item 3', label: 'Info message (link)', infoMsg: 'Item 3 [selected](www.arduino.cc)' },
];
export const ValuesInfoMessage = Template.bind({});
ValuesInfoMessage.args = {
  ...Basic.args,
  options: optionsWithInfoMsg,
  defaultValue: optionsWithInfoMsg[2],
  infoMsg: 'A generic message replaced by selections',
};
