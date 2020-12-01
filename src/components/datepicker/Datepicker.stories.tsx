import React from 'react';
import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react/types-6-0';
import { DatePicker, DatePickerProps } from './datepicker';

export default {
  title: 'ZeroHeight/Datepicker',
  component: DatePicker,
} as Meta;

const Template: Story<DatePickerProps> = (args: DatePickerProps) => <DatePicker {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  label: 'Datepicker',
  value: null,
  successMsg: null,
  error: null,
  infoMsg: null,
  onChange: action('onChange'),
};

export const Clearable = Template.bind({});
Clearable.args = {
  label: 'Clearable date picker',
  value: new Date(),
  clearable: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled date picker',
  value: new Date(),
  disabled: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  label: 'Disabled date picker',
  value: new Date(),
  readOnly: true,
};

export const MinMax = Template.bind({});
MinMax.args = {
  label: 'Min-Max Datepicker property',
  value: new Date(),
  minDate: new Date('1980-01-01T00:00:00.0Z'),
  maxDate: new Date('2021-12-31T00:00:00.0Z'),
};
