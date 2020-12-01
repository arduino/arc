import React from 'react';

import style from './datepicker.module.scss';

export interface DividerProps {
  children: React.ReactNode | React.ReactNodeArray;
}

export default function Divider({ children }: DividerProps): React.ReactElement {
  return <span className={style['datepicker-divider']}>{children}</span>;
}
