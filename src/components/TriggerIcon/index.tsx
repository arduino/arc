import React from 'react';

import classnames from 'classnames';

import style from './TriggerIcon.module.scss';

type WrapTag = 'button' | 'span' | 'div';
export interface TriggerIconProps {
  /** Set the TriggerIcon tag (defaults to span). */
  tag?: WrapTag;
  /** Pass an icon (svg or img) here. */
  children: React.ReactElement;
  /** extra class to add to the component */
  className?: string;
  /** Whether or not disable the icon */
  isDisabled?: boolean;
  /** Whether or not use the tiny style */
  tiny?: boolean;
}

/**
 * Trigger Icons are generic icons with hover and disabled states. They are generally used inside Tooltip Triggers and Popover Trigeers
 *
 * The component provides two kind of icons: default (42x42px) and tiny (16x16px), with a specific look associated.
 *
 * The component exposes a ForwardRef in order to be used inside buttons and for other use-cases.
 *
 * Design reference on [Figma](https://www.figma.com/file/euysycI6QhSSbN7Qvguce8/%F0%9F%8E%9BUI-Controls?node-id=2024%3A2254)
 *
 */
function _TriggerIcon(
  { tag: Wrapper = 'span', className, children, isDisabled = false, tiny = false, ...props }: TriggerIconProps,
  ref: React.RefObject<any>
): React.ReactElement {
  const classNames = classnames(style.icon, className, {
    [`${style.disabled}`]: isDisabled,
    [`${style.tiny}`]: tiny,
  });

  return (
    <Wrapper className={classNames} {...props} ref={ref}>
      {children}
    </Wrapper>
  );
}

export const TriggerIcon = React.forwardRef(_TriggerIcon);
