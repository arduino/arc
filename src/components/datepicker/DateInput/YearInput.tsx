import React from 'react';
import { getYear } from '../utils/date-utils';

import Input, { InputProps } from './Input';

import { safeMax, safeMin } from '../utils/utils';
import { ValueType } from '../models/DatePicker.model';

export interface YearInputProps extends InputProps {
  maxDate: Date;
  minDate: Date;
  value?: number;
  valueType: ValueType;
}

export default function YearInput({
  maxDate,
  minDate,
  placeholder = '----',
  valueType,
  ...otherProps
}: YearInputProps) {
  const maxYear = safeMin(275760, maxDate && getYear(maxDate));
  const minYear = safeMax(1, minDate && getYear(minDate));

  const yearStep = (() => {
    if (valueType === 'century') {
      return 10;
    }

    return 1;
  })();

  return <Input max={maxYear} min={minYear} name="year" placeholder={placeholder} step={yearStep} {...otherProps} />;
}
