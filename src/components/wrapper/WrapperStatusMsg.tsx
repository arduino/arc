import React from 'react';
import classNames from 'classnames';
import { IconNavigationCheckmarkOutlineFilled, IconStatusAttentionErrorOutlineFilled } from '@bcmi-labs/react-icons';

import { TextWithLink } from '../textWithLink';
import { WrapperProps } from './index';

import style from './wrapper.module.scss';

export type WrapperStatusMsgProps = Pick<WrapperProps, 'error' | 'successMsg' | 'infoMsg' | 'className'>;
export function WrapperStatusMsg({ error, successMsg, infoMsg, className }: WrapperStatusMsgProps): React.ReactElement {
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
  );
}
