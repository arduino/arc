import React, { useRef, useEffect, useCallback, useState } from 'react';
import classNames from 'classnames';
import { useOverlay, usePreventScroll, useModal, useDialog, OverlayContainer, FocusScope, useButton } from 'react-aria';
import { AriaDialogProps } from '@react-types/dialog';
import { useOverlayTriggerState } from 'react-stately';

import { IconNavigationArrowLeft, IconNavigationCloseNormal } from '@bcmi-labs/react-icons';

import { Underlay } from '../underlay/Underlay';
import { OpenTransition } from '../../OpenTransition';
import style from './modal.module.scss';
import { Button, ButtonProps } from '../../button';
import { WithBemClasses, OverlayProps } from '../../utils';

interface ModalButtonProps extends Omit<ButtonProps, 'children'> {
  label: string;
  closeModalOnClick: boolean;
  onClick?: () => void;
  closeFn?: () => void;
}

export function ModalButton({
  label = null,
  closeModalOnClick,
  onClick,
  closeFn,
  variant = 'primary',
  ...rest
}: ModalButtonProps): React.ReactElement {
  if (!label) {
    return null;
  }

  return (
    <Button
      variant={variant}
      onPress={(): void => {
        typeof onClick === 'function' && onClick();
        if (closeModalOnClick && typeof closeFn === 'function') {
          console.log('close fn');
          closeFn();
        }
      }}
      {...rest}
    >
      {label}
    </Button>
  );
}

export interface ModalWindowProps extends AriaDialogProps, WithBemClasses {
  isOpen?: boolean;
  /** the title of the modal */
  title?: string;
  isDismissable?: boolean;
  intro?: React.ReactNode;
  /** the main content of the modal */
  children: React.ReactNode;
  closeButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  back?: boolean;
  /** set the modal to fullscreen on mobile devices */
  mobileFull?: boolean;

  /** callback when the modal closes */
  onClose?: () => void;

  primaryButton?: ModalButtonProps;
  secondaryButton?: ModalButtonProps;
  // TODO this should be buttons array

  onBack?: (e: React.MouseEvent) => void;

  /** hide header to allow compact view of Modal */
  compactView?: boolean;

  buttonsPosition?: 'start' | 'end' | 'center';
}

function _ModalWindow(
  {
    children,
    isOpen = false,
    title,
    intro,
    back,
    mobileFull = false,
    closeButtonProps,
    primaryButton = null,
    secondaryButton = null,
    isDismissable = true,
    compactView = false,
    className,
    buttonsPosition = 'end',
    onBack,
    ...otherProps
  }: ModalWindowProps,
  ref: React.RefObject<HTMLDivElement>
): React.ReactElement {
  const { modalProps } = useModal();

  // this section is used to adjust the modal size accordingly to iframe content.
  // the best way to know the content of an iframe is to post a message from the iframe to the parent window
  // we react on the message adjusting the height of the modal
  const [modalStyle, setModalStyle] = useState({});
  const handleIframeSize = useCallback((event) => {
    try {
      const height = JSON.parse(event.data)?.height || null;
      if (height !== null && typeof height !== 'undefined') {
        setModalStyle({ height: `${height + 10}px`, overflow: 'hidden' });
      }
    } catch {}
  }, []);
  useEffect(() => {
    window.addEventListener('message', handleIframeSize, false);
    return function removeEventListener(): void {
      window.removeEventListener('message', handleIframeSize, false);
    };
  }, [handleIframeSize]);

  // Get props for the dialog and its title
  // enforce a role of type dialog if the modal is dismissable or alertdialog if it's not
  const { dialogProps, titleProps } = useDialog({ ...otherProps, role: isDismissable ? 'dialog' : 'alertdialog' }, ref);

  const integratedButtons = !!primaryButton || !!secondaryButton;

  const wrapsIframe = children && React.isValidElement(children) && children.type === 'iframe';

  const modalClasses = classNames(style.modal, {
    [style['is-open']]: isOpen,
    [style['mobile-full']]: mobileFull,
    [style['iframe']]: wrapsIframe,
    [`${className}`]: className,
  });

  return (
    <div {...dialogProps} {...modalProps} {...otherProps} className={modalClasses} ref={ref}>
      {(isDismissable || back || title) &&
        !compactView && ( // show the header when there is something to show inside
          <div
            className={classNames(style.heading, { [`${className}__heading`]: className, [style.noBorder]: !!intro })}
          >
            <div className={classNames(style.back, { [`${className}__back`]: className })}>
              {back && (
                <button onClick={onBack}>
                  <IconNavigationArrowLeft />
                </button>
              )}
            </div>
            <h3 {...titleProps} className={classNames(style.title, { [`${className}__title`]: className })}>
              {title}
            </h3>
            <div className={classNames(style.close, { [`${className}__close`]: className })}>
              {isDismissable && (
                <button {...closeButtonProps}>
                  <IconNavigationCloseNormal />
                </button>
              )}
            </div>
          </div>
        )}
      {intro && <div className={classNames(style.intro, { [`${className}__intro`]: className })}>{intro}</div>}
      {children && (
        <div
          className={classNames(style.content, {
            [style.wide]: !intro,
            [style['iframe']]: wrapsIframe,
            [`${className}__content`]: className,
            [`${className}__content--wide`]: className && !intro,
          })}
          style={modalStyle}
        >
          {children}
          {integratedButtons && (
            <div
              className={classNames(style.buttonsWrapper, {
                [`${className}__buttonsWrapper`]: className,
                [style[`buttonsWrapper--${buttonsPosition}`]]: buttonsPosition,
              })}
            >
              <ModalButton {...secondaryButton} />
              <ModalButton {...primaryButton} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export const ModalWindow = React.forwardRef(_ModalWindow);

export interface ModalProps extends OverlayProps, AriaDialogProps, ModalWindowProps {}
export function Modal({
  isOpen = false,
  title = null,
  intro = null,
  back = false,
  mobileFull = false,
  primaryButton = null,
  secondaryButton = null,
  isDismissable = true,
  ...otherProps
}: ModalProps): React.ReactElement {
  // Handle interacting outside the dialog and pressing
  // the Escape key to close the modal.
  const ref = useRef();

  const state = useOverlayTriggerState({});

  // when isOpen prop changes, reflect it's state to internal state
  useEffect(() => {
    if (!isOpen) {
      state.close();
    } else {
      state.open();
    }
  }, [isOpen, state]);

  const closeFn = otherProps.onClose
    ? () => {
        state.close();
        otherProps.onClose();
      }
    : state.close;

  const props: ModalProps = {
    ...otherProps,
    isOpen,
    title,
    intro,
    back,
    mobileFull,
    primaryButton: primaryButton ? { ...primaryButton, closeFn } : null,
    secondaryButton: secondaryButton ? { ...secondaryButton, closeFn } : null,
    isDismissable,
  };

  const { overlayProps } = useOverlay(
    {
      isOpen,
      isDismissable,
      isKeyboardDismissDisabled: !isDismissable,
      onClose: () => {
        closeFn();
      },
    },
    ref
  );

  const { buttonProps: closeButtonProps } = useButton(
    {
      onPress: () => {
        closeFn();
      },
    },
    ref
  );

  // Prevent scrolling while the modal is open, and hide content
  // outside the modal from screen readers.
  usePreventScroll({ isDisabled: !state.isOpen });

  if (!state.isOpen) {
    return null;
  }

  const focusProps = {
    contain: false, // if contain true, can't move inside iframes
    restoreFocus: true,
    autoFocus: true,
  };

  return (
    <OverlayContainer>
      <div
        {...overlayProps}
        className={classNames(style.modalWrapper, { [`${props.className}__modalWrapper`]: props.className })}
      >
        <FocusScope {...focusProps}>
          <OpenTransition in={state.isOpen} appear>
            <Underlay className={props.className} />
            <ModalWindow {...props} isOpen={state.isOpen} closeButtonProps={closeButtonProps} ref={ref} />
          </OpenTransition>
        </FocusScope>
      </div>
    </OverlayContainer>
  );
}
