export interface Country {
  name: string;
  localName?: string; // locale
  regions: string;
  iso2: string;
  countryCode: string;
  dialCode: string;
  format: string;
  priority: number;
  isAreaCode?: boolean;
  areaCodeLength?: number;
  mainCode?: boolean;
  hasAreaCodes?: boolean;
}

export interface CountryDataState {
  onlyCountries: Country[];
  preferredCountries: Country[];
  hiddenAreaCodes: Country[];
}

export enum PhoneRegion {
  NONE = '',
  AMERICA = 'america',
  EUROPE = 'europe',
  ASIA = 'asia',
  OCEANIA = 'oceania',
  AFRICA = 'africa',
  // Sub-regions:
  NORTH_AMERICA = 'north-america',
  SOUTH_AMERICA = 'south-america',
  CENTRAL_AMERICA = 'central-america',
  CARRIBEAN = 'carribean',
  EU_UNION = 'eu-union',
  EX_USSR = 'ex-ussr',
  EX_YUGOS = 'ex-yugos',
  BALTIC = 'baltic',
  MIDDLE_EAST = 'middle-east',
  NORTH_AFRICA = 'north-africa',
}

export class PhoneInputSettings {
  /**
   * initial country. ISO 3166-1 alpha-2 – two-letter country codes.
   * Example:'it' or 'us'
   */
  country?: string;

  /**
   * Show specific country.
   * Example: ['it', 'de', 'us']
   */
  onlyCountries?: string[];
  /**
   * Show country which should be in the top
   * Example: ['it', 'de', 'us']
   */
  preferredCountries?: string[];
  /**
   * Array of country which should be excluded from the list
   * Example: ['ua', 'ro']
   */
  excludeCountries?: string[];

  /**
   * 	on/off phone formatting
   */
  autoFormat?: boolean;

  /**
   * Enable local codes for all countries.
   * Example: enableAreaCodes={true} or enableAreaCodes={['us', 'ca']}
   */
  enableAreaCodes?: boolean | string[]; // ['us', 'it']
  /**
   * Enable dependent territories with population of ~100,000 or lower.
   * More about this territories you can find here: https://en.wikipedia.org/wiki/ISO_3166-1
   * Example: enableTerritories={true} or enableTerritories={['nu', 'as']}
   */
  enableTerritories?: boolean | string[];

  /**
   * Hide dial code of country.
   */
  disableCountryCode?: boolean;
  /**
   * Disable only dropdown selector. Input will be available.
   */
  disableDropdown?: boolean;
  /**
   * Enable long number. Use it if need put more than 15 digits number.
   */
  enableLongNumbers?: boolean;
  /**
   * on/off editable dial code. in case 'false' - you cant edit country dial code.
   */
  countryCodeEditable?: boolean;
  /**
   * Disable to update code. In case when oyu will edit dial code, the component try guess country.
   */
  disableCountryGuess?: boolean;

  /**
   * Show countries only from specified regions.
   * Region list:
   * 'america', 'europe', 'asia', 'oceania',
   * 'africa', 'north-america', 'south-america',
   * 'central-america', 'carribean', 'eu-union',
   * 'ex-ussr', 'ex-yugos', 'baltic', 'middle-east', 'north-africa',
   */
  regions?: PhoneRegion | PhoneRegion[];

  /**
   * Predefined localization. Here you get put json with localization information.
   * Example: {de: 'Deutschland', es: 'España'}
   */
  localization?: object;
  /**
   * Set default mask which will be use for input.
   * In case whe county has mask, control will use mask of country
   */
  defaultMask?: string;
  /**
   * on/off to use always default mask. Use it if need use only default mask.
   */
  alwaysDefaultMask?: boolean;
  /**
   * Set custom masks for countries. Us eit if you want to set specific input mask for country.
   * Example: {fr: '(...) ..-..-..', at: '(....) ...-....'}
   */
  masks?: Record<string, unknown>;
  /**
   * set custom area codes for specific country.
   * Us eit if you need change code area for specific countries.
   * Example: areaCodes={{gr: ['2694', '2647'], fr: ['369', '463'], us: ['300']}}
   */
  areaCodes?: Record<string, unknown>;
  /**
   * Use it for changing countries ordering.
   * Example: ['onlyCountries', 'preferredCountries']
   * List: 'onlyCountries', 'preferredCountries'.
   */
  preserveOrder?: string[];

  /**
   * Set to change prefix, Default +
   */
  prefix?: string;
  /**
   * jump to the end in the input
   */
  jumpCursorToEnd?: boolean;
  /**
   * Set custom country priority, Use it if you need change priority.
   */
  priority?: Record<string, unknown>; // {ca: 0, us: 1, kz: 0, ru: 1}
  /**
   * If enableAreaCodeStretch is added,
   * the part of the mask with the area code will not stretch
   *  to length of the respective section of phone mask.
   * Example: +61 (2), +61 (02)
   */
  enableAreaCodeStretch?: boolean;
}
