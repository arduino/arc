import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { TextWithLink, TextWithLinkProps } from './index';

export default {
  title: 'ZeroHeight/TextWithLink',
  component: TextWithLink,
} as Meta;

const Template: Story<TextWithLinkProps> = (args: TextWithLinkProps) => <TextWithLink {...args} />;

const baseArgs = {
  text: '[a link](https://www.arduino.cc)',
};

export const Basic = Template.bind({});
Basic.args = {
  ...baseArgs,
};

export const WithTargetSelf = Template.bind({});
WithTargetSelf.args = {
  ...baseArgs,
  target: '_self',
};

export const ComplexSubstitution = Template.bind({});
ComplexSubstitution.args = {
  text: 'Try [Arduino](https://www.arduino.cc)!',
};

export const MultiSubstitution = Template.bind({});
MultiSubstitution.args = {
  text:
    'Start with [Arduino Tutorials](https://www.arduino.cc/en/Tutorial/HomePage), then look at the [Reference](https://www.arduino.cc/reference/en)',
};
