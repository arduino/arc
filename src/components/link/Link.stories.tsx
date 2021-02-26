import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { Link, LinkProps } from '.';

export default {
  title: 'ZeroHeight/Link',
  component: Link,
};

const Template: Story<LinkProps> = (args) => <Link {...args}>Label</Link>;

export const Basic = Template.bind({});
Basic.args = {
  href: '#',
};

export const Primary = Template.bind({});
Primary.args = {
  ...Basic.args,
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...Basic.args,
  variant: 'secondary',
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  ...Basic.args,
  variant: 'tertiary',
};

export const Ghost = Template.bind({});
Ghost.args = {
  ...Basic.args,
  variant: 'ghost',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Basic.args,
};
