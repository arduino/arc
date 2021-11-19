import React, { useState, useEffect, useCallback } from 'react';
import ReactSelect, { components, ValueType } from 'react-select';
import { uniqueId } from 'lodash';
import classNames from 'classnames';

import {
  IconCloseEncapsulated,
  IconNavigationArrowChevronNormalDown,
  IconNavigationArrowCaretNormalDown,
} from '@arduino/react-icons';

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

export type SelectVariants = 'normal' | 'light' | 'transparent' | 'small' | 'rounded' | 'transparent';

export interface SelectProps extends SelecReactSelectType, Omit<GenericFieldProps, 'isReadOnly'>, WrapperProps {
  defaultValue?: string[];
  options: SelectOption[];
  hideSelected?: boolean;
  isMulti?: boolean;
  isSearchable?: boolean;
  className?: string;
  onBlur?: (e: React.FocusEvent<HTMLElement>) => void;
  onChange?: (values: string | string[]) => void;
  value?: string[];
  placeholder?: string | null;
  variants?: SelectVariants[];
}

const ClearIndicator = (props: { innerProps: Record<string, any> }) => {
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

const DropdownIndicator = (props: any) => {
  console.log(props);
  return (
    <components.DropdownIndicator {...props}>
      {props.isLight ? (
        <IconNavigationArrowChevronNormalDown width="1.5rem" height="1.5rem" />
      ) : (
        <IconNavigationArrowCaretNormalDown width="1.6rem" height="1.6rem" />
      )}
    </components.DropdownIndicator>
  );
};

const getOptionsInfoMsg = (opts: ValueType<SelectOption, any> | null): string | null => {
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
  variants = ['normal'],
  ...restProps
}: SelectProps): React.ReactElement {
  // Control the component with react
  const [selectId] = useState(id || uniqueId());

  const [infoMsg, setInfoMsg] = useState(fieldInfoMsg);

  const [hasValue, setHasValue] = useState(!!defaultValue);
  const [hasFocus, setHasFocus] = useState(false);

  const [valueFromProps, setValueFromProps] = useState<SelectOption | SelectOption[]>();

  // on component mount check existing selections on options
  useEffect(() => {
    setInfoMsg(getDefaultInfoMsg(defaultValue, options) || fieldInfoMsg);
  }, [defaultValue, fieldInfoMsg, options]);

  // on component mount check values and set state accordingly
  useEffect(() => {
    const valArray = Array.isArray(value) ? value : [value];
    const selVal = valArray.map((v) => options.find((opt) => v === opt.value)).filter((v) => !!v);

    if (selVal.length > 0) {
      setValueFromProps(isMulti ? selVal : selVal[0]);
    } else {
      setValueFromProps(undefined);
    }
  }, [isMulti, options, value]);

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

  const selectChanged = useCallback(
    (evt: ValueType<SelectOption, any>): void => {
      setInfoMsg(getOptionsInfoMsg(evt) || fieldInfoMsg);

      if (!evt) {
        setHasValue(false);
        onChange(null);
        return;
      }

      const values = Array.isArray(evt)
        ? (evt as SelectOption[]).map((item) => item.value)
        : (evt as SelectOption).value;

      setHasValue(true);
      onChange(values);
    },
    [fieldInfoMsg, onChange]
  );

  const variantsClasses = [''].concat(variants).join(' zh-select--');

  const selectClasses = classNames(`zh-select ${variantsClasses}`, style['zh-select'], {
    [`${className}__zh-select`]: !!className,
    required: isRequired,
    error: !!error,
    hasValue: placeholder || hasValue || hasFocus,
    noLabel: !label,
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
          typeof onBlur === 'function' && onBlur(e);
        }}
        value={valueFromProps}
        isSearchable={isSearchable}
        closeMenuOnSelect={closeMenuOnSelect}
        placeholder={placeholder || null}
        components={{
          ClearIndicator,
          // eslint-disable-next-line react/display-name
          DropdownIndicator: (props) => <DropdownIndicator {...props} isLight={variants.includes('light')} />,
        }}
        tabSelectsValue={false}
        onChange={selectChanged}
        className={selectClasses}
        name={name || 'ui-selector'}
        classNamePrefix="zh-select"
      />
    </Wrapper>
  );
}
