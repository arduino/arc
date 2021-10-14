import React from 'react';
import classNames from 'classnames';

import style from './form.module.scss';

interface FormLayoutProps {
  children: React.ReactNode;
}
export function FormLayoutRow({ children }: FormLayoutProps): React.ReactElement {
  return <div className={classNames(style.supportRow, 'supportRow')}>{children}</div>;
}
