import React, { ReactNode } from 'react';
import classNames from 'classnames';

import { WithBemClasses, WithChildren } from '../utils';

import style from './wrapper.module.scss';
import { WrapperStatusMsg } from './WrapperStatusMsg';

export interface WrapperProps extends WithChildren, WithBemClasses {
  /**
   * display a label inside the input that shrinks when the field is in focus
   */
  label?: string;
  /**
   * color the input and display the successMsg below it
   */
  successMsg?: string;
  /**
   * color the input and display the error below it
   */
  error?: string;
  /**
   * display the infoMsg below it
   */
  infoMsg?: string;
  /**
   *  set the `for` to the label element. Ignore if not using custom labels
   */
  htmlFor?: string;
  /**
   *  hides the status element. Used when no info messages or errors are wanted
   */
  withoutStatus?: boolean;
  /**
   *  round helper to show next to the input. Meant to explain the field
   */
  helper?: React.ReactNode;
}

export function Wrapper({
  label,
  htmlFor,
  successMsg,
  error,
  className,
  infoMsg,
  withoutStatus,
  helper,
  ...props
}: WrapperProps): React.ReactElement {
  const wrapperClasses = classNames('wrapper', style.wrapper, {
    [`${className}`]: className,
  });

  const fieldClasses = classNames(style.field, {
    [`${className}__field`]: className,
  });

  console.log(label);
  return (
    <>
      <div className={wrapperClasses}>
        <div className={fieldClasses}>
          {props.children}
          {label && (
            <label className={style.label} htmlFor={htmlFor}>
              {label}
            </label>
          )}
        </div>
        {!withoutStatus && (
          <WrapperStatusMsg error={error} successMsg={successMsg} infoMsg={infoMsg} className={className} />
        )}
        {!!helper && helper}
      </div>
    </>
  );
}
