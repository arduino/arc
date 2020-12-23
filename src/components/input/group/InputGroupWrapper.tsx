import React from 'react';
import classNames from 'classnames';

import { WithBemClasses, WithChildren } from '../../utils';
import style from './inputgroup.module.scss';
import { InputGroupGenericInterface } from './InputGroup';
import { WrapperStatusMsg, WrapperStatusMsgProps } from '../../wrapper/WrapperStatusMsg';

export interface InputGroupWrapperProps
  extends WithChildren,
    WithBemClasses,
    Pick<InputGroupGenericInterface<any>, 'isDisabled' | 'isRequired'>,
    WrapperStatusMsgProps {
  /** generic html properties that will be passed to the group div */
  groupProps: React.HTMLAttributes<HTMLElement>;
  /** generic html properties that will be passed to the label span */
  labelProps: React.HTMLAttributes<HTMLElement>;
  /** A react node that will be used as the label of the group */
  label?: React.ReactNode;
}
function _InputGroupWrapper({
  groupProps,
  labelProps,
  label,
  isRequired,
  children,
  className,
  error,
  infoMsg,
  successMsg,
}: InputGroupWrapperProps): React.ReactElement {
  const groupClasses = classNames(style.inputGroup, {
    [`${className}`]: className,
  });

  const labelClasses = classNames(style.inputGroupLabel, {
    [`${className}__label`]: !!className,
    [style.required]: isRequired,
    [`${className}__label--required`]: !!className && isRequired,
  });

  const elementsClasses = classNames(style.inputGroupElements, {
    [`${className}__elements`]: className,
  });

  return (
    <div {...groupProps} className={groupClasses}>
      <span {...labelProps} className={labelClasses}>
        {label}
      </span>
      <div className={elementsClasses}>{children}</div>
      <WrapperStatusMsg error={error} successMsg={successMsg} infoMsg={infoMsg} className={className} />
    </div>
  );
}
export const InputGroupWrapper = React.memo(_InputGroupWrapper);
