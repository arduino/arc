import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { ModalTrigger, ModalTriggerProps } from './ModalTrigger';
import { OverlayProvider } from 'react-aria';

export default {
  title: 'ZeroHeight/ModalTrigger',
  component: ModalTrigger,
};

const Template: Story<ModalTriggerProps> = (args) => (
  <OverlayProvider>
    <ModalTrigger {...args} />
  </OverlayProvider>
);

export const Basic = Template.bind({});
Basic.args = {
  TriggerElement: <button>test</button>,
  isDismissable: true,
  intro: <div style={{ backgroundColor: '#ccc', height: '200px' }}></div>,
  children: (
    <div>
      <h4>Lorem ipsum dolor sit amet</h4>
      <div>
        Vestibulum erat elit, lobortis id volutpat eu, lacinia ac lectus. Donec viverra tincidunt sem eu efficitur.
        Proin fringilla justo a rutrum maximus. Ut vehicula scelerisque feugiat. Donec pulvinar ullamcorper felis vel
        mattis.
      </div>
    </div>
  ),
};
Basic.argTypes = {
  onClose: { action: 'onClose' },
};

export const Iframe = Template.bind({});
Iframe.args = {
  TriggerElement: <button>test</button>,
  isDismissable: true,
  title: 'Contact Us',
  children: (
    <iframe src="https://wiki.stg.sparklyunicorn.cc/en/store-support/" title="Support form" frameBorder="none"></iframe>
  ),
};
Basic.argTypes = {
  onClose: { action: 'onClose' },
};
