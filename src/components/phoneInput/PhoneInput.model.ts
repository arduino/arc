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
  country?: string; // init country

  onlyCountries?: string[]; // show only specific country
  preferredCountries?: string[];
  excludeCountries?: string[];

  autoFormat?: boolean;

  enableAreaCodes?: boolean | string[]; // ['us', 'it']
  enableTerritories?: boolean | string[];

  disableCountryCode?: boolean;
  disableDropdown?: boolean; // disable dropdown
  enableLongNumbers?: boolean;
  countryCodeEditable?: boolean; // ability to edit code
  disableCountryGuess?: boolean; // disable to update code

  regions?: PhoneRegion | PhoneRegion[]; // ['america', 'europe', 'asia', 'oceania', 'africa']

  localization?: object; // {de: 'Deutschland', es: 'España'}
  masks?: object; // {fr: '(...) ..-..-..', at: '(....) ...-....'}
  areaCodes?: object; // {gr: ['2694', '2647'], fr: ['369', '463'], us: ['300']}
  preserveOrder?: string[]; // ['onlyCountries', 'preferredCountries']

  defaultMask?: string;
  alwaysDefaultMask?: boolean;
  prefix?: string;
  jumpCursorToEnd?: boolean;

  priority?: object; // {ca: 0, us: 1, kz: 0, ru: 1}
  enableAreaCodeStretch?: boolean;
}
