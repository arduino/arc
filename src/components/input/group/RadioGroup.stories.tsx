import React from 'react';
import { Story } from '@storybook/react';
import { RadioGroup, RadioGroupProps } from './RadioGroup';
import { RadioGroupItem } from '../../checkbox/RadioGroupItem';

export default {
  title: 'ZeroHeight/RadioGroup',
  component: RadioGroup,
};

const Template: Story<RadioGroupProps> = (args) => <RadioGroup {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  className: 'a-class-name',
  label: 'Radio group',
  onChange: (e) => console.log(e),
  children: (
    <>
      <RadioGroupItem label="checkbox 1" name="cb1" value="cb1-val" />
      <RadioGroupItem label="checkbox 2" name="cb2" value="cb2-val" />
      <RadioGroupItem name="cb3" value="cb3-val">
        <img src="https://via.placeholder.com/15" />
      </RadioGroupItem>
    </>
  ),
};
