import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { useOverlay, OverlayContainer, useDialog, FocusScope } from 'react-aria';

import { useOverlayTriggerState } from 'react-stately';
import { AriaDialogProps } from '@react-types/dialog';

import { OpenTransition } from '../../OpenTransition';
import { WithBemClasses } from '../../utils';
import style from './popover.module.scss';

export interface PopoverProps extends AriaDialogProps, WithBemClasses {
  isOpen?: boolean;
  popperStyle: React.CSSProperties;
  /** the main content of the popover */
  children: React.ReactNode;
  isDismissable?: boolean;
  setRef: (ref) => void;
  onClose?: () => void;
}
export function PopoverContent({
  popperStyle,
  isOpen = false,
  onClose,
  isDismissable,
  children,
  setRef,
  className,
  ...otherProps
}: PopoverProps): React.ReactElement {
  const innerRef = useRef();

  const { dialogProps } = useDialog({ ...otherProps, role: 'dialog' }, innerRef);

  const setElementRef = (ref): void => {
    setRef(ref);
    innerRef.current = ref;
  };

  const { overlayProps } = useOverlay(
    {
      isOpen,
      isDismissable,
      isKeyboardDismissDisabled: !isDismissable,
      onClose,
    },
    innerRef
  );

  const popoverClasses = classNames(style.popover, {
    [style['is-open']]: isOpen,
    [`${className}`]: className,
  });

  return (
    <div
      {...overlayProps}
      {...dialogProps}
      {...otherProps}
      className={popoverClasses}
      style={popperStyle}
      ref={setElementRef}
    >
      {children}
    </div>
  );
}

export function Popover({ isOpen = false, ...otherProps }: PopoverProps): React.ReactElement {
  const state = useOverlayTriggerState({});

  useEffect(() => {
    if (!isOpen) {
      state.close();
    } else {
      state.open();
    }
  }, [isOpen]);

  const closeFn = otherProps.onClose
    ? (): void => {
        state.close();
        otherProps.onClose();
      }
    : state.close;

  if (!state.isOpen) {
    return null;
  }

  return (
    <OverlayContainer>
      <FocusScope restoreFocus>
        <OpenTransition in={state.isOpen} appear>
          <PopoverContent {...otherProps} onClose={closeFn} />
        </OpenTransition>
      </FocusScope>
    </OverlayContainer>
  );
}
