import React, { FC, useState } from 'react';
import classnames from 'classnames';
import _uniqueId from 'lodash/uniqueId';

import style from './checkbox.module.scss';
import { Wrapper, WrapperProps } from '../wrapper';
import { TextWithLink } from '../textWithLink';
import { GenericFieldProps, GenericFieldPropsEvents } from '../utils';

export interface CheckboxProps extends GenericFieldProps, GenericFieldPropsEvents<HTMLInputElement>, WrapperProps {
  /**
   * Generally used for checkboxes reflecting the state of nested checkboxes in a parent/child hierarcy
   */
  indeterminate?: boolean;

  /**
   * The initial state of the checkbox element
   */
  checked?: boolean;

  /**
   * The value the checkbox assumes when it's checked
   */
  value?: string;
}

export function Checkbox({
  onChange,
  label,
  required,
  infoMsg = null,
  indeterminate = false,
  checked = false,
  value = '',
  className = null,
  ...props
}: CheckboxProps): React.ReactElement {
  const [id] = useState(props.id || _uniqueId());

  const [isChecked, setChecked] = useState(checked);

  const labelClasses = classnames(style.checkbox, {
    [`${style.indeterminate}`]: indeterminate,
    [`${className}__label`]: className,
    [`${className}__label--indeterminate`]: className && indeterminate,
  });
  const inputClasses = classnames(style.input, {
    [`${style.error}`]: props.error,
    [`${className}__input`]: className,
    [`${className}__input--error`]: className && props.error,
  });
  const checkboxClasses = classnames(style['custom-checkbox'], { [`${className}__custom-checkbox`]: className });
  const requiredClasses = classnames({ [`${style.required}`]: required, [`${className}__required`]: className });

  // prepare wrapper props
  const wrapperProps: WrapperProps = {
    label: null,
    error: props.error,
    infoMsg,
    className,
  };

  return (
    <Wrapper {...wrapperProps}>
      <label className={labelClasses} htmlFor={id}>
        <input
          id={id}
          {...props}
          checked={isChecked}
          required={required}
          value={value}
          className={inputClasses}
          type="checkbox"
          onChange={(evt): void => {
            onChange(evt);
            setChecked(evt.target.checked);
          }}
        />
        <span className={checkboxClasses}></span>
        <span className={requiredClasses}>
          <TextWithLink text={label} />
        </span>
      </label>
    </Wrapper>
  );
}
