import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Avatar, AvatarProps } from './Avatar';
import { IconUserFaceFilledLove } from '@bcmi-labs/react-icons';

import avatarImage from './example/wizard-01.svg';

interface AvatarStory extends AvatarProps {
  exampleChildren: React.ReactNode;
}

export default {
  title: 'ZeroHeight/Avatar',
  component: Avatar,
} as Meta;

const Template: Story<AvatarStory> = (args: AvatarStory) => {
  const { exampleChildren, ...props } = args;
  return <Avatar {...props}>{exampleChildren}</Avatar>;
};

export const Basic = Template.bind({});
Basic.args = {
  onClick: undefined,
};

export const AvatarMedium = Template.bind({});
AvatarMedium.args = {
  onClick: undefined,
  size: 'medium',
};

export const AvatarSmall = Template.bind({});
AvatarSmall.args = {
  onClick: undefined,
  size: 'small',
};

export const AvatarCustomSize = Template.bind({});
AvatarCustomSize.args = {
  onClick: undefined,
  size: 50,
};

export const AvatarText = Template.bind({});
AvatarText.args = {
  exampleChildren: 'Adriano',
  onClick: undefined,
};

export const AvatarSrc = Template.bind({});
AvatarSrc.args = {
  icon: avatarImage,
  onClick: undefined,
};

export const AvatarIcon = Template.bind({});
AvatarIcon.args = {
  icon: <IconUserFaceFilledLove />,
  onClick: undefined,
};

export const AvatarIconWithManyChild = Template.bind({});
AvatarIconWithManyChild.args = {
  exampleChildren: [
    <IconUserFaceFilledLove key="icon" />,
    <span key="text" style={{ color: 'black', width: '100%', position: 'absolute', bottom: '0' }}>
      Test
    </span>,
  ],
  onClick: undefined,
};

export const AvatarClickable = Template.bind({});
AvatarClickable.args = {
  icon: avatarImage,
};
