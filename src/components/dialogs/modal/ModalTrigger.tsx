import React, { useRef, useState } from 'react';
import { useButton } from '@react-aria/button';
import { Modal, ModalWindowProps } from './Modal';

export interface ModalTriggerProps extends ModalWindowProps {
  TriggerElement: React.ReactElement;
}
export function ModalTrigger({ TriggerElement, onClose, ...props }: ModalTriggerProps): React.ReactElement {
  const ref = useRef();

  const [isOpen, setIsOpen] = useState(props.isOpen);

  // useButton ensures that focus management is handled correctly,
  // across all browsers. Focus is restored to the button once the
  // dialog closes.
  const { buttonProps: openButtonProps } = useButton(
    {
      onPress: () => {
        setIsOpen(true);
      },
    },
    ref
  );

  const closeFn = () => {
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  // extract children and other props from trigger element
  // this way we can add openButtonProps and ref
  const { children: triggerChildren, ...triggerProps } = TriggerElement.props;

  return (
    <>
      <TriggerElement.type {...triggerProps} {...openButtonProps} ref={ref}>
        {triggerChildren}
      </TriggerElement.type>
      {isOpen && <Modal {...props} onClose={closeFn} isOpen />}
    </>
  );
}

// // Application must be wrapped in an OverlayProvider so that it can be
// // hidden from screen readers when a modal opens.
// <OverlayProvider>
//   <Example />
// </OverlayProvider>
