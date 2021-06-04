import React from 'react';
import { Story } from '@storybook/react';
import { CheckboxGroup, CheckboxGroupProps } from './CheckboxGroup';
import { CheckboxGroupItem } from '../../checkbox/CheckboxGroupItem';

export default {
  title: 'ZeroHeight/CheckboxGroup',
  component: CheckboxGroup,
};

const Template: Story<CheckboxGroupProps> = (args) => <CheckboxGroup {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  className: 'a-class-name',
  label: 'Checkbox group',
  onChange: (e) => console.log(e),
  children: (
    <>
      <CheckboxGroupItem label="checkbox 1" name="cb1" value="cb1" />
      <CheckboxGroupItem label="checkbox 2" name="cb2" value="cb2" />
    </>
  ),
};
