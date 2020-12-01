import React, { useState, useEffect } from 'react';
import ReactSelect, { components, ValueType } from 'react-select';
import _uniqueId from 'lodash/uniqueId';
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

export interface SelectProps extends SelecReactSelectType, GenericFieldProps, WrapperProps {
  defaultValue?: SelectOption | SelectOption[];
  options: SelectOption[];
  hideSelected?: boolean;
  isMulti?: boolean;
  isSearchable?: boolean;
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
  id,
  options,
  value, // remove value prop as it breaks ReactSelect
  defaultValue,
  onChange,
  label,
  disabled,
  successMsg,
  error,
  infoMsg: fieldInfoMsg,
  required,
  ...restProps
}: SelectProps): React.ReactElement {
  // Control the component with react
  const [selectId] = useState(id || _uniqueId());

  const [infoMsg, setInfoMsg] = useState(fieldInfoMsg);

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
  };

  const selectClasses = classNames('hasValue', 'zh-select', style['zh-select'], { required: required });

  const valueFromProps = Array.isArray(value)
    ? options.filter((option) => value.includes(option.value))
    : options.find((option) => value === option.value);

  return (
    <Wrapper {...wrapperProps} htmlFor={selectId}>
      <ReactSelect
        {...restProps}
        inputId={selectId}
        isClearable={isClearable}
        isDisabled={disabled}
        isMulti={isMulti}
        options={options}
        defaultValue={defaultValue}
        value={valueFromProps}
        isSearchable={isSearchable}
        closeMenuOnSelect={closeMenuOnSelect}
        placeholder={placeholder || null}
        components={{ ClearIndicator, DropdownIndicator }}
        tabSelectsValue={false}
        onChange={(evt: ValueType<SelectOption>): void => {
          setInfoMsg(getOptionsInfoMsg(evt) || fieldInfoMsg);

          if (!evt) {
            onChange(null);
            return;
          }

          const values = Array.isArray(evt)
            ? (evt as SelectOption[]).map((item) => item.value)
            : (evt as SelectOption).value;

          onChange(values);
        }}
        className={selectClasses}
        name="ui-selector"
        classNamePrefix="zh-select"
      />
    </Wrapper>
  );
}
