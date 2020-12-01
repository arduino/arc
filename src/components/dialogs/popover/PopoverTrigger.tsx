import React, { useRef, useState } from 'react';
import { useButton } from 'react-aria';
import { usePopper } from 'react-popper';
import { Popover, PopoverProps } from './Popover';

type Placement =
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

type PopoverPropsNoStyle = Pick<PopoverProps, 'isOpen' | 'children' | 'isDismissable' | 'onClose' | 'className'>;

export interface PopoverTriggerProps extends PopoverPropsNoStyle {
  TriggerElement: React.ReactElement;
  children: React.ReactElement | string;
  /**
   * the placement of the popover
   */
  popoverPlacement?: Placement;

  /**
   * strategy of the popover positioning
   */
  popoverStrategy?: 'absolute' | 'fixed';

  /** Whether the overlay is open by default (controlled). */
  isOpen?: boolean;
}

/**
 *
 * PopoverTrigger shows an arduino-styled popover when the trigger is in focus or hovered.
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
  ...props
}: PopoverTriggerProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState(props.isOpen);

  const [triggerRef, setTriggerRef] = useState(null);
  const [popperRef, setPopperRef] = useState(null);

  // useButton ensures that focus management is handled correctly,
  // across all browsers. Focus is restored to the button once the
  // dialog closes.
  const { buttonProps: openButtonProps } = useButton(
    {
      onPress: () => {
        // toggle the state if the popover is dismissable, otherwise always set it to open
        if (props.isDismissable) {
          setIsOpen(!isOpen);
        } else {
          setIsOpen(true);
        }
      },
    },
    triggerRef
  );

  const onClose = () => {
    setIsOpen(false);
    if (props.onClose) {
      props.onClose();
    }
  };

  // const popperRef = React.useRef();

  const { styles, attributes } = usePopper(triggerRef, popperRef, {
    placement: popoverPlacement,
    strategy: popoverStrategy,
  });

  // extract children and other props from trigger element
  const { children: triggerChildren, ...otherTriggerProps } = TriggerElement.props;

  return (
    <>
      <TriggerElement.type {...otherTriggerProps} {...openButtonProps} ref={setTriggerRef}>
        {triggerChildren}
      </TriggerElement.type>
      {isOpen && (
        <Popover
          {...attributes.popper}
          {...props}
          onClose={onClose}
          isOpen
          popperStyle={styles.popper}
          setRef={setPopperRef}
        >
          {children}
        </Popover>
      )}
    </>
  );
}
