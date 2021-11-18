import React, { useState, useCallback } from 'react';
import { uniqueId } from 'lodash';
import classNames from 'classnames';
import Switch from 'react-switch';
import { GenericFieldProps, GenericFieldPropsEvents } from '../utils';
import { Wrapper, WrapperProps } from '../wrapper';

// Import css styles and bind the class names
import style from './toggle.module.scss';

export interface ToggleProps extends GenericFieldProps, WrapperProps {
  /**
   * contains the initial value of the toggle
   */
  value?: boolean;

  onChange?: (value: boolean) => void;
  onBlur?: (value: boolean) => void;
}

export function Toggle({
  value = false,
  onChange,
  id: fieldId,
  name,
  label,
  error,
  successMsg,
  infoMsg,
  isDisabled,
  isReadOnly,
  isRequired,
  helper,
  ...restProps
}: ToggleProps): React.ReactElement {
  // Control the component with react
  const [id] = useState(fieldId || uniqueId());
  const [toggleValue, setValue] = useState(value || false);

  const changeValue = useCallback(
    (val: boolean) => {
      setValue(val);

      // Bubble up event
      if (onChange) {
        onChange(val);
      }
    },
    [onChange]
  );

  // Compute css classes
  const toggleClasses = classNames(style.toggle, {
    [style['success']]: successMsg && successMsg.length,
    [style['error']]: error && error.length,
  });

  // prepare wrapper props
  const wrapperProps: WrapperProps = {
    label,
    error,
    successMsg,
    infoMsg,
    htmlFor: id,
    helper,
  };

  return (
    <Wrapper {...wrapperProps}>
      <Switch
        id={id}
        checkedIcon={false}
        uncheckedIcon={false}
        height={20}
        width={37}
        handleDiameter={14}
        offColor="#C9D2D2"
        onColor="#008184"
        {...restProps}
        onChange={changeValue}
        checked={toggleValue}
        disabled={isDisabled}
        required={isRequired}
        readOnly={isReadOnly}
        name={name}
        className={toggleClasses}
      />
    </Wrapper>
  );
}
