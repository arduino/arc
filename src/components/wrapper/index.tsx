import React from 'react';
import classNames from 'classnames';

import { IconNavigationCheckmarkOutlineFilled, IconStatusAttentionErrorOutlineFilled } from '@bcmi-labs/react-icons';

import { WithBemClasses, WithChildren } from '../utils';
import { TextWithLink } from '../textWithLink';

import style from './wrapper.module.scss';

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
}

export function Wrapper({
  label,
  htmlFor,
  successMsg,
  error,
  className,
  infoMsg,
  withoutStatus,
  ...props
}: WrapperProps): React.ReactElement {
  const wrapperClasses = classNames('wrapper', style.wrapper, {
    [`${className}`]: className,
  });

  const fieldClasses = classNames(style.field, {
    [`${className}__field`]: className,
  });

  const errorClasses = classNames(style.error, {
    [`${className}__error`]: className,
  });

  const successClasses = classNames(style.success, {
    [`${className}__success`]: className,
  });

  const infoClasses = classNames(style.info, {
    [`${className}__info`]: className,
  });

  const statusClasses = classNames('wrapper-status', style.statusWrapper, {
    [`${className}__status`]: className,
  });

  return (
    <div className={wrapperClasses}>
      <div className={fieldClasses}>
        {props.children}
        {label && label.length && (
          <label className={style.label} htmlFor={htmlFor}>
            {label}
          </label>
        )}
      </div>
      {!withoutStatus && (
        <div className={statusClasses}>
        {/* Display error message */}
        {error && error.length && (
          <div className={errorClasses}>
            <IconStatusAttentionErrorOutlineFilled /> {error}
          </div>
        )}
        {/* Display success message */}
        {!error && successMsg && successMsg.length && (
          <div className={successClasses}>
            <IconNavigationCheckmarkOutlineFilled /> {successMsg}
          </div>
        )}
        {/* Display info message */}
        {!error && !successMsg && infoMsg && infoMsg.length && (
          <div className={infoClasses}>
            <TextWithLink text={infoMsg} />
          </div>
        )}
      </div>
      )}
    </div>
  );
}
