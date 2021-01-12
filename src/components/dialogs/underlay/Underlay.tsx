import React from 'react';
import classNames from 'classnames';
import { WithBemClasses, WithChildren } from '../../utils';
import style from './underlay.module.scss';

interface UnderlayProps extends WithChildren, WithBemClasses {
  isOpen?: boolean;
}

export function Underlay({ isOpen, className, children }: UnderlayProps): React.ReactElement {
  return (
    <div
      className={classNames(style.underlay, {
        [`${className}__underlay`]: !!className,
        [style['is-open']]: isOpen,
        [`${className}__underlay--open`]: !!className && isOpen,
      })}
    >
      {children}
    </div>
  );
}
