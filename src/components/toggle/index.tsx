import React, { useState, useCallback, useEffect } from 'react';
import { uniqueId } from 'lodash';
import classNames from 'classnames';
import Switch from 'react-switch';
import { GenericFieldProps } from '../utils';
import { Wrapper, WrapperProps } from '../wrapper';

// Import css styles and bind the class names
import style from './toggle.module.scss';

export interface ToggleProps extends GenericFieldProps, WrapperProps {
  /**
   * contains the initial value of the toggle
   */
  value?: boolean;

  /**
   * The switch will take on this color when it is **not** checked. Only accepts 3 or 6 digit hex colors, e.g., #888, #45abcd.
   *
   * Defaults to #C9D2D2.
   */
  offColor?: string;

  /** The switch will take on this color when it is checked. Only accepts 3 or 6 digit hex colors, e.g., #080, #45abcd.
   *
   * Defaults to #008184.
   */
  onColor?: string;

  /**
   * The color of the handle of the switch when **not** checked. Only accepts 3 or 6 digit hex colors, e.g., #fff, #45abcd.
   *
   * Defaults to #fff.
   */
  offHandleColor?: string;

  /**
   * The color of the handle of the switch when checked. Only accepts 3 or 6 digit hex colors, e.g., #fff, #45abcd.
   *
   * Defaults to #fff.
   */
  onHandleColor?: string;
  /**
   * The color of the handle of the switch when checked. Only accepts 3 or 6 digit hex colors, e.g., #fff, #45abcd.
   *
   * Defaults to #fff.
   */
  activeLabel?: string;

  width?: number;
  height?: number;

  onChange?: ((value: boolean) => void) & (() => boolean);
  onBlur?: (value: boolean) => void;
}

export function Toggle({
  value,
  onChange,
  id: fieldId,
  name,
  label,
  activeLabel,
  error,
  successMsg,
  infoMsg,
  isDisabled,
  isReadOnly,
  isRequired,
  helper,
  offColor = '#c9d2d2',
  onColor = '#008184',
  width = 38,
  height = 20,
  ...restProps
}: ToggleProps): React.ReactElement {
  // Control the component with react
  const [id] = useState(fieldId || uniqueId());
  const [toggleValue, setValue] = useState(value || false);

  useEffect(() => {
    setValue(value);
  }, [value]);

  const changeValue = useCallback(
    (val: boolean) => {
      // Bubble up event
      if (onChange) {
        const res = onChange(val);
        if (typeof res === 'boolean') {
          return setValue(res);
        }
      }
      setValue(val);
    },
    [onChange]
  );

  // Compute css classes
  const toggleClasses = classNames(`${style.toggle} zh-toggle`, {
    [style['success']]: successMsg && successMsg.length,
    [style['error']]: error && error.length,
    active: toggleValue,
  });

  // prepare wrapper props
  const wrapperProps: WrapperProps = {
    label,
    error,
    successMsg,
    infoMsg,
    htmlFor: id,
    helper,
    className: 'zh-toggle',
  };

  return (
    <Wrapper {...wrapperProps} label={activeLabel ? (toggleValue ? activeLabel : label) : label}>
      <Switch
        id={id}
        checkedIcon={false}
        uncheckedIcon={false}
        height={height}
        width={width}
        handleDiameter={Math.ceil(height / 1.33)}
        offColor={offColor}
        onColor={onColor}
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
