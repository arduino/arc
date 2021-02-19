import { DateOptions } from '../models/DatePicker.model';

import getUserLocale from './getUserLocale';

export function getFormatter(options: DateOptions): (l: string, d: Date) => string {
  return (locale, date) => date.toLocaleString(locale || getUserLocale(), options);
}

/**
 * Returns a value no smaller than min and no larger than max.
 *
 * @param {*} value Value to return.
 * @param {*} min Minimum return value.
 * @param {*} max Maximum return value.
 */
export function between<T>(value: T, min: T, max: T): T {
  if (min && min > value) {
    return min;
  }
  if (max && max < value) {
    return max;
  }
  return value;
}

function isValidNumber(num: any): boolean {
  return num !== null && num !== false && !Number.isNaN(Number(num));
}

export function safeMin(...args: any): number {
  return Math.min(...args.filter(isValidNumber));
}

export function safeMax(...args: any): number {
  return Math.max(...args.filter(isValidNumber));
}
