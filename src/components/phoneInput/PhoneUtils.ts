import { reduce, startsWith } from 'lodash';

import { Country, PhoneInputSettings, CountryDataState } from './PhoneInput.model';

export function formatNumber(text: string, country: Country, options: PhoneInputSettings): string {
  if (!country) return text;

  const { format } = country;
  const {
    disableCountryCode = false,
    enableAreaCodeStretch = false,
    enableLongNumbers = false,
    autoFormat = true,
  } = options;

  let pattern;
  if (disableCountryCode) {
    pattern = format.split(' ');
    pattern.shift();
    pattern = pattern.join(' ');
  } else {
    if (enableAreaCodeStretch && country.isAreaCode) {
      pattern = format.split(' ');
      pattern[1] = pattern[1].replace(/\.+/, ''.padEnd(country.areaCodeLength, '.'));
      pattern = pattern.join(' ');
    } else {
      pattern = format;
    }
  }

  const { prefix = '+' } = options;

  if (!text || text.length === 0) {
    return disableCountryCode ? '' : prefix;
  }

  // for all strings with length less than 3, just return it (1, 2 etc.)
  // also return the same text if the selected country has no fixed format
  if ((text && text.length < 2) || !pattern || !autoFormat) {
    return disableCountryCode ? text : prefix + text;
  }

  const formattedObject = reduce(
    pattern,
    (acc, character) => {
      if (acc.remainingText.length === 0) {
        return acc;
      }

      if (character !== '.') {
        return {
          formattedText: acc.formattedText + character,
          remainingText: acc.remainingText,
        };
      }

      const [head, ...tail] = acc.remainingText;

      return {
        formattedText: acc.formattedText + head,
        remainingText: tail,
      };
    },
    {
      formattedText: '',
      remainingText: text.split(''),
    }
  );

  let formattedNumber;
  if (enableLongNumbers) {
    formattedNumber = formattedObject.formattedText + formattedObject.remainingText.join('');
  } else {
    formattedNumber = formattedObject.formattedText;
  }

  // Always close brackets
  if (formattedNumber.includes('(') && !formattedNumber.includes(')')) formattedNumber += ')';
  return formattedNumber;
}

export function scrollTo(countryRef: HTMLElement, dropdownRef: HTMLElement, middle?: boolean): void {
  if (!countryRef) return;

  const container = dropdownRef;
  if (!container || !document.body) return;

  const containerHeight = container.offsetHeight;
  const containerOffset = container.getBoundingClientRect();
  const containerTop = containerOffset.top + document.body.scrollTop;
  const containerBottom = containerTop + containerHeight;

  const element = countryRef;
  const elementOffset = element.getBoundingClientRect();

  const elementHeight = element.offsetHeight;
  const elementTop = elementOffset.top + document.body.scrollTop;
  const elementBottom = elementTop + elementHeight;

  let newScrollTop = elementTop - containerTop + container.scrollTop;
  const middleOffset = containerHeight / 2 - elementHeight / 2;

  if (elementTop < containerTop) {
    // scroll up
    if (middle) {
      newScrollTop -= middleOffset;
    }
    container.scrollTop = newScrollTop;
  } else if (elementBottom > containerBottom) {
    // scroll down
    if (middle) {
      newScrollTop += middleOffset;
    }
    const heightDifference = containerHeight - elementHeight;
    container.scrollTop = newScrollTop - heightDifference;
  }
}

export function guessSelectedCountry(
  inputNumber: string,
  countryIso2: string,
  countryData: CountryDataState,
  options: PhoneInputSettings
): Country {
  const { enableAreaCodes = false } = options;

  // if enableAreaCodes == false, try to search in hidden area codes to detect area code correctly
  // then search and insert main country which has this area code
  if (enableAreaCodes === false) {
    let mainCode;
    countryData.hiddenAreaCodes.some((country) => {
      if (startsWith(inputNumber, country.dialCode)) {
        countryData.onlyCountries.some((o) => {
          if (country.iso2 === o.iso2 && o.mainCode) {
            mainCode = o;
            return true;
          }
        });
        return true;
      }
    });
    if (mainCode) return mainCode;
  }

  const secondBestGuess = countryData.onlyCountries.find((o) => o.iso2 == countryIso2);
  if (inputNumber.trim() === '') {
    return secondBestGuess;
  }

  const bestGuess = countryData.onlyCountries.reduce(
    (selectedCountry, country) => {
      if (startsWith(inputNumber, country.dialCode)) {
        if (country.dialCode.length > selectedCountry.dialCode.length) {
          return country;
        }
        if (
          country.dialCode.length === selectedCountry.dialCode.length &&
          country.priority < selectedCountry.priority
        ) {
          return country;
        }
      }
      return selectedCountry;
    },
    { dialCode: '', priority: 10001, name: '' }
  );

  if (!bestGuess.name) return secondBestGuess;
  return bestGuess as Country;
}

export function getCountryGuess(
  value: string,
  initCountry: string,
  countryData: CountryDataState,
  options: PhoneInputSettings
): Country {
  const inputNumber = value ? value.replace(/\D/g, '') : '';
  let countryGuess: Country = null;
  if (inputNumber.length > 1) {
    // Country detect by phone
    countryGuess = guessSelectedCountry(inputNumber.substring(0, 6), initCountry, countryData, options) || null;
  } else if (initCountry) {
    // Default country
    countryGuess = countryData.onlyCountries.find((o) => o.iso2 == initCountry) || null;
  } else {
    // Empty params
    countryGuess = null;
  }

  return countryGuess;
}

export function getFormattedNumber(value: string, countryGuess: Country, options: PhoneInputSettings): string {
  const { disableCountryCode = false } = options;

  const inputNumber = value ? value.replace(/\D/g, '') : '';

  const dialCode =
    inputNumber.length < 2 && countryGuess && !startsWith(inputNumber, countryGuess.dialCode)
      ? countryGuess.dialCode
      : '';

  const formattedNumber =
    inputNumber === '' && countryGuess === null
      ? ''
      : formatNumber(
          (disableCountryCode ? '' : dialCode) + inputNumber,
          countryGuess.name ? countryGuess : undefined,
          options
        );

  return formattedNumber;
}

export function initHighlightCountryIndex(countryGuess: Country, countryData: CountryDataState): number {
  const highlightCountryIndex = countryData.onlyCountries.findIndex((o) => o == countryGuess);
  return highlightCountryIndex;
}

export function validateNumber(number: string) {
  const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,9}$/im;

  return regex.test(number.replace(/[^0-9]+/g, '')) ? null : 'The phone number is invalid';
}
