import React, { useState, useEffect, useRef, useCallback, InputHTMLAttributes } from 'react';
import { uniqueId } from 'lodash';
import classNames from 'classnames';
import { IconNavigationCloseNormal, IconNavigationAddPlusNormal } from '@arduino/react-icons';

import { GenericFieldProps, GenericFieldPropsEvents } from '../utils';
import { Wrapper, WrapperProps } from '../wrapper';

// Import css styles and bind the class names
import style from './uploadInput.module.scss';

export interface UploadInputProps
  extends GenericFieldProps,
    GenericFieldPropsEvents<HTMLInputElement>,
    WrapperProps,
    InputHTMLAttributes<HTMLInputElement> {
  /**
   * contains the initial value of the input
   */
  value?: string;

  /**
   * show a _clear_ button when input has value
   */
  clearable?: boolean;

  buttons?: React.ReactElement[];
}

export function UploadInput({
  value = '',
  onChange,
  id: fieldId,
  name,
  error,
  successMsg,
  infoMsg,
  withoutStatus,
  isDisabled,
  isReadOnly,
  isRequired,
  helper,
  className,
  ...restProps
}: UploadInputProps): React.ReactElement {
  // Control the component with react
  const [id] = useState(fieldId || uniqueId());
  const [inputValue, setValue] = useState(value || '');
  const [fileName, setFileName] = useState(null);

  const textInput = useRef(null);

  const changeValue = useCallback(
    (e) => {
      setValue(e.currentTarget.value);

      // Bubble up event
      if (onChange) {
        onChange(e);
      }
    },
    [onChange]
  );

  // Listen for value changes and act accordingly
  useEffect(() => {
    setFileName(value.replace(/.*[\/\\]/, ''));
    setValue(value);
  }, [value]);

  const resetValue = (): void => {
    setValue('');
    setFileName(null);

    // some magic to fake onChange without correct event
    const target = document.createElement('input');
    const event = new Event('change', { bubbles: true });
    Object.defineProperty(event, 'target', { writable: false, value: target });
    Object.defineProperty(event, 'currentTarget', { writable: false, value: target });
    changeValue(event);
    textInput.current.focus();
  };

  //Upload input have a single css variant: normal
  const inputClasses = classNames(`${style.fileUpload} normal`, {
    ['hasValue']: inputValue && inputValue.length > 0,
    [style['success']]: successMsg && successMsg.length,
    [style['error']]: error && error.length,
    [`${className}__input`]: className,
    [style['without-label']]: true,
  });

  // prepare wrapper props
  const wrapperProps: WrapperProps = {
    error,
    successMsg,
    infoMsg,
    htmlFor: id,
    withoutStatus,
    helper,
    className: 'fileUpload',
  };

  return (
    <Wrapper {...wrapperProps}>
      <label htmlFor={id} className={inputClasses} onClick={resetValue}>
        {fileName ? (
          <div>
            <span className={classNames(style.iconAdd)}>
              <IconNavigationCloseNormal />
            </span>
            {fileName}
          </div>
        ) : (
          <div>
            <span className={classNames(style.iconAdd)}>
              <IconNavigationAddPlusNormal />
            </span>
            {restProps.placeholder} {isRequired && <span className={classNames(style.required)}>*</span>}
          </div>
        )}
      </label>
      <input
        style={{ opacity: 0, zIndex: -1, position: 'absolute' }}
        value={inputValue}
        disabled={isDisabled}
        type="file"
        required={isRequired}
        readOnly={isReadOnly}
        id={id}
        name={name}
        ref={textInput}
        className={classNames(inputClasses, style.inputHided)}
        onChange={changeValue}
        {...restProps}
      />
    </Wrapper>
  );
}
