import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { AvatarPicker, AvatarPickerProps, AvatarInfo } from './AvatarPicker';
import { Avatar } from './Avatar';
import { Modal } from '../dialogs/modal/Modal';

export default {
  title: 'ZeroHeight/AvatarPicker',
  component: AvatarPicker,
} as Meta;

const Template: Story<AvatarPickerProps> = (args: AvatarPickerProps) => <AvatarPicker {...args} />;

export const Basic = Template.bind({});
Basic.args = {};

export const NotEditable = Template.bind({});
NotEditable.args = {
  isEdit: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  isDisabled: true,
};

export const CustomModal = Template.bind({});
CustomModal.args = {
  modal: <Modal>{}</Modal>,
};

export const CustomAvatarRender = Template.bind({});
CustomAvatarRender.args = {
  avatarView: (avatar: AvatarInfo, isSelected: boolean) => {
    return (
      <Avatar key={`${avatar.name}`} icon={avatar.avatar}>
        {isSelected && (
          <span
            style={{
              display: 'flex',
              background: '#7fcbcd',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#000',
              width: '100%',
              height: '100%',
            }}
          >
            Selected
          </span>
        )}
      </Avatar>
    );
  },
};
