import React from 'react';
import classNames from 'classnames';
import { WithChildren } from '../../utils';
import style from './underlay.module.scss';

interface UnderlayProps extends WithChildren {
  isOpen?: boolean;
}

export function Underlay({ isOpen, children }: UnderlayProps): React.ReactElement {
  return <div className={classNames(style.underlay, { [style['is-open']]: isOpen })}>{children}</div>;
}
