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
        <svg width="20" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15.5 7.5h-1.25V5a3.75 3.75 0 00-7.5 0v2.5H5.5a.625.625 0 00-.625.625v8.75a.625.625 0 00.625.625h10a.624.624 0 00.625-.625v-8.75A.625.625 0 0015.5 7.5zM8 7.5V5a2.5 2.5 0 115 0v2.5H8z"
            fill="currentColor"
          />
        </svg>
      </RadioGroupItem>
    </>
  ),
};
