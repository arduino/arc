import React from 'react';
import { getYear, getMonthHuman } from '../utils/date-utils';

import Input, { InputProps } from './Input';

import { safeMin, safeMax } from '../utils/utils';

export interface MonthInputProps extends InputProps {
  maxDate: Date;
  minDate: Date;
  year: number;
}

export default function MonthInput({ maxDate, minDate, year, ...otherProps }: MonthInputProps) {
  function isSameYear(date) {
    return date && year === getYear(date);
  }

  const maxMonth = safeMin(12, isSameYear(maxDate) && getMonthHuman(maxDate));
  const minMonth = safeMax(1, isSameYear(minDate) && getMonthHuman(minDate));

  return <Input max={maxMonth} min={minMonth} name="month" {...otherProps} />;
}
