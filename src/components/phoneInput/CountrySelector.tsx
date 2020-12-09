import React, { useState, useRef, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import startsWith from 'lodash.startswith';

import {
  IconNavigationArrowCaretNormalDown,
  IconNavigationArrowCaretNormalUp,
  IconTravelWorldWebsiteFilled,
} from '@bcmi-labs/react-icons';

import { Country, CountryDataState, PhoneInputSettings } from './PhoneInput.model';
import { formatNumber, initHighlightCountryIndex, scrollTo } from './PhoneUtils';

import Flags from './flags';
import { debounce } from '../utils/func';
// Import css styles and bind the class names
import style from './phoneInput.module.scss';

const KeyBoardKeys = {
  UP: 38,
  DOWN: 40,
  ENTER: 13,
  ESC: 27,
  A: 65,
  Z: 90,
  SPACE: 32,
  TAB: 9,
};

export interface CountrySelectorProps {
  openDropdown: boolean;
  countryData: CountryDataState;
  country: Country;
  disableDropdown: boolean;
  options: PhoneInputSettings;
  phoneNumber: string;
  disabled: boolean;
  readOnly: boolean;

  className?: string;

  onSelect: (country: Country) => void;
  onShow: (state: boolean) => void;
}

export function CountrySelector({
  openDropdown,
  countryData,
  country,
  disableDropdown,
  options,
  phoneNumber,
  disabled,
  readOnly,

  className,

  onSelect,
  onShow,
}: CountrySelectorProps) {
  const [highlightCountryIndex, setHighlightCountryIndex] = useState(initHighlightCountryIndex(country, countryData));
  const [queryString, setQueryString] = useState('');

  const dropdownContainerRef = useRef(null);
  const dropdownRef = useRef(null);
  const flagsRefs = useRef({});

  const getCountryElement = (index: number): HTMLElement => {
    return flagsRefs.current[`flag_no_${index}`];
  };

  const getHighlightCountryIndex = (direction) => {
    // had to write own function because underscore does not have findIndex. lodash has it
    const newHighlightCountryIndex = highlightCountryIndex + direction;

    if (
      newHighlightCountryIndex < 0 ||
      newHighlightCountryIndex >= countryData.onlyCountries.length + countryData.preferredCountries.length
    ) {
      return newHighlightCountryIndex - direction;
    }

    return newHighlightCountryIndex;
  };

  const getProbableCandidate = useCallback(
    (queryString: string): Country => {
      if (!queryString || queryString.length === 0) {
        return null;
      }
      // don't include the preferred countries in search
      const probableCountries = countryData.onlyCountries.filter((country) => {
        return startsWith(country.name.toLowerCase(), queryString.toLowerCase());
      });
      return probableCountries[0];
    },
    [queryString]
  );

  const countrySearch: () => void = debounce(() => {
    const probableCandidate = getProbableCandidate(queryString) || countryData.onlyCountries[0];
    const probableCandidateIndex =
      countryData.onlyCountries.findIndex((o) => o == probableCandidate) + countryData.preferredCountries.length;

    scrollTo(getCountryElement(probableCandidateIndex), dropdownRef.current, true);

    setQueryString('');
    setHighlightCountryIndex(probableCandidateIndex);
  }, 500);

  const handleFlagDropdownClick = (e) => {
    e.preventDefault();
    if (!openDropdown && disabled) return;

    const allCountries = countryData.preferredCountries.concat(countryData.onlyCountries);

    const highlightCountryIndex = allCountries.findIndex(
      (o) => o.dialCode === country.dialCode && o.iso2 === country.iso2
    );

    setHighlightCountryIndex(highlightCountryIndex);
    onShow(!openDropdown);
  };

  const handleFlagItemClick = (country, e) => {
    onSelect(country);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && dropdownContainerRef.current && !dropdownContainerRef.current.contains(e.target)) {
      onShow(false);
    }
  };

  const handleKeydown = (e) => {
    const {
      target: { className },
    } = e;

    if (className.includes('flag-selector') && e.which === KeyBoardKeys.ENTER && !openDropdown) {
      return handleFlagDropdownClick(e);
    }

    if (className.includes('phone-input-control') && (e.which === KeyBoardKeys.ENTER || e.which === KeyBoardKeys.ESC)) {
      return e.target.blur();
    }

    if (!openDropdown || disabled) {
      return;
    }

    const preventDefault = () => {
      // ie hack
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }
    };

    const moveHighlight = (direction) => {
      const newHighlight = getHighlightCountryIndex(direction);
      setHighlightCountryIndex(newHighlight);
      scrollTo(getCountryElement(newHighlight), dropdownRef.current, true);
    };

    switch (e.which) {
      case KeyBoardKeys.DOWN:
        preventDefault();
        moveHighlight(1);
        break;
      case KeyBoardKeys.UP:
        preventDefault();
        moveHighlight(-1);
        break;
      case KeyBoardKeys.ESC:
      case KeyBoardKeys.TAB:
        // handle parent
        break;
      case KeyBoardKeys.ENTER:
        preventDefault();
        handleFlagItemClick(
          [...countryData.preferredCountries, ...countryData.onlyCountries][highlightCountryIndex],
          e
        );
        break;
      default:
        if ((e.which >= KeyBoardKeys.A && e.which <= KeyBoardKeys.Z) || e.which === KeyBoardKeys.SPACE) {
          setQueryString(queryString + String.fromCharCode(e.which));
        }
    }
  };

  useEffect(() => {
    if (document.addEventListener) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      if (document.removeEventListener) {
        document.removeEventListener('mousedown', handleClickOutside);
      }
    };
  }, []);

  // find and show country in the list
  useEffect(() => {
    if (openDropdown) {
      scrollTo(getCountryElement(highlightCountryIndex), dropdownRef.current);
    }
  }, [openDropdown]);

  useEffect(() => {
    if (queryString) {
      countrySearch();
    }
  }, [queryString]);

  // find and show country in the list
  useEffect(() => {
    if (openDropdown) {
      scrollTo(getCountryElement(highlightCountryIndex), dropdownRef.current);
    }
  }, [openDropdown]);

  // Render flags
  const renderCountryFlags = useCallback(() => {
    const { preferredCountries, onlyCountries } = countryData;
    const searchedCountries = preferredCountries.concat(onlyCountries);

    const countryDropdownList = searchedCountries.map((country, index) => {
      const highlight = highlightCountryIndex === index;
      const itemClasses = classNames(style['phone-input__country'], {
        [`${className}__country`]: className,
        [style['highlight']]: highlight,
      });

      const FlagTag = Flags[country.iso2.toUpperCase()];
      return (
        <div
          ref={(el) => (flagsRefs.current[`flag_no_${index}`] = el)}
          key={`flag_no_${index}`}
          data-flag-key={`flag_no_${index}`}
          className={itemClasses}
          data-dial-code="1"
          tabIndex={disableDropdown ? -1 : 0}
          data-country-code={country.iso2}
          onClick={(e) => handleFlagItemClick(country, e)}
          role="option"
          {...(highlight ? { 'aria-selected': true } : {})}
        >
          <div
            className={classNames(style['phone-input__country--flag'], { [`${className}__country--flag`]: className })}
          >
            {FlagTag ? <FlagTag /> : <IconTravelWorldWebsiteFilled />}
          </div>
          <span
            className={classNames(style['phone-input__country--name'], { [`${className}__country--name`]: className })}
          >
            {country.localName || country.name}
          </span>
          <span
            className={classNames(style['phone-input__country--dial-code'], {
              [`${className}__country--dial-code`]: className,
            })}
          >
            {country.format ? formatNumber(country.dialCode, country, options) : options.prefix + country.dialCode}
          </span>
        </div>
      );
    });

    const dashedLi = (
      <li
        key={'dashes'}
        className={classNames(style['phone-input__country--divider'], {
          [`${className}__country--divider`]: className,
        })}
      />
    );
    // let's insert a dashed line in between preffered countries and the rest
    preferredCountries.length > 0 && countryDropdownList.splice(preferredCountries.length, 0, dashedLi);

    return (
      <div
        ref={dropdownRef}
        className={classNames(style['phone-input__flags-container'], { [`${className}__flags-container`]: className })}
      >
        {countryDropdownList}
      </div>
    );
  }, [countryData, highlightCountryIndex, disableDropdown, phoneNumber]);

  const flagViewClasses = classNames(style['phone-input__flags'], {
    [`${className}__flags`]: className,
    'flag-dropdown': true,
  });

  const SelectedFlag = country && Flags[country.iso2.toUpperCase()];

  return (
    <div className={flagViewClasses} ref={dropdownContainerRef} onKeyDown={handleKeydown}>
      <div
        onClick={disableDropdown || disabled || readOnly ? undefined : handleFlagDropdownClick}
        className={classNames(style['phone-input__flag-selector'], 'flag-selector', {
          [`${className}__flag-selector`]: className,
        })}
        title={country ? `${country.name}: + ${country.dialCode}` : ''}
        tabIndex={disableDropdown || disabled || readOnly ? -1 : 0}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={openDropdown ? true : undefined}
      >
        <div
          className={classNames(style['phone-input__flag-selector--flag'], {
            [`${className}__flag-selector--flag`]: className,
          })}
        >
          {SelectedFlag ? <SelectedFlag /> : <IconTravelWorldWebsiteFilled />}
        </div>
        <div
          className={classNames(style['phone-input__flag-selector--arrow'], {
            [`${className}__flag-selector--arrow`]: className,
            [style['disabled']]: disableDropdown || disabled,
          })}
        >
          {openDropdown ? <IconNavigationArrowCaretNormalUp /> : <IconNavigationArrowCaretNormalDown />}
        </div>
      </div>
      {openDropdown && renderCountryFlags()}
    </div>
  );
}
