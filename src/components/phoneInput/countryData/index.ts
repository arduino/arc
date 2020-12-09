import { Country, PhoneInputSettings, PhoneRegion } from '../PhoneInput.model';
import _rawCountries from './rawCountries';
import _rawTerritories from './rawTerritories';

function getMask(
  prefix: string,
  dialCode: string,
  predefinedMask: string,
  defaultMask: string,
  alwaysDefaultMask: boolean
) {
  if (!predefinedMask || alwaysDefaultMask) {
    return prefix + ''.padEnd(dialCode.length, '.') + ' ' + defaultMask;
  }
  return prefix + ''.padEnd(dialCode.length, '.') + ' ' + predefinedMask;
}

// enableAreaCodes: boolean || array of iso2 codes
function initCountries(
  countries: any[],
  enableAreaCodes: boolean | string[],
  prefix: string,
  defaultMask: string,
  alwaysDefaultMask: boolean
) {
  let hiddenAreaCodes = [];

  const enableAllCodes = enableAreaCodes === true ? true : false;

  const initializedCountries = [].concat(
    ...countries.map((country) => {
      const countryItem: Country = {
        name: country[0],
        regions: country[1],
        iso2: country[2],
        countryCode: country[3],
        dialCode: country[3],
        format: getMask(prefix, country[3], country[4], defaultMask, alwaysDefaultMask),
        priority: country[5] || 0,
      };

      const areaItems = [];

      country[6] &&
        country[6].map((areaCode) => {
          const areaItem = { ...countryItem };
          areaItem.dialCode = country[3] + areaCode;
          areaItem.isAreaCode = true;
          areaItem.areaCodeLength = areaCode.length;

          areaItems.push(areaItem);
        });

      if (areaItems.length > 0) {
        countryItem.mainCode = true;
        if (enableAllCodes || (typeof enableAreaCodes === 'object' && enableAreaCodes.includes(country[2]))) {
          countryItem.hasAreaCodes = true;
          return [countryItem, ...areaItems];
        }
        hiddenAreaCodes = hiddenAreaCodes.concat(areaItems);
        return [countryItem];
      }
      return [countryItem];
    })
  );

  return [initializedCountries, hiddenAreaCodes];
}

function extendUserContent(
  userContent: any[][],
  contentItemIndex: number,
  extendingObject: object | null | undefined,
  firstExtension = false
): void {
  if (extendingObject === null || extendingObject === undefined) {
    return;
  }

  const keys = Object.keys(extendingObject);
  const values = Object.values(extendingObject);

  keys.forEach((iso2, index) => {
    if (firstExtension) {
      // masks
      return userContent.push([iso2, values[index]]);
    }

    const countryIndex = userContent.findIndex((arr) => arr[0] === iso2);
    if (countryIndex === -1) {
      const newUserContent: any[] = [iso2];
      newUserContent[contentItemIndex] = values[index];
      userContent.push(newUserContent);
    } else {
      userContent[countryIndex][contentItemIndex] = values[index];
    }
  });
}

function initUserContent(
  masks: object | null | undefined,
  priority: object | null | undefined,
  areaCodes: object | null | undefined
): [] {
  const userContent: [] = [];
  extendUserContent(userContent, 1, masks, true);
  extendUserContent(userContent, 3, priority);
  extendUserContent(userContent, 2, areaCodes);
  return userContent;
}

function extendRawCountries(countries: any[], userContent: any[]): any[] {
  if (userContent.length === 0) return countries;

  // userContent index -> rawCountries index of country array to extend
  // [iso2 (0 -> 2), mask (1 -> 4), priority (3 -> 5), areaCodes (2 -> 6)]

  return countries.map((o) => {
    const userContentIndex = userContent.findIndex((arr) => arr[0] === o[2]); // find by iso2
    if (userContentIndex === -1) return o; // if iso2 not in userContent, return source country object
    const userContentCountry = userContent[userContentIndex];
    if (userContentCountry[1]) o[4] = userContentCountry[1]; // mask
    if (userContentCountry[3]) o[5] = userContentCountry[3]; // priority
    if (userContentCountry[2]) o[6] = userContentCountry[2]; // areaCodes
    return o;
  });
}

export default class CountryData {
  onlyCountries: Country[];
  preferredCountries: Country[];
  hiddenAreaCodes: Country[];

  constructor(input: PhoneInputSettings) {
    const {
      onlyCountries = [],
      preferredCountries = [],
      excludeCountries = [],

      enableAreaCodes = false,
      enableTerritories = false,

      regions: enumRegions,

      localization = {},
      masks,
      areaCodes,
      preserveOrder = [],

      defaultMask = '... ... ... ... ..',
      alwaysDefaultMask = false,
      prefix = '+',

      priority,
    } = input;

    // convert region to string
    let regions: string | string[] = '';
    if (enumRegions) {
      if (Array.isArray(enumRegions)) {
        regions = enumRegions.map((item) => item.valueOf());
      } else {
        regions = enumRegions.valueOf();
      }
    }

    const userContent = initUserContent(masks, priority, areaCodes);
    const rawCountries = extendRawCountries(_rawCountries, userContent);
    const rawTerritories = extendRawCountries(_rawTerritories, userContent);

    // eslint-disable-next-line prefer-const
    let [initializedCountries, hiddenAreaCodes] = initCountries(
      rawCountries,
      enableAreaCodes,
      prefix,
      defaultMask,
      alwaysDefaultMask
    );
    if (enableTerritories) {
      const [initializedTerritories] = initCountries(
        rawTerritories,
        enableAreaCodes,
        prefix,
        defaultMask,
        alwaysDefaultMask
      );
      initializedCountries = this.sortTerritories(initializedTerritories, initializedCountries);
    }
    if (regions) initializedCountries = this.filterRegions(regions, initializedCountries);

    this.onlyCountries = this.localizeCountries(
      this.excludeCountries(
        this.getFilteredCountryList(onlyCountries, initializedCountries, preserveOrder.includes('onlyCountries')),
        excludeCountries
      ),
      localization,
      preserveOrder.includes('onlyCountries')
    );

    this.preferredCountries =
      preferredCountries.length === 0
        ? []
        : this.localizeCountries(
            this.getFilteredCountryList(
              preferredCountries,
              initializedCountries,
              preserveOrder.includes('preferredCountries')
            ),
            localization,
            preserveOrder.includes('preferredCountries')
          );

    // apply filters to hiddenAreaCodes
    this.hiddenAreaCodes = this.excludeCountries(
      this.getFilteredCountryList(onlyCountries, hiddenAreaCodes, preserveOrder),
      excludeCountries
    );
  }

  filterRegions = (regions, countries) => {
    if (typeof regions === 'string') {
      const region = regions;
      return countries.filter((country) => {
        return country.regions.some((element) => {
          return element === region;
        });
      });
    }

    return countries.filter((country) => {
      const matches = regions.map((region) => {
        return country.regions.some((element) => {
          return element === region;
        });
      });
      return matches.some((el) => el);
    });
  };

  sortTerritories = (initializedTerritories, initializedCountries) => {
    const fullCountryList = [...initializedTerritories, ...initializedCountries];
    fullCountryList.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    return fullCountryList;
  };

  getFilteredCountryList = (countryCodes, sourceCountryList, preserveOrder) => {
    if (countryCodes.length === 0) return sourceCountryList;

    let filteredCountries;
    if (preserveOrder) {
      // filter using iso2 user-defined order
      filteredCountries = countryCodes
        .map((countryCode) => {
          const country = sourceCountryList.find((country) => country.iso2 === countryCode);
          if (country) return country;
        })
        .filter((country) => country); // remove any not found
    } else {
      // filter using alphabetical order
      filteredCountries = sourceCountryList.filter((country) => {
        return countryCodes.some((element) => {
          return element === country.iso2;
        });
      });
    }

    return filteredCountries;
  };

  localizeCountries = (countries, localization, preserveOrder) => {
    for (let i = 0; i < countries.length; i++) {
      if (localization[countries[i].iso2] !== undefined) {
        countries[i].localName = localization[countries[i].iso2];
      } else if (localization[countries[i].name] !== undefined) {
        countries[i].localName = localization[countries[i].name];
      }
    }
    if (!preserveOrder) {
      countries.sort(function (a, b) {
        if (a.localName < b.localName) {
          return -1;
        }
        if (a.localName > b.localName) {
          return 1;
        }
        return 0;
      });
    }
    return countries;
  };

  getCustomAreas = (country, areaCodes) => {
    const customAreas = [];
    for (let i = 0; i < areaCodes.length; i++) {
      const newCountry = JSON.parse(JSON.stringify(country));
      newCountry.dialCode += areaCodes[i];
      customAreas.push(newCountry);
    }
    return customAreas;
  };

  excludeCountries = (onlyCountries, excludedCountries) => {
    if (excludedCountries.length === 0) {
      return onlyCountries;
    }
    return onlyCountries.filter((country) => {
      return !excludedCountries.includes(country.iso2);
    });
  };
}
