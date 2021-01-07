import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactSelect, { components, ValueType } from 'react-select';
import { uniqueId } from 'lodash';
import classNames from 'classnames';

import { IconCloseEncapsulated, IconNavigationArrowCaretNormalDown } from '@bcmi-labs/react-icons';

import { GenericFieldProps } from '../utils';
import { Wrapper, WrapperProps } from '../wrapper';

import style from './select.module.scss';

export interface SelectOption {
  value: string;
  label: string;
  infoMsg?: string;
}

// Omit placeholder and value from react-select. We use our own.
type SelecReactSelectType = Omit<React.ComponentProps<typeof ReactSelect>, 'placeholder'>;

export interface SelectProps extends SelecReactSelectType, Omit<GenericFieldProps, 'isReadOnly'>, WrapperProps {
  defaultValue?: SelectOption | SelectOption[];
  options: SelectOption[];
  hideSelected?: boolean;
  isMulti?: boolean;
  isSearchable?: boolean;
  size?: 'normal' | 'small';
  onChange?: (values: string | string[]) => void;
}

const ClearIndicator = (props) => {
  const {
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div className={classNames('custom-close-wrapper')}>
      <IconCloseEncapsulated
        {...restInnerProps}
        ref={ref}
        className={classNames('custom-close')}
      ></IconCloseEncapsulated>
    </div>
  );
};

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <IconNavigationArrowCaretNormalDown width="2em" height="2em" />
    </components.DropdownIndicator>
  );
};

const getOptionsInfoMsg = (opts: ValueType<SelectOption> | null): string | null => {
  if (!opts || (Array.isArray(opts) && opts.length === 0)) {
    return null;
  }

  return Array.isArray(opts)
    ? (opts as SelectOption[])
        .map((item) => item.infoMsg || null)
        .filter((msg) => msg && msg.length > 0)
        .join('; ')
    : (opts as SelectOption).infoMsg;
};

export function Select({
  isMulti = false,
  isSearchable = true,
  placeholder = 'Type to Search',
  size = 'normal',
  id,
  name,
  options,
  value, // remove value prop as it breaks ReactSelect
  defaultValue,
  onChange,
  onBlur,
  label,
  isDisabled,
  successMsg,
  error,
  infoMsg: fieldInfoMsg,
  isRequired,
  helper,
  ...restProps
}: SelectProps): React.ReactElement {
  // Control the component with react
  const [selectId] = useState(id || uniqueId());

  const [infoMsg, setInfoMsg] = useState(fieldInfoMsg);

  const [hasValue, setHasValue] = useState(!!defaultValue);
  const [hasFocus, setHasFocus] = useState(false);

  // on component mount check existing selections on options
  useEffect(() => {
    setInfoMsg(getOptionsInfoMsg(defaultValue) || fieldInfoMsg);
  }, []);

  const closeMenuOnSelect = !isMulti;
  const isClearable = isMulti;

  // prepare wrapper props
  const wrapperProps: WrapperProps = {
    label,
    error,
    successMsg,
    infoMsg,
    htmlFor: selectId,
    helper,
  };

  const valueFromProps = Array.isArray(value)
    ? options.filter((option) => value.includes(option.value))
    : options.find((option) => value === option.value);

  const selectChanged = useCallback((evt: ValueType<SelectOption>): void => {
    setInfoMsg(getOptionsInfoMsg(evt) || fieldInfoMsg);

    if (!evt) {
      setHasValue(false);
      onChange(null);
      return;
    }

    const values = Array.isArray(evt) ? (evt as SelectOption[]).map((item) => item.value) : (evt as SelectOption).value;

    setHasValue(true);
    onChange(values);
  }, []);

  const selectClasses = classNames('zh-select', style['zh-select'], {
    required: isRequired,
    error: !!error,
    hasValue: placeholder || hasValue || hasFocus,
    noLabel: !label,
    small: size === 'small',
  });

  return (
    <Wrapper {...wrapperProps} htmlFor={selectId}>
      <ReactSelect
        {...restProps}
        inputId={selectId}
        isClearable={isClearable}
        isDisabled={isDisabled}
        isMulti={isMulti}
        options={options}
        defaultValue={defaultValue}
        onFocus={() => setHasFocus(true)}
        onBlur={(e) => {
          setHasFocus(false);
          onBlur(e);
        }}
        value={valueFromProps}
        isSearchable={isSearchable}
        closeMenuOnSelect={closeMenuOnSelect}
        placeholder={placeholder || null}
        components={{ ClearIndicator, DropdownIndicator }}
        tabSelectsValue={false}
        onChange={selectChanged}
        className={selectClasses}
        name={name || 'ui-selector'}
        classNamePrefix="zh-select"
      />
    </Wrapper>
  );
}
