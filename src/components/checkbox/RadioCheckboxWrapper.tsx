import React from 'react';
import classnames from 'classnames';

import style from './radiocheckboxwrapper.module.scss';
import { Wrapper, WrapperProps } from '../wrapper';
import { TextWithLink } from '../textWithLink';
import { GenericFieldProps } from '../utils';

export interface CheckboxWrapperProps extends WrapperProps, Pick<GenericFieldProps, 'id'> {
  labelClasses: string;
  labelTextClasses: string;
}

export function RadioCheckboxWrapper({
  id,
  label,
  infoMsg = null,
  className = null,
  children,
  withoutStatus,
  labelClasses = '',
  labelTextClasses = '',
  error,
}: CheckboxWrapperProps): React.ReactElement {
  // prepare wrapper props
  const wrapperProps: WrapperProps = {
    label: null,
    error: error,
    infoMsg,
    className,
    withoutStatus,
  };

  return (
    <Wrapper {...wrapperProps}>
      <label className={labelClasses} htmlFor={id}>
        {children}
        <span className={labelTextClasses}>
          <TextWithLink text={label} />
        </span>
      </label>
    </Wrapper>
  );
}

export function useRadioCheckboxInputStyle({ className, error }: { className: string; error: string }): string {
  return classnames(style.input, {
    [`${style.error}`]: error,
    [`${className}__input`]: !!className,
    [`${className}__input--error`]: !!className && error,
  });
}

export function useLabelTextStyle({ className, isRequired }: { className: string; isRequired: boolean }): string {
  return classnames(style.labeltext, {
    [`${style.required}`]: isRequired,
    [`${className}__labeltext`]: !!className,
    [`${className}__labeltext--required`]: !!className && isRequired,
  });
}

export function useRadioLabelStyle({
  className,
  isDisabled,
  isRequired,
}: {
  className: string;
  isDisabled: boolean;
  isRequired: boolean;
}): { [k: string]: string } {
  const labelClasses = classnames(style.radio, {
    [`${className}__label`]: !!className,
    [`${style.disabled}`]: isDisabled,
    [`${className}__label--disabled`]: !!className && isDisabled,
  });
  const radioClasses = classnames(style['custom-radio'], { [`${className}__custom-radio`]: !!className });
  const labelTextClasses = useLabelTextStyle({ className, isRequired });

  return { labelClasses, radioClasses, labelTextClasses };
}

export function useCheckboxLabelStyle({
  className,
  isIndeterminate,
  isDisabled,
  isRequired,
}: {
  className: string;
  isIndeterminate: boolean;
  isDisabled: boolean;
  isRequired: boolean;
}): { [k: string]: string } {
  const labelClasses = classnames(style.checkbox, {
    [`${style.indeterminate}`]: isIndeterminate,
    [`${className}__label`]: !!className,
    [`${className}__label--indeterminate`]: !!className && isIndeterminate,
    [`${style.disabled}`]: isDisabled,
    [`${className}__label--disabled`]: !!className && isDisabled,
  });
  const checkboxClasses = classnames(style['custom-checkbox'], { [`${className}__custom-checkbox`]: !!className });
  const labelTextClasses = useLabelTextStyle({ className, isRequired });

  return { labelClasses, checkboxClasses, labelTextClasses };
}
