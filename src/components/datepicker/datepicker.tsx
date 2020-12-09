import React, { useState, useRef } from 'react';
import _uniqueId from 'lodash/uniqueId';
import classNames from 'classnames';
import { IconCloseEncapsulated } from '@bcmi-labs/react-icons';

import DateInput from './DateInput';

import { DateInputBaseProps } from './models/DatePicker.model';
import { debounce } from '../utils/func';
import { Wrapper, WrapperProps } from '../wrapper';

// Import css styles and bind the class names
import style from './datepicker.module.scss';

// checker of Date
function checkerDateValue(date: Date | string): Date {
  if (date instanceof Date) {
    return date;
  }

  if (typeof date === 'string') {
    if (!isNaN(Date.parse(date))) {
      return new Date(date);
    }
  }

  return null;
}

export interface DatePickerProps extends DateInputBaseProps, WrapperProps {
  /**
   * show a _clear_ button when input has value
   */
  clearable?: boolean;
  name?: string;
  onChange?: (value: Date) => void;
}

export function DatePicker({
  value = null,
  clearable,
  id: fieldId,
  label,
  error,
  successMsg,
  infoMsg,
  name,
  required,
  disabled,
  readOnly,
  onChange,
  onError,
  ...restProps
}: DatePickerProps): React.ReactElement {
  // Control the component with react
  const [id] = useState(fieldId || _uniqueId());
  const [isFocused, setFocus] = useState(false);
  const [date, setDate] = useState(checkerDateValue(value) || null);
  const [dateError, setDateError] = useState('');

  const datepicker = useRef(null);

  // prepare wrapper props
  const wrapperProps: WrapperProps = {
    label,
    error: error || dateError,
    successMsg,
    infoMsg,
    htmlFor: id,
  };

  const handlerOnChange = (value) => {
    setDate(value);
    if (onChange) {
      onChange(value);
    }
  };

  const resetValue = (e) => {
    handlerOnChange(null);
    if (datepicker) {
      datepicker.current.click();
    }
  };

  // this function set the latest changes of focus state
  const setFocusState: (state: boolean) => void = debounce((state: boolean) => {
    setFocus(state);
  }, 100);
  const handlerFocus = () => {
    if (!disabled) {
      setFocusState(true);
    }
  };
  const handlerBlur = () => {
    setFocusState(false);
  };

  const handlerError = (error: string): void => {
    setDateError(error);

    if (onError) {
      onError(error);
    }
  };

  const datepickerClasses = classNames('hasValue', 'zh-datepicker', style['zh-datepicker'], {
    required: required,
    [style['focus']]: isFocused,
    [style['success']]: successMsg && successMsg.length,
    [style['error']]: (error && error.length) || (dateError && dateError.length),
    [style['disabled']]: disabled,
    ['disabled']: disabled,
    [style['readOnly']]: readOnly,
    [style['clearable']]: clearable,
  });

  // Render component
  return (
    <Wrapper {...wrapperProps}>
      <DateInput
        {...restProps}
        disabled={disabled}
        readOnly={readOnly}
        className={datepickerClasses}
        name={name}
        ref={datepicker}
        required={required}
        value={date}
        onChange={handlerOnChange}
        onFocus={handlerFocus}
        onBlur={handlerBlur}
        onError={handlerError}
      />
      {date !== null && clearable && !disabled && !readOnly && (
        <IconCloseEncapsulated
          className={classNames(style.close, style.datepickerAction)}
          onClick={resetValue}
        ></IconCloseEncapsulated>
      )}
    </Wrapper>
  );
}
