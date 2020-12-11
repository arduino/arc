import React, { useCallback, useRef } from 'react';
import { useButton } from '@react-aria/button';
import { Modal, ModalWindowProps } from './Modal';

// we omit onClose, as the setIsOpen callback can handle state changes from the parent
export interface ModalTriggerProps extends Omit<ModalWindowProps, 'onClose'> {
  TriggerElement: React.ReactElement;
  setIsOpen: (open: boolean) => void;
}

/**
 * ModalTrigger Component provides basic accessibility for a generic button that opens a modal.
 *
 * It has no internal state, as the parent is supposed to provide a `isOpen` param and a `setIsOpen` callback.
 *
 * Parent state is updated from inside of the ModalTrigger, in order to be in sync with the real status of the Modal
 */
export function ModalTrigger({ TriggerElement, isOpen, setIsOpen, ...props }: ModalTriggerProps): React.ReactElement {
  const ref = useRef();

  // extract children and other props from trigger element
  // this way we can add openButtonProps and ref
  const { children: triggerChildren, ...triggerProps } = TriggerElement.props;

  // useButton ensures that focus management is handled correctly,
  // across all browsers. Focus is restored to the button once the
  // dialog closes.
  const { buttonProps: openButtonProps } = useButton(
    {
      onPress: () => {
        setIsOpen(true);
      },
      isDisabled: triggerProps.isDisabled,
      children: triggerChildren,
      'aria-expanded': isOpen,
      'aria-haspopup': 'dialog',
    },
    ref
  );

  const closeFn = useCallback(() => {
    setIsOpen(false);
  }, []);

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
