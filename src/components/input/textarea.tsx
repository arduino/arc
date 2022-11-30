import React, { useState, useRef, useCallback } from 'react';
import { uniqueId } from 'lodash';
import classNames from 'classnames';
import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize';

import { GenericFieldProps } from '../utils';
import { Wrapper, WrapperProps } from '../wrapper';

// Import css styles and bind the class names
import style from './input.module.scss';

export interface TextareaProps extends TextareaAutosizeProps, GenericFieldProps, WrapperProps {
  /**
   * contains the initial value of the textarea
   */
  value?: string;
}

export function Textarea({
  value = '',
  onChange,
  id: fieldId,
  maxLength,
  label,
  error,
  successMsg,
  infoMsg,
  isDisabled,
  isReadOnly,
  isRequired,
  helper,
  ...restProps
}: TextareaProps): React.ReactElement {
  // Control the component with react
  const [id] = useState(fieldId || uniqueId());
  const [inputValue, setValue] = useState(value || '');

  const textInput = useRef(null);

  const changeValue = useCallback(
    (e) => {
      setValue((e.target as HTMLTextAreaElement).value);

      // Bubble up event
      if (onChange) {
        onChange(e);
      }
    },
    [onChange]
  );

  // Compute css classes
  const textareaClasses = classNames(style.textarea, {
    [style['hasValue']]: inputValue && inputValue.length > 0,
    ['hasValue']: inputValue && inputValue.length > 0,
    [style['success']]: successMsg && successMsg.length,
    [style['error']]: error && error.length,
    [style['withCounter']]: maxLength && maxLength > 0,
  });

  // prepare wrapper props
  const wrapperProps: WrapperProps = {
    label,
    error,
    successMsg,
    infoMsg,
    htmlFor: id,
    helper,
    className: 'textarea',
  };

  // Render component
  return (
    <Wrapper {...wrapperProps}>
      <TextareaAutosize
        value={inputValue}
        {...restProps}
        disabled={isDisabled}
        required={isRequired}
        readOnly={isReadOnly}
        id={id}
        ref={textInput}
        maxLength={maxLength}
        className={textareaClasses}
        onChange={changeValue}
      />
      {maxLength && maxLength > 0 && (
        <div className={style.textareaCounter}>
          <span className={style.counter}>{textInput?.current?.value?.length || 0}</span>
          <span> / {maxLength}</span>
        </div>
      )}
    </Wrapper>
  );
}
