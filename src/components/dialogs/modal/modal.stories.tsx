import React, { useState } from 'react';
import { Story } from '@storybook/react';
import { Modal, ModalProps } from './Modal';
import { OverlayProvider } from 'react-aria';

export default {
  title: 'ZeroHeight/Modal',
  component: Modal,
};

const Template: Story<ModalProps> = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <OverlayProvider>
      <button onClick={() => setIsOpen(true)}>toggle modal</button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </OverlayProvider>
  );
};

const defaultProps = {
  isOpen: false,

  isDismissable: true,
  title: 'A modal',
  children: (
    <>
      <h4>Lorem ipsum dolor sit amet</h4>
      <div>
        Vestibulum erat elit, lobortis id volutpat eu, lacinia ac lectus. Donec viverra tincidunt sem eu efficitur.
        Proin fringilla justo a rutrum maximus. Ut vehicula scelerisque feugiat. Donec pulvinar ullamcorper felis vel
        mattis.
      </div>
    </>
  ),
};

const defaultActionProps = {
  onClose: { action: 'onClose' },
};

export const Basic = Template.bind({});
Basic.args = {
  ...defaultProps,
};
Basic.argTypes = {
  ...defaultActionProps,
};

export const NonDismissable = Template.bind({});
NonDismissable.args = {
  ...defaultProps,
  isDismissable: false,
};
NonDismissable.argTypes = {
  ...defaultActionProps,
};

export const withIntro = Template.bind({});
withIntro.args = {
  ...defaultProps,
  intro: <div style={{ backgroundColor: '#ccc', height: '200px' }}></div>,
};
withIntro.argTypes = {
  ...defaultActionProps,
};

export const compactAlert = Template.bind({});
compactAlert.args = {
  ...defaultProps,
  compactView: true,
  title: null,
};
compactAlert.argTypes = {
  ...defaultActionProps,
};

export const withOneButton = Template.bind({});
withOneButton.args = {
  ...defaultProps,
  primaryButton: {
    label: 'primary',
    closeModalOnClick: true,
  },
};
withOneButton.argTypes = {
  ...defaultActionProps,
};

export const withTwoButtons = Template.bind({});
withTwoButtons.args = {
  ...defaultProps,
  primaryButton: {
    label: 'primary',
    closeModalOnClick: false,
    onClick: () => {
      alert('primary button pressed');
    },
  },
  secondaryButton: {
    label: 'secondary',
    variant: 'secondary',
    closeModalOnClick: true,
    onClick: () => {
      alert('secondary button pressed');
    },
  },
};
withTwoButtons.argTypes = {
  ...defaultActionProps,
};

export const withCustomButtonsPositions = Template.bind({});
withCustomButtonsPositions.args = {
  ...defaultProps,
  buttonsPosition: 'center',
  primaryButton: {
    label: 'primary',
    closeModalOnClick: true,
  },
};
withCustomButtonsPositions.argTypes = {
  ...defaultActionProps,
};
