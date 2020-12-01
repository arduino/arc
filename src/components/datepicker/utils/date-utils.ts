/**
 * Utils
 */

function makeGetEdgeOfNeighbor(
  getPeriod: (arg: Date | number | string) => number,
  getEdgeOfPeriod: (d: Date | number) => Date,
  defaultOffset: number
): (d: Date) => Date {
  return function makeGetEdgeOfNeighborInternal(date: Date, offset: number = defaultOffset): Date {
    const previousPeriod = getPeriod(date) + offset;
    return getEdgeOfPeriod(previousPeriod);
  };
}

function makeGetEnd(getBeginOfNextPeriod: (d: Date) => Date): (d: Date) => Date {
  return function makeGetEndInternal(date) {
    return new Date(getBeginOfNextPeriod(date).getTime() - 1);
  };
}

function makeGetRange(functions: ((d: Date) => Date)[]): (d: Date) => Date[] {
  return function makeGetRangeInternal(date) {
    return functions.map((fn: (d: Date) => Date) => fn(date));
  };
}

/**
 * Simple getters - getting a property of a given point in time
 */

/**
 * Gets year from date.
 *
 * @param {Date|number|string} date Date to get year from.
 */
export function getYear(date: Date | number | string): number {
  if (date instanceof Date) {
    return date.getFullYear();
  }

  if (typeof date === 'number') {
    return date;
  }

  const year = parseInt(date, 10);

  if (typeof date === 'string' && !isNaN(year)) {
    return year;
  }

  throw new Error(`Failed to get year from date: ${date}.`);
}

/**
 * Gets month from date.
 *
 * @param {Date} date Date to get month from.
 */
export function getMonth(date: Date): number {
  if (date instanceof Date) {
    return date.getMonth();
  }

  throw new Error(`Failed to get month from date: ${date}.`);
}

/**
 * Gets human-readable month from date.
 *
 * @param {Date} date Date to get human-readable month from.
 */
export function getMonthHuman(date: Date): number {
  if (date instanceof Date) {
    return date.getMonth() + 1;
  }

  throw new Error(`Failed to get human-readable month from date: ${date}.`);
}

/**
 * Gets human-readable day of the month from date.
 *
 * @param {Date} date Date to get day of the month from.
 */
export function getDate(date: Date): number {
  if (date instanceof Date) {
    return date.getDate();
  }

  throw new Error(`Failed to get year from date: ${date}.`);
}

/**
 * Gets hours from date.
 *
 * @param {Date|string} date Date to get hours from.
 */
export function getHours(date: Date | string): number {
  if (date instanceof Date) {
    return date.getHours();
  }

  if (typeof date === 'string') {
    const datePieces = date.split(':');

    if (datePieces.length >= 2) {
      const hoursString = datePieces[0];
      const hours = parseInt(hoursString, 10);

      if (!isNaN(hours)) {
        return hours;
      }
    }
  }

  throw new Error(`Failed to get hours from date: ${date}.`);
}

/**
 * Gets minutes from date.
 *
 * @param {Date|string} date Date to get minutes from.
 */
export function getMinutes(date: Date | string): number {
  if (date instanceof Date) {
    return date.getMinutes();
  }

  if (typeof date === 'string') {
    const datePieces = date.split(':');

    if (datePieces.length >= 2) {
      const minutesString = datePieces[1] || '0';
      const minutes = parseInt(minutesString, 10);

      if (!isNaN(minutes)) {
        return minutes;
      }
    }
  }

  throw new Error(`Failed to get minutes from date: ${date}.`);
}

/**
 * Gets seconds from date.
 *
 * @param {Date|string} date Date to get seconds from.
 */
export function getSeconds(date: Date | string): number {
  if (date instanceof Date) {
    return date.getSeconds();
  }

  if (typeof date === 'string') {
    const datePieces = date.split(':');

    if (datePieces.length >= 2) {
      const secondsString = datePieces[2] || '0';
      const seconds = parseInt(secondsString, 10);

      if (!isNaN(seconds)) {
        return seconds;
      }
    }
  }

  throw new Error(`Failed to get seconds from date: ${date}.`);
}

/**
 * Century
 */

export function getCenturyStart(date: Date): Date {
  const year = getYear(date);
  const centuryStartYear = year + ((-year + 1) % 100);
  const centuryStartDate = new Date();
  centuryStartDate.setFullYear(centuryStartYear, 0, 1);
  centuryStartDate.setHours(0, 0, 0, 0);
  return centuryStartDate;
}
export const getPreviousCenturyStart: (d: Date) => Date = makeGetEdgeOfNeighbor(getYear, getCenturyStart, -100);
export const getNextCenturyStart: (d: Date) => Date = makeGetEdgeOfNeighbor(getYear, getCenturyStart, 100);

export const getCenturyEnd: (d: Date) => Date = makeGetEnd(getNextCenturyStart);
export const getPreviousCenturyEnd: (d: Date, o: number) => Date = makeGetEdgeOfNeighbor(getYear, getCenturyEnd, -100);
export const getNextCenturyEnd: (d: Date, o: number) => Date = makeGetEdgeOfNeighbor(getYear, getCenturyEnd, 100);

export const getCenturyRange: (d: Date) => Date[] = makeGetRange([getCenturyStart, getCenturyEnd]);

/**
 * Decade
 */

export function getDecadeStart(date: Date): Date {
  const year = getYear(date);
  const decadeStartYear = year + ((-year + 1) % 10);
  const decadeStartDate = new Date();
  decadeStartDate.setFullYear(decadeStartYear, 0, 1);
  decadeStartDate.setHours(0, 0, 0, 0);
  return decadeStartDate;
}
export const getPreviousDecadeStart: (d: Date) => Date = makeGetEdgeOfNeighbor(getYear, getDecadeStart, -10);
export const getNextDecadeStart: (d: Date) => Date = makeGetEdgeOfNeighbor(getYear, getDecadeStart, 10);

export const getDecadeEnd: (d: Date) => Date = makeGetEnd(getNextDecadeStart);
export const getPreviousDecadeEnd: (d: Date, o: number) => Date = makeGetEdgeOfNeighbor(getYear, getDecadeEnd, -10);
export const getNextDecadeEnd: (d: Date, o: number) => Date = makeGetEdgeOfNeighbor(getYear, getDecadeEnd, 10);

export const getDecadeRange: (d: Date) => Date[] = makeGetRange([getDecadeStart, getDecadeEnd]);

/**
 * Year
 */

export function getYearStart(date: Date): Date {
  const year = getYear(date);
  const yearStartDate = new Date();
  yearStartDate.setFullYear(year, 0, 1);
  yearStartDate.setHours(0, 0, 0, 0);
  return yearStartDate;
}
export const getPreviousYearStart: (d: Date) => Date = makeGetEdgeOfNeighbor(getYear, getYearStart, -1);
export const getNextYearStart: (d: Date) => Date = makeGetEdgeOfNeighbor(getYear, getYearStart, 1);

export const getYearEnd: (d: Date) => Date = makeGetEnd(getNextYearStart);
export const getPreviousYearEnd: (d: Date) => Date = makeGetEdgeOfNeighbor(getYear, getYearEnd, -1);
export const getNextYearEnd: (d: Date) => Date = makeGetEdgeOfNeighbor(getYear, getYearEnd, 1);

export const getYearRange: (d: Date) => Date[] = makeGetRange([getYearStart, getYearEnd]);

/**
 * Month
 */

function makeGetEdgeOfNeighborMonth(getEdgeOfPeriod: (d: Date) => Date, defaultOffset: number): (d: Date) => Date {
  return function makeGetEdgeOfNeighborMonthInternal(date: Date, offset: number = defaultOffset): Date {
    const year = getYear(date);
    const month = getMonth(date) + offset;
    const previousPeriod = new Date();
    previousPeriod.setFullYear(year, month, 1);
    previousPeriod.setHours(0, 0, 0, 0);
    return getEdgeOfPeriod(previousPeriod);
  };
}

export function getMonthStart(date: Date): Date {
  const year = getYear(date);
  const month = getMonth(date);
  const monthStartDate = new Date();
  monthStartDate.setFullYear(year, month, 1);
  monthStartDate.setHours(0, 0, 0, 0);
  return monthStartDate;
}
export const getPreviousMonthStart: (d: Date) => Date = makeGetEdgeOfNeighborMonth(getMonthStart, -1);
export const getNextMonthStart: (d: Date) => Date = makeGetEdgeOfNeighborMonth(getMonthStart, 1);

export const getMonthEnd: (d: Date) => Date = makeGetEnd(getNextMonthStart);
export const getPreviousMonthEnd: (d: Date) => Date = makeGetEdgeOfNeighborMonth(getMonthEnd, -1);
export const getNextMonthEnd: (d: Date) => Date = makeGetEdgeOfNeighborMonth(getMonthEnd, 1);

export const getMonthRange: (d: Date) => Date[] = makeGetRange([getMonthStart, getMonthEnd]);

/**
 * Day
 */

function makeGetEdgeOfNeighborDay(getEdgeOfPeriod: (d: Date) => Date, defaultOffset: number): (d: Date) => Date {
  return function makeGetEdgeOfNeighborDayInternal(date: Date, offset: number = defaultOffset): Date {
    const year = getYear(date);
    const month = getMonth(date);
    const day = getDate(date) + offset;
    const previousPeriod = new Date();
    previousPeriod.setFullYear(year, month, day);
    previousPeriod.setHours(0, 0, 0, 0);
    return getEdgeOfPeriod(previousPeriod);
  };
}

export function getDayStart(date: Date): Date {
  const year = getYear(date);
  const month = getMonth(date);
  const day = getDate(date);
  const dayStartDate = new Date();
  dayStartDate.setFullYear(year, month, day);
  dayStartDate.setHours(0, 0, 0, 0);
  return dayStartDate;
}
export const getPreviousDayStart: (d: Date) => Date = makeGetEdgeOfNeighborDay(getDayStart, -1);
export const getNextDayStart: (d: Date) => Date = makeGetEdgeOfNeighborDay(getDayStart, 1);

export const getDayEnd: (d: Date) => Date = makeGetEnd(getNextDayStart);
export const getPreviousDayEnd: (d: Date) => Date = makeGetEdgeOfNeighborDay(getDayEnd, -1);
export const getNextDayEnd: (d: Date) => Date = makeGetEdgeOfNeighborDay(getDayEnd, 1);

export const getDayRange: (d: Date) => Date[] = makeGetRange([getDayStart, getDayEnd]);

/**
 * Other
 */

/**
 * Returns a number of days in a month of a given date.
 *
 * @param {Date} date Date.
 */
export function getDaysInMonth(date: Date): number {
  return getDate(getMonthEnd(date));
}

function padStart(num: number, val = 2): string | number {
  const numStr = `${num}`;

  if (numStr.length >= val) {
    return num;
  }

  return `0000${numStr}`.slice(-val);
}

/**
 * Returns local hours and minutes (hh:mm).
 */
export function getHoursMinutes(date: Date): string {
  const hours = padStart(getHours(date));
  const minutes = padStart(getMinutes(date));

  return `${hours}:${minutes}`;
}

/**
 * Returns local hours, minutes and seconds (hh:mm:ss).
 */
export function getHoursMinutesSeconds(date: Date): string {
  const hours = padStart(getHours(date));
  const minutes = padStart(getMinutes(date));
  const seconds = padStart(getSeconds(date));

  return `${hours}:${minutes}:${seconds}`;
}

/**
 * Returns local month in ISO-like format (YYYY-MM).
 */
export function getISOLocalMonth(date: Date): string {
  const year = padStart(getYear(date), 4);
  const month = padStart(getMonthHuman(date));

  return `${year}-${month}`;
}

/**
 * Returns local date in ISO-like format (YYYY-MM-DD).
 */
export function getISOLocalDate(date: Date): string {
  const year = padStart(getYear(date), 4);
  const month = padStart(getMonthHuman(date));
  const day = padStart(getDate(date));

  return `${year}-${month}-${day}`;
}

/**
 * Returns local date & time in ISO-like format (YYYY-MM-DDThh:mm:ss).
 */
export function getISOLocalDateTime(date: Date): string {
  return `${getISOLocalDate(date)}T${getHoursMinutesSeconds(date)}`;
}
