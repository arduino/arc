import React, { useCallback, useState } from 'react';
import _uniqueId from 'lodash/uniqueId';
import classNames from 'classnames';
import { IconAccountViewFilled, IconAccountViewOffFilled } from '@bcmi-labs/react-icons';

import { GenericFieldProps, GenericFieldPropsEvents } from '../utils';
import { Wrapper, WrapperProps } from '../wrapper';

// Import css styles and bind the class names
import style from './input.module.scss';

export interface PasswordProps extends GenericFieldProps, GenericFieldPropsEvents<HTMLInputElement>, WrapperProps {
  /**
   * contains the initial value of the password
   */
  value?: string;
}

export function Password({
  value = '',
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
  ...restProps
}: PasswordProps): React.ReactElement {
  // Control the component with react
  const [id] = useState(fieldId || _uniqueId());
  const [inputValue, setValue] = useState(value || '');
  const [visibility, setVisibility] = useState(false);
  // Compute type of input according to visibility
  const inputType = visibility ? 'text' : 'password';

  const changeValue = useCallback((e) => {
    setValue(e.currentTarget.value);

    // Bubble up event
    if (onChange) {
      onChange(e);
    }
  }, []);

  // Compute css classes
  const inputClasses = classNames(style.input, {
    [style['hasValue']]: inputValue && inputValue.length > 0,
    ['hasValue']: inputValue && inputValue.length > 0,
    [style['success']]: successMsg && successMsg.length,
    [style['error']]: error && error.length,
  });
  const visibilityToggleClasses = classNames(style.toggleVisibility, {
    [style['show']]: inputValue && inputValue.length > 0,
  });

  // prepare wrapper props
  const wrapperProps: WrapperProps = {
    label,
    error,
    successMsg,
    infoMsg,
    htmlFor: id,
  };

  return (
    <Wrapper {...wrapperProps}>
      <input
        type={inputType}
        value={inputValue}
        {...restProps}
        disabled={isDisabled}
        required={isRequired}
        readOnly={isReadOnly}
        id={id}
        name={name}
        className={inputClasses}
        onChange={changeValue}
      />
      {visibility && (
        <IconAccountViewOffFilled
          className={visibilityToggleClasses}
          onClick={() => setVisibility(!visibility)}
        ></IconAccountViewOffFilled>
      )}
      {!visibility && (
        <IconAccountViewFilled
          className={visibilityToggleClasses}
          onClick={() => setVisibility(!visibility)}
        ></IconAccountViewFilled>
      )}
    </Wrapper>
  );
}
