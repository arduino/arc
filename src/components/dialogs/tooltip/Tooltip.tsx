import React from 'react';
import classNames from 'classnames';
import { useTooltip } from 'react-aria';
import { mergeProps } from '@react-aria/utils';

import { WithBemClasses } from '../../utils';
import style from './tooltip.module.scss';

export interface TooltipProps extends WithBemClasses {
  children: React.ReactNode;
  popperStyle: React.CSSProperties;
  popover?: boolean;
  isOpen?: boolean;
}

function _Tooltip(
  { popperStyle, isOpen, popover = false, className, ...props }: TooltipProps,
  ref: React.RefObject<HTMLDivElement>
): React.ReactElement {
  const { tooltipProps } = useTooltip(props);

  const tooltipClasses = classNames(style.tooltip, {
    [style['is-open']]: isOpen,
    [style['popover']]: popover,
    [`${className}`]: className,
  });

  return (
    <div className={tooltipClasses} style={popperStyle} {...mergeProps(props, tooltipProps)} ref={ref}>
      {props.children}
    </div>
  );
}

export const Tooltip = React.forwardRef(_Tooltip);
