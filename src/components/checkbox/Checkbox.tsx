import React, { useCallback, useState } from 'react';
import { uniqueId } from 'lodash';
import { useToggleState } from 'react-stately';
import { useCheckbox } from 'react-aria';

import { WrapperProps } from '../wrapper';
import { GenericFieldProps, GenericFieldPropsEvents } from '../utils';
import { RadioCheckboxWrapper, useCheckboxLabelStyle, useRadioCheckboxInputStyle } from './RadioCheckboxWrapper';

export interface CheckboxProps
  extends Omit<GenericFieldProps, 'placeholder'>,
    GenericFieldPropsEvents<HTMLInputElement>,
    WrapperProps {
  /** Generally used for checkboxes reflecting the state of nested checkboxes in a parent/child hierarcy */
  isIndeterminate?: boolean;
  /** The value the checkbox assumes when it's checked */
  value?: string;
  /** Whether the element should be selected (uncontrolled). */
  defaultSelected?: boolean;
  /** Whether the element should be selected (controlled). */
  isSelected?: boolean;
}

/**
 * The Checkbox components is a standalone checbox used to manage simple toggles as it ships with internal state.
 * If you need a list list of checked values to be associated with a single field, you probably need to rely on
 * ChecboxGroup component, that has a shared state between differenct chekboxes.
 */
export function Checkbox({
  onChange,
  label,
  isRequired,
  infoMsg = null,
  isReadOnly,
  isDisabled,
  isIndeterminate,
  className = null,
  error,
  withoutStatus,
  ...props
}: CheckboxProps): React.ReactElement {
  const [id] = useState(props.id || uniqueId());

  const state = useToggleState({ isReadOnly, isDisabled, ...props });
  const ref = React.useRef();
  const { inputProps } = useCheckbox(
    {
      id,
      isIndeterminate,
      isReadOnly,
      isDisabled,
      ['aria-label']: label,
      ...props,
    },
    state,
    ref
  );

  // Override react-aria onChange, as we want to propagate the original events
  // in order to enable accessing `e.target` in out custom callbacks
  const onChangeCb = useCallback(
    (e) => {
      inputProps.onChange(e);
      if (onChange) {
        onChange(e);
      }
    },
    [inputProps, onChange]
  );

  const inputClasses = useRadioCheckboxInputStyle({
    className,
    error,
  });

  const { labelClasses, checkboxClasses, labelTextClasses } = useCheckboxLabelStyle({
    className,
    isDisabled,
    isIndeterminate,
    isRequired,
  });

  const CheckboxWrapperProps = {
    id,
    label,
    error,
    className,
    isIndeterminate,
    isDisabled,
    isRequired,
    infoMsg,
    withoutStatus,
    labelClasses,
    labelTextClasses,
  };

  return (
    <RadioCheckboxWrapper {...CheckboxWrapperProps}>
      <input {...inputProps} className={inputClasses} ref={ref} onChange={onChangeCb} />
      <span className={checkboxClasses}></span>
    </RadioCheckboxWrapper>
  );
}
