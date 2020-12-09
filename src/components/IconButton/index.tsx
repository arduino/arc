import React, { useCallback, useRef } from 'react';
import { useButton } from 'react-aria';
import { AriaButtonProps } from '@react-types/button';

import classnames from 'classnames';

import style from './IconButton.module.scss';

export interface IconButtonProps extends AriaButtonProps<'button'> {
  /**
   * Mandatory label that provides accessibility
   */
  ['aria-label']: string;
  /**
   * Pass an icon (svg or img) here.
   */
  children: React.ReactElement;
  /**
   * Class to add to the button component. Use this to customize the button and possibly the nested icon
   */
  className?: string;
  /**
   * Whether or not disable the button
   */
  isDisabled?: boolean;
  /**
   * Callback when the button is clicked or touched
   */
  onPress?: (ev) => void;
}

/**
 * A Round-shaped button including an arbitrary icon.
 *
 * Accessibility provided via [React Aria](https://react-spectrum.adobe.com/react-aria/useButton.html).
 *
 * Design reference on [Figma](https://www.figma.com/file/euysycI6QhSSbN7Qvguce8/%F0%9F%8E%9BUI-Controls?node-id=2024%3A2254)
 *
 */
export function IconButton({ className, children, ...props }: IconButtonProps): React.ReactElement {
  const ref = useRef();

  const { buttonProps } = useButton(props, ref);

  const classNames = classnames(style.iconbutton, className, {
    [`${style.disabled}`]: props.isDisabled,
  });

  return (
    <button {...buttonProps} type={props.type || 'button'} className={classNames} ref={ref}>
      <span className={style.icon}>{children}</span>
    </button>
  );
}
