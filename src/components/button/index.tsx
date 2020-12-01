import React, { FC, ReactNode } from 'react';
import classnames from 'classnames';

import style from './button.module.scss';
import { Loader } from '../loader';

export interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  grey?: boolean;
  full?: boolean;
  invert?: boolean;
  tertiary?: boolean;
  warning?: boolean;
  onButtonClick?: (ev?) => void;
  onMouseUp?: (ev) => void;
  loading?: boolean;
}

export const Button: FC<ButtonProps> = (props: ButtonProps) => {
  const { onButtonClick = () => null, onMouseUp = () => null, disabled, loading } = props;

  const classNames = classnames(style.button, {
    [`${style.grey}`]: props.grey,
    [`${style.invert}`]: props.invert,
    [`${style.full}`]: props.full,
    [`${style.tertiary}`]: props.tertiary,
    [`${style.warning}`]: props.warning,
    [`${style.disabled}`]: disabled,
    [`${style.loading}`]: loading,
  });

  const onClick = (ev) => (disabled || loading ? null : onButtonClick(ev));
  return (
    <button onClick={onClick} onMouseUp={onMouseUp} type={props.type || 'button'} className={classNames}>
      {loading && <Loader tiny />}
      {props.children}
    </button>
  );
};
