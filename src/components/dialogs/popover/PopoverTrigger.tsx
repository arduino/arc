import React, { useEffect, useState } from 'react';
import { useButton } from 'react-aria';
import { usePopper } from 'react-popper';
import { Popover, PopoverProps } from './Popover';

function ButtonTrigger({ TriggerElement, setTriggerRef, openButtonProps }) {
  return React.cloneElement(TriggerElement, { ref: setTriggerRef, ...openButtonProps });
}

export type PopoverTriggerPlacement =
  | 'auto'
  | 'auto-start'
  | 'auto-end'
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'left'
  | 'left-start'
  | 'left-end';

type PopoverPropsNoStyle = Pick<PopoverProps, 'isOpen' | 'children' | 'isDismissable' | 'className'>;

export interface PopoverTriggerProps extends PopoverPropsNoStyle {
  TriggerElement: React.ReactElement;
  children: React.ReactElement | string;
  /**
   * the placement of the popover
   */
  popoverPlacement?: PopoverTriggerPlacement;

  /**
   * strategy of the popover positioning
   */
  popoverStrategy?: 'absolute' | 'fixed';

  /** Whether the overlay is open by default (controlled). */
  isOpen?: boolean;

  /** Callback called on state change. True = popover is open. False = popover is close */
  onOpenChange?: (open: boolean) => void;
}

/**
 *
 * PopoverTrigger shows an arduino-styled popover when the trigger is clicked.
 *
 * The Trigger can be any valid html or ReactElement.
 *
 * Accessibilty is provided via [react-aria](https://react-spectrum.adobe.com/react-aria/) hooks.
 *
 * The Popover is positioned using [popper.js](https://popper.js.org/react-popper/) in order to manage
 * corner cases such as opening a popover near the border of the browser window
 */
export function PopoverTrigger({
  TriggerElement,
  children,
  popoverPlacement = 'right',
  popoverStrategy = 'absolute',
  onOpenChange,
  isOpen,
  ...props
}: PopoverTriggerProps): React.ReactElement {
  const [popoverOpen, setPopoverOpen] = useState(isOpen);

  useEffect(() => {
    setPopoverOpen(isOpen);
  }, [isOpen]);

  const [triggerRef, setTriggerRef] = useState(null);
  const [popperRef, setPopperRef] = useState(null);

  // useButton ensures that focus management is handled correctly,
  // across all browsers. Focus is restored to the button once the
  // dialog closes.
  const { buttonProps: openButtonProps } = useButton(
    {
      onPress: () => {
        let newState = true;
        // toggle the state if the popover is dismissable, otherwise always set it to open
        if (props.isDismissable) {
          newState = !isOpen;
        }

        setPopoverOpen(newState);
        if (onOpenChange) {
          onOpenChange(newState);
        }
      },
    },
    triggerRef
  );

  const onClose = () => {
    setPopoverOpen(false);
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  const { styles, attributes } = usePopper(triggerRef, popperRef, {
    placement: popoverPlacement,
    strategy: popoverStrategy,
  });

  return (
    <>
      <ButtonTrigger TriggerElement={TriggerElement} setTriggerRef={setTriggerRef} openButtonProps={openButtonProps} />
      {popoverOpen && (
        <Popover
          {...attributes.popper}
          {...props}
          onClose={onClose}
          isOpen={popoverOpen}
          popperStyle={styles.popper}
          setRef={setPopperRef}
        >
          {children}
        </Popover>
      )}
    </>
  );
}
