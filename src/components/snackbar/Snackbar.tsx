import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import {
  IconNavigationCloseNormal,
  IconNavigationCheckmarkOutlineFilled,
  IconStatusAttentionErrorOutlineFilled,
} from '@bcmi-labs/react-icons';

import { useOverlayTriggerState } from 'react-stately';
import { useDialog, usePress, useOverlay, FocusScope, OverlayContainer } from 'react-aria';
import { OverlayProps } from '../utils';

import { OpenTransition } from '../OpenTransition';

import style from './snackbar.module.scss';

interface AnchorOrigin {
  vertical: 'bottom' | 'top';
  horizontal: 'center' | 'left' | 'right';
}

interface SnackbarViewProps extends OverlayProps {
  ActionElement?: React.ReactElement;
  anchorOrigin?: AnchorOrigin;
  autoHideDuration?: number;
  turnOffAutoHide?: boolean;
  className?: string;
  message: React.ReactNode;
  closeable?: boolean;
  theme?: 'light' | 'dark' | 'success' | 'error';
  setRef?: (ref: React.Ref<HTMLDivElement>) => void;
}

function SnackbarView({
  className,
  anchorOrigin = {
    vertical: 'bottom',
    horizontal: 'center',
  },
  theme,
  isOpen,
  message,
  ActionElement,
  closeable,
  setRef,
  ...otherProps
}: SnackbarViewProps): React.ReactElement {
  const innerRef = useRef();
  const { vertical = 'bottom', horizontal = 'center' } = anchorOrigin;

  const setElementRef = (ref): void => {
    if (setRef) {
      setRef(ref);
    }
    innerRef.current = ref;
  };

  // Get props for the dialog and its title
  // enforce a role of type dialog if the modal is dismissable or alertdialog if it's not
  const { dialogProps } = useDialog({ ...{ ...otherProps }, role: 'alertdialog' }, innerRef);

  const snackbarClasses = classNames(
    'zh-snackbar',
    className,
    style['zh-snackbar'],
    style[`${vertical}-${horizontal}`], // set position
    style[theme],
    {
      [style['show']]: isOpen,
    }
  );

  const { overlayProps } = useOverlay(
    {
      isOpen,
      onClose: () => {
        otherProps.onClose();
      },
    },
    innerRef
  );

  const renderAction = (): React.ReactElement => {
    // extract children and other props from trigger element
    const { children: actionChildren, className, onClick: actionOnClick, ...otherActionProps } = ActionElement.props;

    const { pressProps } = usePress({
      onPress: (): void => {
        if (actionOnClick) {
          actionOnClick();
        }
        otherProps.onClose();
      },
    });

    return (
      <ActionElement.type
        {...otherActionProps}
        {...pressProps}
        className={classNames(style['snackbar-action'], className)}
        tabIndex={1}
      >
        {actionChildren}
      </ActionElement.type>
    );
  };

  const { pressProps } = usePress({
    onPress: (): void => {
      otherProps.onClose();
    },
  });

  return (
    <div {...overlayProps} {...dialogProps} className={snackbarClasses} ref={setElementRef}>
      <div className={style['snackbar-content']}>
        {theme === 'success' && (
          <IconNavigationCheckmarkOutlineFilled
            className={classNames(style.success)}
          ></IconNavigationCheckmarkOutlineFilled>
        )}
        {theme === 'error' && (
          <IconStatusAttentionErrorOutlineFilled
            className={classNames(style.error)}
          ></IconStatusAttentionErrorOutlineFilled>
        )}
        <span>{message}</span>
      </div>
      <div className={style['snackbar-actions']}>
        {ActionElement && renderAction()}
        {closeable && (
          <span tabIndex={1} {...pressProps} className={classNames(style['close-button'])}>
            <IconNavigationCloseNormal className={classNames(style.close)}></IconNavigationCloseNormal>
          </span>
        )}
      </div>
    </div>
  );
}

export interface SnackbarProps extends OverlayProps, SnackbarViewProps {}
export function Snackbar({
  isOpen,
  onClose,
  autoHideDuration = 7000,
  turnOffAutoHide = false,
  ...otherProps
}: SnackbarProps): React.ReactElement {
  const state = useOverlayTriggerState({});
  const timerId = useRef(null);

  const handleClose = (): void => {
    if (timerId.current) {
      clearTimeout(timerId.current);
      timerId.current = null;
    }
    if (onClose) {
      onClose();
    }
    state.close();
  };

  useEffect(() => {
    if (isOpen && !state.isOpen) {
      state.open();
      if (!turnOffAutoHide) {
        timerId.current = setTimeout(() => {
          handleClose();
        }, autoHideDuration);
      }
    } else {
      handleClose();
    }

    return function cleanup(): void {
      if (timerId.current) {
        clearTimeout(timerId.current);
        timerId.current = null;
      }
    };
  }, [isOpen]);

  const props: SnackbarProps = {
    ...otherProps,
    isOpen,
    onClose: handleClose,
    autoHideDuration,
    turnOffAutoHide,
  };

  if (!state.isOpen) {
    return null;
  }

  return (
    <OverlayContainer>
      <FocusScope restoreFocus autoFocus>
        <OpenTransition in={state.isOpen} appear>
          <SnackbarView {...props} />
        </OpenTransition>
      </FocusScope>
    </OverlayContainer>
  );
}
