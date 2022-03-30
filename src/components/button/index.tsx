import React, { useRef } from 'react';
import classnames from 'classnames';
import { useButton } from 'react-aria';
import { PressEvent } from '@react-types/shared';
import { AriaButtonProps } from '@react-types/button';

import style from './button.module.scss';
import '../../themes/index.scss';

import { Loader } from '../loader';
import { WithChildren, WithFlavour, WithBemClasses } from '../utils';

export interface ButtonProps extends AriaButtonProps<'button'>, WithFlavour, WithBemClasses, WithChildren {
  /** Graphical variant of the button. Use accordingly to UX specs */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'warning';
  /** Sets the width of the button to 100% */
  full?: boolean;
  /** The behavior of the button when used in an HTML form. */
  type?: 'button' | 'submit' | 'reset';
  /** Shows a loading indicator inside the button */
  loading?: boolean;
  /** Whether the element should receive focus on render. */
  autoFocus?: boolean;
  /** When the button is disabled, press/click events are suppressed.
   * This flag also sets the style accordingly
   */
  isDisabled?: boolean;
  /** Handler that is called when the press is released over the target. */
  onPress?: (e: PressEvent) => void;
  /** Handler that is called when a press interaction starts. */
  onPressStart?: (e: PressEvent) => void;
  /**
   * Handler that is called when a press interaction ends, either
   * over the target or when the pointer leaves the target.
   */
  onPressEnd?: (e: PressEvent) => void;
  /** Handler that is called when the press state changes. */
  onPressChange?: (isPressed: boolean) => void;
  /**
   * Handler that is called when a press is released over the target, regardless of
   * whether it started on the target or not.
   */
  onPressUp?: (e: PressEvent) => void;
}

/**
 * Button Component is a basic button that can be used standalone or in HTML forms.
 *
 * Accordingly to the Design reference on [Figma](https://www.figma.com/file/euysycI6QhSSbN7Qvguce8/%F0%9F%8E%9BUI-Controls),
 * the component provides 5 pre-defined variants, in 3 sizes.
 *
 * Click/Press Events are granted cross-browser compatible, thanks to [react-aria](https://react-spectrum.adobe.com/react-aria/useButton.html),
 * which also provides accessibility features.
 */
export function Button({
  variant = 'primary',
  full = false,
  isDisabled = false,
  loading = false,
  size = 'normal',
  type = 'button',
  theme = 'light',
  className,
  children,
  ...props
}: ButtonProps): React.ReactElement {
  const ref = useRef<any>();
  const { buttonProps } = useButton(
    {
      children,
      isDisabled,
      type,
      ...props, // props contains the PressEvents
    },
    ref
  );

  const classNames = classnames(style.button, style[size], style[variant], style[theme], {
    [`${style.full}`]: full,
    [`${style.disabled}`]: isDisabled,
    [`${style.loading}`]: loading,
    [`${className}__button`]: !!className,
    [`${className}__button--${size}`]: !!className,
    [`${className}__button--${variant}`]: !!className,
    [`${className}__button--full`]: !!className && full,
    [`${className}__button--disabled`]: !!className && isDisabled,
    [`${className}__button--loading`]: !!className && loading,
  });

  return (
    <button className={classNames} {...buttonProps} ref={ref}>
      {loading && <Loader tiny />}
      {children}
    </button>
  );
}
