import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import {
  IconNavigationCloseNormal,
  IconNavigationCheckmarkOutlineFilled,
  IconStatusAttentionErrorOutlineFilled,
} from '@arduino/react-icons';

import { useOverlayTriggerState } from 'react-stately';
import { useDialog, usePress, useOverlay, FocusScope, OverlayContainer } from 'react-aria';
import { OverlayProps } from '../utils';

import { OpenTransition } from '../OpenTransition';

import style from './snackbar.module.scss';
import { SnackbarActionBtn } from './SnackbarActionBtn';

interface AnchorOrigin {
  vertical: 'bottom' | 'top';
  horizontal: 'center' | 'left' | 'right';
}

interface SnackbarViewProps extends OverlayProps {
  /**
   * Add specific action element.
   */
  ActionElement?: React.ReactElement;
  /**
   * The anchor of the Snackbar. Set corner position
   * {
   *   horizontal: 'center' | 'left' | 'right',
   *   vertical: 'bottom' | 'top'
   * }
   */
  anchorOrigin?: AnchorOrigin;
  /**
   * set time duration of snackbar visible, ms.
   */
  autoHideDuration?: number;
  /**
   * on/off auto close of snackbar.
   */
  turnOffAutoHide?: boolean;
  /**
   * set additional css class for component
   */
  className?: string;
  /**
   * Set message of snackbar.
   */
  message: React.ReactNode;
  /**
   * show/hide close button of snackbar.
   */
  closeable?: boolean;
  /**
   * Set specific theme for the snackbar
   */
  theme?: 'light' | 'dark' | 'success' | 'error';
  /**
   * Get reference to snack bar element.
   */
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
        {ActionElement && <SnackbarActionBtn ActionElement={ActionElement} onClose={otherProps.onClose} />}
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
/**
 * Snack bar component - provides ability to show message with auto hide and additional actions.
 *
 * Design reference on [Figma](https://www.figma.com/file/euysycI6QhSSbN7Qvguce8/%F0%9F%8E%9BUI-Controls?node-id=995%3A209)
 */
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
