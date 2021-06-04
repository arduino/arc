import React, { useRef } from 'react';
import classnames from 'classnames';
import { useLink } from 'react-aria';
import { AriaLinkProps } from '@react-types/link';
import { PressEvent } from '@react-types/shared';

import style from './link.module.scss';

export interface LinkProps extends AriaLinkProps {
  /** destination of the link */
  href: string;
  /** target for the link, accepts a generic string to support iframe and browser windows */
  target?: '_self' | '_blank' | '_parent' | '_top' | string;
  /** rel attribute, as per https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel */
  rel?: string;
  /** Graphical variant of the link. Use accordingly to UX specs */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'warning' | 'unstyled';
  /** The children of a link corresponds to its label */
  children: React.ReactChild;
  /** Vertical and font size of the link. Use accordingly to UX specs */
  size?: 'big' | 'normal' | 'small';
  /** Additional classnames to add to the link. Use to customize the look */
  className?: string;
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
 * Link Component is a basic link with accessibility features.
 *
 * It can be styled as a link or completely unstyled (as normal links).
 *
 * When styled as a button it provides the same variants
 * as the button component, defined in the Design reference on [Figma](https://www.figma.com/file/euysycI6QhSSbN7Qvguce8/%F0%9F%8E%9BUI-Controls),
 *
 * Accessbility provided via [react-aria](https://react-spectrum.adobe.com/react-aria/useButton.html),
 */
export function Link({
  variant = 'unstyled',
  size = 'normal',
  className,
  children,
  href,
  rel,
  target,
  ...props
}: LinkProps): React.ReactElement {
  const ref = useRef();

  const { linkProps } = useLink(props, ref);

  const classNames = classnames(style.link, style[size], style[variant], {
    [`${className}__link`]: !!className,
    [`${className}__link--${size}`]: !!className,
    [`${className}__link--${variant}`]: !!className && variant != 'unstyled',
  });

  return (
    <a
      className={classNames}
      {...linkProps}
      ref={ref}
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener' : rel}
    >
      {children}
    </a>
  );
}
