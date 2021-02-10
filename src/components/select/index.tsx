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
  defaultValue?: string[];
  options: SelectOption[];
  hideSelected?: boolean;
  isMulti?: boolean;
  isSearchable?: boolean;
  size?: 'normal' | 'small';
  className?: string;
  onBlur?: (e: React.FocusEvent<HTMLElement>) => void;
  onChange?: (values: string | string[]) => void;
  value?: string[];
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

const getDefaultInfoMsg = (opts: string[] | null, options: SelectOption[]): string | null => {
  if (!opts || (Array.isArray(opts) && opts.length === 0)) {
    return null;
  }

  const defaultOptions = opts.map((opt) => {
    return options.find((o) => o.value === opt);
  });

  return defaultOptions
    ? defaultOptions
        .map((defOpt) => defOpt.infoMsg || null)
        .filter((msg) => !!msg)
        .join('; ')
    : null;
};

export function Select({
  isMulti = false,
  isSearchable = true,
  placeholder = 'Type to Search',
  size = 'normal',
  id,
  name,
  options,
  value,
  defaultValue,
  onChange,
  onBlur,
  className,
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

  const [valueFromProps, setvalueFromProps] = useState<SelectOption | SelectOption[]>();

  // on component mount check existing selections on options
  useEffect(() => {
    setInfoMsg(getDefaultInfoMsg(defaultValue, options) || fieldInfoMsg);
  }, []);

  // on component mount check values and set state accordingly
  useEffect(() => {
    const valArray = Array.isArray(value) ? value : [value];
    const selVal = valArray.map((v) => options.find((opt) => v === opt.value)).filter((v) => !!v);

    if (selVal.length > 0) {
      setvalueFromProps(isMulti ? selVal : selVal[0]);
    } else {
      setvalueFromProps(undefined);
    }
  }, [value]);

  const closeMenuOnSelect = !isMulti;
  const isClearable = isMulti;

  const defaultOptions = Array.isArray(defaultValue)
    ? defaultValue.map((opt) => options.find((o) => o.value === opt))
    : null;

  // prepare wrapper props
  const wrapperProps: WrapperProps = {
    label,
    error,
    className,
    successMsg,
    infoMsg,
    htmlFor: selectId,
    helper,
  };

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
    [`${className}__zh-select`]: !!className,
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
        defaultValue={defaultOptions}
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
