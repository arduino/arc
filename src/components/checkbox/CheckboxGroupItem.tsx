import React, { useState } from 'react';
import { uniqueId } from 'lodash';
import { useCheckboxGroupItem } from 'react-aria';

import { WrapperProps } from '../wrapper';
import { GenericFieldProps } from '../utils';
import { CheckboxGroupContext } from '../input/group/CheckboxGroup';
import { RadioCheckboxWrapper, useCheckboxLabelStyle, useRadioCheckboxInputStyle } from './RadioCheckboxWrapper';

export interface CheckboxGroupItemProps extends Omit<GenericFieldProps, 'placeholder'>, WrapperProps {
  /**
   * Provides the behavior and accessibility implementation for a checkbox component contained within a checkbox group.
   * Checkbox groups allow users to select multiple items from a list of options.
   */
  isIndeterminate?: boolean;
  /** The value the checkbox assumes when it's checked */
  value: string;
}

/**
 * This a checkbox item, meant to be wrapped in a ChecboxGroup component.
 * It differs from the standalone Checkbox component as the latter has internal state and can be used standalone.
 * CheckboxGroupItem, on the contrary, relies on state from ChecboxGroup and is used to group checboxes together.
 */
export function CheckboxGroupItem({
  label,
  isRequired,
  infoMsg = null,
  isIndeterminate,
  isDisabled,
  className = null,
  error,
  withoutStatus = true,
  ...props
}: CheckboxGroupItemProps): React.ReactElement {
  const [id] = useState(props.id || uniqueId());

  const state = React.useContext(CheckboxGroupContext);

  const ref = React.useRef();
  const { inputProps } = useCheckboxGroupItem(
    { id, isIndeterminate, isDisabled: state.isDisabled || isDisabled, ['aria-label']: label, ...props },
    state,
    ref
  );

  const inputClasses = useRadioCheckboxInputStyle({
    className,
    error,
  });

  const { labelClasses, checkboxClasses, labelTextClasses } = useCheckboxLabelStyle({
    className,
    isDisabled: state.isDisabled || isDisabled,
    isIndeterminate,
    isRequired,
  });

  const CheckboxWrapperProps = {
    id,
    label,
    error,
    className,
    isIndeterminate,
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
      <span className={checkboxClasses}></span>
    </RadioCheckboxWrapper>
  );
}
