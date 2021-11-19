import React, { useState } from 'react';
import { uniqueId } from 'lodash';
import { useRadio } from 'react-aria';

import { WrapperProps } from '../wrapper';
import { GenericFieldProps } from '../utils';
import { RadioGroupContext } from '../input/group/RadioGroup';
import { RadioCheckboxWrapper, useRadioCheckboxInputStyle, useRadioLabelStyle } from './RadioCheckboxWrapper';

export interface RadioGroupItemProps extends Omit<GenericFieldProps, 'placeholder'>, WrapperProps {
  /**
   * The value of the radio button, used when submitting an HTML form.
   * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio#Value).
   */
  value: string;
}

/**
 * This is the default radio item, meant to be wrapped in a RadioGroup component.
 * Since radio only make sense in group, this component gets its state from the RadioGroup and cannot be used standalone
 */
export function RadioGroupItem({
  label,
  isRequired,
  infoMsg = null,
  isDisabled,
  className = null,
  error,
  withoutStatus = true,
  ...props
}: RadioGroupItemProps): React.ReactElement {
  const [id] = useState(props.id || uniqueId());

  const state = React.useContext(RadioGroupContext);

  const ref = React.useRef();
  const { inputProps } = useRadio(
    { id, isDisabled: state.isDisabled || isDisabled, ['aria-label']: label, ...props },
    state,
    ref
  );

  const inputClasses = useRadioCheckboxInputStyle({
    className,
    error,
  });
  const { labelClasses, radioClasses, labelTextClasses } = useRadioLabelStyle({
    className,
    isDisabled: state.isDisabled || isDisabled,
    isRequired,
  });

  const CheckboxWrapperProps = {
    id,
    label,
    error,
    className,
    isIndeterminate: false,
    isDisabled: state.isDisabled || isDisabled,
    isRequired,
    infoMsg,
    withoutStatus,
    labelClasses,
    labelTextClasses,
  };

  return (
    <RadioCheckboxWrapper {...CheckboxWrapperProps}>
      <input {...inputProps} className={inputClasses} ref={ref} />
      <span className={radioClasses}></span>
      {props.children}
    </RadioCheckboxWrapper>
  );
}
