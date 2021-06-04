import React, { ReactElement } from 'react';
import { getYear, getMonthHuman, getDate, getDaysInMonth } from '../utils/date-utils';

import Input, { InputProps } from './Input';
import { safeMin, safeMax } from '../utils/utils';

export interface DayInputProps extends InputProps {
  maxDate: Date;
  minDate: Date;
  month: number;
  year: number;
}

export default function DayInput({ maxDate, minDate, month, year, value, ...otherProps }: DayInputProps): ReactElement {
  const currentMonthMaxDays = (() => {
    if (!month) {
      return 31;
    }

    return getDaysInMonth(new Date(year || 2020, month - 1, 1));
  })();

  function isSameMonth(date) {
    return date && year === getYear(date) && month === getMonthHuman(date);
  }

  const maxDay = safeMin(currentMonthMaxDays, isSameMonth(maxDate) && getDate(maxDate));
  const minDay = safeMax(1, isSameMonth(minDate) && getDate(minDate));

  return (
    <Input
      max={maxDay}
      min={minDay}
      name="day"
      value={value} //value={value > currentMonthMaxDays ? currentMonthMaxDays : value}
      {...otherProps}
    />
  );
}
