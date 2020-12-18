import React, { useState, useRef, useEffect } from 'react';
import _uniqueId from 'lodash/uniqueId';
import classNames from 'classnames';
import { IconCloseEncapsulated } from '@bcmi-labs/react-icons';

import { GenericFieldProps } from '../utils';
import { Wrapper, WrapperProps } from '../wrapper';

import { PhoneInputSettings, CountryDataState, PhoneRegion } from './PhoneInput.model';
import CountryData from './countryData';

import { formatNumber, guessSelectedCountry, getCountryGuess, getFormattedNumber, validateNumber } from './PhoneUtils';
import { CountrySelector } from './CountrySelector';

// Import css styles and bind the class names
import style from './phoneInput.module.scss';

function setGeneralData(input: PhoneInputSettings) {
  const { onlyCountries, preferredCountries, hiddenAreaCodes } = new CountryData(input);
  return { onlyCountries, preferredCountries, hiddenAreaCodes };
}

const KeyBoardKeys = {
  UP: 38,
  DOWN: 40,
  RIGHT: 39,
  LEFT: 37,
  ENTER: 13,
  ESC: 27,
  A: 65,
  Z: 90,
  SPACE: 32,
  TAB: 9,
};

export { PhoneRegion };
export interface PhoneInputProps extends GenericFieldProps, WrapperProps, PhoneInputSettings {
  /**
   * contains the initial value of the input
   */
  value?: string;
  /**
   * show a _clear_ button when input has value
   */
  clearable?: boolean;
  /**
   * on/off phone validation
   */
  validate?: boolean;

  /**
   * add specific class name
   */
  className?: string;

  /**
   * send event when value has been changes
   */
  onChange?: (value: string, country: object, formattedValue: string) => void;
  /**
   * send event when component clicked
   */
  onClick?: (value: string, country: object, formattedValue: string) => void;
  /**
   * send event when keyboard down
   */
  onKeyDown?: (e: React.KeyboardEvent) => void;
  /**
   * send event when enter has been pressed
   */
  onEnterKeyPress?: (e: React.KeyboardEvent) => void;
  /**
   * send event when we have error
   */
  onError?: (v: string | null) => void;
  /**
   * send event when component blur
   */
  onBlur?: (e) => void;
}

/**
 * Component provides ability to get phone number with select country dial code.
 *
 * Design reference on [Figma](https://www.figma.com/file/4Q0ZgRodfKuQ0vpFTUzoni/Contact-Forms?node-id=1%3A2)
 *
 */
export function PhoneInput({
  value = '',

  clearable,
  validate = true,

  id: fieldId,
  label,
  error,
  successMsg,
  infoMsg,
  disabled,
  readOnly,

  className,

  country = 'it',

  onlyCountries = [],
  preferredCountries = [],
  excludeCountries = [],

  autoFormat = true,

  enableAreaCodes = false,
  enableTerritories = false,

  disableCountryCode = false,
  disableDropdown = false,
  enableLongNumbers = false,
  countryCodeEditable = true,
  disableCountryGuess = false,

  regions,

  localization = {},
  masks,
  areaCodes,
  preserveOrder = [],

  defaultMask = '... ... ... ... ..',
  alwaysDefaultMask = false,
  prefix = '+',
  jumpCursorToEnd = true,

  priority,
  enableAreaCodeStretch = false,

  onChange,
  onClick,
  onKeyDown,
  onEnterKeyPress,
  onError,
  onBlur,

  ...restProps
}: PhoneInputProps): React.ReactElement {
  const options: PhoneInputSettings = {
    country,

    onlyCountries,
    preferredCountries,
    excludeCountries,

    autoFormat,

    enableAreaCodes,
    enableTerritories,

    disableCountryCode,
    disableDropdown,
    enableLongNumbers,
    countryCodeEditable,
    disableCountryGuess,

    regions,

    localization,
    masks,
    areaCodes,
    preserveOrder,

    defaultMask,
    alwaysDefaultMask,
    prefix,
    jumpCursorToEnd,

    priority,
    enableAreaCodeStretch,
  };

  // Control the component with react
  const [id] = useState(fieldId || _uniqueId());
  const [isFocused, setFocus] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);

  // init and get CountryList
  const [countryData] = useState<CountryDataState>(setGeneralData(options));

  // selected country
  const [selectedCountry, setSelectedCountry] = useState(getCountryGuess(value, country, countryData, options));
  // formatted input value
  const [formattedNumber, setFormattedNumber] = useState(getFormattedNumber(value, selectedCountry, options));
  const [resetValue, setResetValue] = useState(getFormattedNumber('', selectedCountry, options));
  const [freezeSelection, setFreezeSelection] = useState(false);

  const [phoneInputError, setPhoneInputError] = useState('');

  const numberInput = useRef(null);

  // return country data from state
  const getCountryData = (country) => {
    if (!country) return {};
    return {
      name: country.name || '',
      dialCode: country.dialCode || '',
      countryCode: country.iso2 || '',
      format: country.format || '',
    };
  };

  const handleResetValue = (): void => {
    setFormattedNumber(resetValue);
    numberInput.current.focus();

    if (onChange) {
      onChange(resetValue.replace(/[^0-9]+/g, ''), getCountryData(selectedCountry), resetValue);
    }
  };

  const cursorToEnd = () => {
    const input = numberInput.current;
    if (!input) return;

    input.focus();
    let len = input.value.length;
    if (input.value.charAt(len - 1) === ')') {
      len = len - 1;
    }
    input.setSelectionRange(len, len);
  };

  // handlers
  const handlerFocus = () => {
    if (!disabled) {
      setFocus(true);
    }
  };
  const handlerBlur = () => {
    setFocus(false);
    if (onBlur) {
      onBlur(formattedNumber.replace(/[^0-9]+/g, ''));
    }
  };

  const handleInput = (e) => {
    // https://reactjs.org/docs/legacy-event-pooling.html
    e.persist();

    const { value } = e.target;

    let newFormattedNumber = disableCountryCode ? '' : prefix;
    let newSelectedCountry = selectedCountry;
    let newFreezeSelection = freezeSelection;

    if (!countryCodeEditable) {
      const mainCode = newSelectedCountry.hasAreaCodes
        ? countryData.onlyCountries.find((o) => o.iso2 === newSelectedCountry.iso2 && o.mainCode).dialCode
        : newSelectedCountry.dialCode;

      const updatedInput = prefix + mainCode;
      if (value.slice(0, updatedInput.length) !== updatedInput) return;
    }

    if (value === prefix) {
      // we should handle change when we delete the last digit
      if (onChange) {
        onChange('', getCountryData(newSelectedCountry), '');
      }
      setFormattedNumber('');
      return;
    }

    // Does exceed default 15 digit phone number limit
    if (value.replace(/\D/g, '').length > 15) {
      if (enableLongNumbers === false) {
        return;
      }

      if (typeof enableLongNumbers === 'number') {
        if (value.replace(/\D/g, '').length > enableLongNumbers) {
          return;
        }
      }
    }

    // if the input is the same as before, must be some special key like enter etc.
    if (value === formattedNumber) {
      return;
    }

    // ie hack
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnValue = false;
    }

    if (value.length > 0) {
      // before entering the number in new format, lets check if the dial code now matches some other country
      const inputNumber = value.replace(/\D/g, '');

      // we don't need to send the whole number to guess the country... only the first 6 characters are enough
      // the guess country function can then use memoization much more effectively since the set of input it
      // gets has drastically reduced
      if (!freezeSelection || selectedCountry.dialCode.length > inputNumber.length) {
        if (disableCountryGuess) {
          newSelectedCountry = selectedCountry;
        } else {
          newSelectedCountry =
            guessSelectedCountry(inputNumber.substring(0, 6), country, countryData, options) || selectedCountry;
        }
        newFreezeSelection = false;
      }
      newFormattedNumber = formatNumber(inputNumber, newSelectedCountry, options);
      newSelectedCountry = newSelectedCountry.dialCode ? newSelectedCountry : selectedCountry;
    }

    let caretPosition = e.target.selectionStart;
    const diff = newFormattedNumber.length - formattedNumber.length;
    if (diff > 0) {
      caretPosition = caretPosition - diff;
    }
    const lastChar = newFormattedNumber.charAt(newFormattedNumber.length - 1);
    if (lastChar == ')') {
      // do nothing it will be do useEffect by formattedNumber
    } else if (caretPosition > 0 && formattedNumber.length >= newFormattedNumber.length) {
      numberInput.current.setSelectionRange(caretPosition, caretPosition);
    }

    setFormattedNumber(newFormattedNumber);
    setFreezeSelection(newFreezeSelection);
    setSelectedCountry(newSelectedCountry);

    if (onChange) {
      onChange(newFormattedNumber.replace(/[^0-9]+/g, ''), getCountryData(newSelectedCountry), newFormattedNumber);
    }
  };

  const handleInputClick = () => {
    setShowDropdown(false);
    if (onClick) {
      onClick(formattedNumber.replace(/[^0-9]+/g, ''), getCountryData(selectedCountry), formattedNumber);
    }
  };

  const handleInputBlur = () => {
    if (validate && !enableLongNumbers) {
      const errorMsg = validateNumber(formattedNumber);
      setPhoneInputError(errorMsg);

      if (onError) {
        onError(errorMsg);
      }
    }
  };

  const handleDoubleClick = (e) => {
    const len = e.target.value.length;
    e.target.setSelectionRange(0, len);
  };

  const handleInputKeyDown = (e) => {
    // https://reactjs.org/docs/legacy-event-pooling.html
    e.persist();

    if (e.which === KeyBoardKeys.ENTER) {
      if (onEnterKeyPress) {
        onEnterKeyPress(e);
      }
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  const handleSelectedCountry = (country) => {
    const currentSelectedCountry = selectedCountry;
    const newSelectedCountry = countryData.onlyCountries.find((o) => o == country);
    if (!newSelectedCountry) return;

    const unformattedNumber = formattedNumber.replace(' ', '').replace('(', '').replace(')', '').replace('-', '');
    const newNumber =
      unformattedNumber.length > 1
        ? unformattedNumber.replace(currentSelectedCountry.dialCode, newSelectedCountry.dialCode)
        : newSelectedCountry.dialCode;
    const newFormattedNumber = formatNumber(newNumber.replace(/\D/g, ''), newSelectedCountry, options);

    setShowDropdown(false);
    setFormattedNumber(newFormattedNumber);
    setSelectedCountry(newSelectedCountry);
    setFreezeSelection(true);

    // update value change
    cursorToEnd();
    if (onChange) {
      onChange(newFormattedNumber.replace(/[^0-9]+/g, ''), getCountryData(newSelectedCountry), newFormattedNumber);
    }
  };

  const handleKeydown = (e) => {
    const {
      target: { className },
    } = e;

    if (className.includes('phone-input-control') && (e.which === KeyBoardKeys.ENTER || e.which === KeyBoardKeys.ESC)) {
      return e.target.blur();
    }

    if (!showDropdown || disabled) {
      return;
    }

    // ie hack
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnValue = false;
    }

    switch (e.which) {
      case KeyBoardKeys.ESC:
      case KeyBoardKeys.TAB:
        setShowDropdown(false);
        cursorToEnd();
        break;
    }
  };

  const handleShowDropdown = (state) => {
    setShowDropdown(state);
  };

  // effects
  useEffect(() => {
    if (numberInput.current) {
      const lastChar = formattedNumber.charAt(formattedNumber.length - 1);
      if (lastChar == ')') {
        numberInput.current.setSelectionRange(formattedNumber.length - 1, formattedNumber.length - 1);
      }
    }
  }, [formattedNumber]);

  useEffect(() => {
    setResetValue(getFormattedNumber('', selectedCountry, options));
  }, [selectedCountry]);

  const hasValue = formattedNumber && formattedNumber.length > 0;
  // Compute css classes
  const containerClasses = classNames(style['phone-input'], {
    className,
    ['hasValue']: hasValue,
    [style['focus']]: isFocused,
    [style['success']]: successMsg && successMsg.length,
    [style['error']]: (error && error.length) || (phoneInputError && phoneInputError.length),
    [style['dropdown']]: showDropdown,
    [style['disabled']]: disabled,
    ['disabled']: disabled,
    [style['readOnly']]: readOnly,
  });

  const inputClasses = classNames(style['phone-input__input'], {
    [`${className}__input`]: className,
    ['hasValue']: hasValue,
    ['phone-input-control']: true,
  });

  // prepare wrapper props
  const wrapperProps: WrapperProps = {
    label,
    error: error || phoneInputError,
    successMsg,
    infoMsg,
    htmlFor: id,
    className: 'phone-input-wrapper',
  };

  // Render component
  return (
    <div className={containerClasses} onFocus={handlerFocus} onBlur={handlerBlur} onKeyDown={handleKeydown}>
      <CountrySelector
        openDropdown={showDropdown}
        countryData={countryData}
        country={selectedCountry}
        disableDropdown={disableDropdown}
        options={options}
        phoneNumber={formattedNumber}
        disabled={disabled}
        readOnly={readOnly}
        onSelect={handleSelectedCountry}
        onShow={handleShowDropdown}
      />
      <Wrapper {...wrapperProps}>
        <input
          value={formattedNumber}
          {...restProps}
          readOnly={readOnly}
          disabled={disabled}
          type="tel"
          id={id}
          ref={numberInput}
          className={inputClasses}
          onChange={handleInput}
          onClick={handleInputClick}
          onDoubleClick={handleDoubleClick}
          onKeyDown={handleInputKeyDown}
          onBlur={handleInputBlur}
        />
        {formattedNumber.length > 0 && clearable && !disabled && !readOnly && resetValue !== formattedNumber && (
          <IconCloseEncapsulated
            className={classNames(style.close, { [`${className}__close`]: className })}
            onClick={handleResetValue}
          ></IconCloseEncapsulated>
        )}
      </Wrapper>
    </div>
  );
}
