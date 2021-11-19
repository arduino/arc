import React, { useState, useEffect, useRef, useCallback, InputHTMLAttributes } from 'react';
import { uniqueId } from 'lodash';
import classNames from 'classnames';
import { IconCloseEncapsulated } from '@arduino/react-icons';

import { GenericFieldProps, GenericFieldPropsEvents } from '../utils';
import { Wrapper, WrapperProps } from '../wrapper';

// Import css styles and bind the class names
import style from './input.module.scss';

export type InputVariants = 'normal' | 'light' | 'transparent' | 'small' | 'rounded';
export interface InputProps
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
  variants?: InputVariants[];
}

export function Input({
  value = '',
  onChange,
  clearable,
  id: fieldId,
  name,
  label,
  error,
  successMsg,
  infoMsg,
  buttons,
  withoutStatus,
  isDisabled,
  isReadOnly,
  isRequired,
  helper,
  className,
  variants = ['normal'],
  ...restProps
}: InputProps): React.ReactElement {
  // Control the component with react
  const [id] = useState(fieldId || uniqueId());
  const [inputValue, setValue] = useState(value || '');

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
    setValue(value);
  }, [value]);

  const resetValue = (): void => {
    setValue('');

    // some magic to fake onChange without correct event
    const target = document.createElement('input');
    const event = new Event('change', { bubbles: true });
    Object.defineProperty(event, 'target', { writable: false, value: target });
    Object.defineProperty(event, 'currentTarget', { writable: false, value: target });
    changeValue(event);
    textInput.current.focus();
  };

  // Compute css classes
  const variantsClasses = variants
    .map((name) => {
      return style[name];
    })
    .join(' ');
  console.log(variantsClasses);
  const inputClasses = classNames(`${style.input} ${variantsClasses}`, {
    ['hasValue']: inputValue && inputValue.length > 0,
    [style['success']]: successMsg && successMsg.length,
    [style['error']]: error && error.length,
    [`${className}__input`]: className,
    [style['without-label']]: !label,
  });

  // prepare wrapper props
  const wrapperProps: WrapperProps = {
    label,
    error,
    successMsg,
    infoMsg,
    htmlFor: id,
    withoutStatus,
    helper,
    className,
  };

  const renderButtons = (): React.ReactElement[] => {
    if (!buttons) {
      return null;
    }

    return buttons.map((Button: React.ReactElement) => {
      const { children, ...props } = Button.props;
      return (
        <Button.type key={Button.key} {...props}>
          {children}
        </Button.type>
      );
    });
  };

  const renderControls = (): React.ReactElement => {
    if (!buttons && !(inputValue && inputValue.length > 0 && clearable)) {
      return null;
    }

    return (
      <div className={style['input-controls']}>
        {!isDisabled && renderButtons()}
        {inputValue.length > 0 && clearable && !isDisabled && !isReadOnly && (
          <IconCloseEncapsulated
            className={classNames(style.close, style.inputAction)}
            onClick={resetValue}
          ></IconCloseEncapsulated>
        )}
      </div>
    );
  };

  // Render component
  return (
    <Wrapper {...wrapperProps}>
      <input
        value={inputValue}
        disabled={isDisabled}
        required={isRequired}
        readOnly={isReadOnly}
        id={id}
        name={name}
        ref={textInput}
        className={inputClasses}
        onChange={changeValue}
        {...restProps}
      />
      {renderControls()}
    </Wrapper>
  );
}
