import React, { useState } from 'react';
import { Story } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { Snackbar, SnackbarProps } from './Snackbar';

export default {
  title: 'ZeroHeight/Snackbar',
  component: Snackbar,
};

const baseProp = {
  message: '',
  isOpen: false,
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'center',
  },
  ActionElement: null,
  className: '',
  theme: 'light',
};

const Template: Story<SnackbarProps> = (args) => <Snackbar {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  ...baseProp,
  message: "It's snackbar",
  isOpen: true,
};

export const BottomLeft = Template.bind({});
BottomLeft.args = {
  ...baseProp,
  message: 'Bottom-left',
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left',
  },
  isOpen: true,
};

export const BottomRight = Template.bind({});
BottomRight.args = {
  ...baseProp,
  message: 'Bottom-right',
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right',
  },
  isOpen: true,
};

export const TopLeft = Template.bind({});
TopLeft.args = {
  ...baseProp,
  message: 'Top-right',
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'left',
  },
  isOpen: true,
};
export const TopCenter = Template.bind({});
TopCenter.args = {
  ...baseProp,
  message: 'Top-center',
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'center',
  },
  isOpen: true,
};

export const TopRight = Template.bind({});
TopRight.args = {
  ...baseProp,
  message: 'Top-right',
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'right',
  },
  isOpen: true,
};

export const Inline = Template.bind({});
Inline.args = {
  message: 'Inline',
  isOpen: true,
  inline: true,
};

export const Closeable = Template.bind({});
Closeable.args = {
  ...baseProp,
  message: 'Closeable snackbar.',
  isOpen: true,
  closeable: true,
  turnOffAutoHide: true,
};

export const WithAction = Template.bind({});
WithAction.args = {
  message: 'Snackbar with action.',
  isOpen: true,
  closeable: false,
  ActionElement: <span onClick={action('onAction')}>Action</span>,
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
  message: 'Dark theme of snackbar',
  isOpen: true,
  closeable: true,
  theme: 'dark',
  ActionElement: <span onClick={action('onAction')}>Action</span>,
};

export const SuccessTheme = Template.bind({});
SuccessTheme.args = {
  message: 'Success theme of snackbar',
  isOpen: true,
  closeable: true,
  theme: 'success',
  ActionElement: <span onClick={action('onAction')}>Action</span>,
};
export const ErrorTheme = Template.bind({});
ErrorTheme.args = {
  message: 'Error theme of snackbar',
  isOpen: true,
  closeable: true,
  theme: 'error',
  ActionElement: <span onClick={action('onAction')}>Action</span>,
};

const TemplateClick: Story<SnackbarProps> = (args) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <button onClick={(): void => setOpen(true)}>Open</button>
      <Snackbar {...args} isOpen={isOpen} onClose={(): void => setOpen(false)} />
    </>
  );
};

export const ShowByClick = TemplateClick.bind({});
ShowByClick.args = {
  message: 'Show by event.',
};

export const ErrorByClick = TemplateClick.bind({});
ErrorByClick.args = {
  message: 'Error theme of snackbar',
  autoHideDuration: 10000,
  closeable: true,
  theme: 'error',
  ActionElement: <span onClick={action('onAction')}>Action</span>,
};

const TemplateShowHide: Story<SnackbarProps> = (args) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <button onClick={(): void => setOpen(!isOpen)}>Open</button>
      <Snackbar {...args} isOpen={isOpen} onClose={(): void => setOpen(false)} />
    </>
  );
};

export const ShowHide = TemplateShowHide.bind({});
ShowHide.args = {
  message: 'Show by click and hide by click',
};
