import React, { ChangeEvent, KeyboardEvent, ReactElement } from 'react';

import { DateOptions, ValueType, DateInputBaseProps } from './models/DatePicker.model';

import DayInput from './DateInput/DayInput';
import MonthInput from './DateInput/MonthInput';
import YearInput from './DateInput/YearInput';
import Divider from './Divider';

import { getYear, getMonthHuman, getDate } from './utils/date-utils';
import { getBegin, getEnd } from './utils/dates';
import { between, getFormatter } from './utils/utils';

const defaultMinDate = new Date('0001-01-01');
const defaultMaxDate = new Date(8.64e15);
const allViews = ['century', 'decade', 'year', 'month'];
const allValueTypes = [...allViews.slice(1), 'day'];

interface DateCalculation {
  value: Date;
  minDate: Date;
  maxDate: Date;
  maxDetail: 'century' | 'decade' | 'year' | 'month';
}

function datesAreDifferent(date1?: Date, date2?: Date): boolean | Date {
  return (date1 && !date2) || (!date1 && date2) || (date1 && date2 && date1.getTime() !== date2.getTime());
}

function focus(element: HTMLElement): void {
  if (element) {
    element.focus();
  }
}

function isInternalInput(element: HTMLElement) {
  return element.getAttribute('data-input') === 'true';
}

function findInput(element: HTMLElement, property: string) {
  let nextElement = element;
  do {
    nextElement = nextElement[property];
  } while (nextElement && !isInternalInput(nextElement));
  return nextElement;
}

/**
 * Returns value type that can be returned with currently applied settings.
 */
function getValueType(maxDetail: string): ValueType {
  return allValueTypes[allViews.indexOf(maxDetail)] as ValueType;
}
function getValue(value: Date, index: number): Date {
  if (!value) {
    return null;
  }

  const rawValue = value instanceof Array && value.length === 2 ? value[index] : value;

  if (!rawValue) {
    return null;
  }

  const valueDate = new Date(rawValue);

  if (isNaN(valueDate.getTime())) {
    throw new Error(`Invalid date: ${value}`);
  }

  return valueDate;
}

function getDetailValue({ value, minDate, maxDate, maxDetail }: DateCalculation, index: number): Date {
  const valuePiece = getValue(value, index);

  if (!valuePiece) {
    return null;
  }

  const valueType = getValueType(maxDetail);
  const detailValueFrom = [getBegin, getEnd][index](valueType, valuePiece);

  return between(detailValueFrom, minDate, maxDate);
}
const getDetailValueFrom = (args: DateCalculation): Date => getDetailValue(args, 0);
const getDetailValueTo = (args: DateCalculation): Date => getDetailValue(args, 1);
const getDetailValueArray = (args: DateCalculation): Date[] => {
  const { value } = args;

  if (value instanceof Array) {
    return value;
  }

  return [getDetailValueFrom, getDetailValueTo].map((fn) => fn(args));
};

// rendering input by format template
function renderCustomInputs(
  placeholder: string,
  elementFunctions: Record<string, any>,
  allowMultipleInstances: boolean
) {
  const usedFunctions = [];
  const pattern = new RegExp(
    Object.keys(elementFunctions)
      .map((el) => `${el}+`)
      .join('|'),
    'g'
  );
  const matches = placeholder.match(pattern);

  return placeholder.split(pattern).reduce((arr, element, index) => {
    const divider = element && (
      // eslint-disable-next-line react/no-array-index-key
      <Divider key={`separator_${index}`}>{element}</Divider>
    );
    const res = [...arr, divider];
    const currentMatch = matches && matches[index];

    if (currentMatch) {
      const renderFunction =
        elementFunctions[currentMatch] ||
        elementFunctions[Object.keys(elementFunctions).find((elementFunction) => currentMatch.match(elementFunction))];

      if (!allowMultipleInstances && usedFunctions.includes(renderFunction)) {
        res.push(currentMatch);
      } else {
        res.push(renderFunction(currentMatch, index));
        usedFunctions.push(renderFunction);
      }
    }
    return res;
  }, []);
}

interface DateInputState {
  day?: number;
  month?: number;
  year?: number;
  value?: Date | Date[] | string | string[];
  isError?: boolean;
}

export interface DateInputProps extends DateInputBaseProps {
  name?: string;
  maxDetail?: 'century' | 'decade' | 'year' | 'month';
  autoFocus?: boolean;
  dayAriaLabel?: string;
  monthAriaLabel?: string;
  yearAriaLabel?: string;
  returnValue: 'start' | 'end' | 'range';
  onFocus?: (e: React.FocusEvent) => void;
  onBlur?: (e: React.FocusEvent) => void;
}

interface InputCommonProps {
  className: string;
  isDisabled: boolean;
  isReadOnly: boolean;
  maxDate: Date;
  minDate: Date;
  onChange: (event: {
    target: {
      name: any;
      value: any;
    };
  }) => void;
  onKeyDown: (event: KeyboardEvent) => void;
  onKeyUp: (event: KeyboardEvent) => void;
  isRequired: boolean;
  itemRef: (ref: any, name: any) => void;
}

export default class DateInput extends React.PureComponent<DateInputProps, DateInputState> {
  public static defaultProps = {
    dayPlaceholder: 'DD',
    monthPlaceholder: 'MM',
    yearPlaceholder: 'YYYY',
    maxDetail: 'month',
    returnValue: 'start',
    format: 'dd/MM/yyyy',
  };

  // refs of input
  dayInput: HTMLInputElement;
  monthInput: HTMLInputElement;
  yearInput: HTMLInputElement;

  static getDerivedStateFromProps(
    nextProps: { value?: any; minDate?: any; maxDate?: any; maxDetail?: any },
    prevState: { value: any; isError: any }
  ): DateInputState {
    const { minDate, maxDate, maxDetail } = nextProps;

    const nextState: DateInputState = {};

    /**
     * If the next value is different from the current one  (with an exception of situation in
     * which values provided are limited by minDate and maxDate so that the dates are the same),
     * get a new one.
     */
    const nextValue = getDetailValueFrom({
      value: nextProps.value,
      minDate,
      maxDate,
      maxDetail,
    });
    const values = [nextValue, prevState.value];
    if (
      // Toggling calendar visibility resets values
      datesAreDifferent(
        ...values.map((value) =>
          getDetailValueFrom({
            value,
            minDate,
            maxDate,
            maxDetail,
          })
        )
      ) ||
      datesAreDifferent(
        ...values.map((value) =>
          getDetailValueTo({
            value,
            minDate,
            maxDate,
            maxDetail,
          })
        )
      )
    ) {
      if (nextValue) {
        nextState.year = getYear(nextValue);
        nextState.month = getMonthHuman(nextValue);
        nextState.day = getDate(nextValue);
      } else {
        if (!prevState.isError) {
          nextState.year = null;
          nextState.month = null;
          nextState.day = null;
        }
      }
      nextState.value = nextValue;
    }

    return nextState;
  }

  constructor(props: DateInputProps) {
    super(props);

    this.state = {};

    this.renderDay = this.renderDay.bind(this);
    this.renderMonth = this.renderMonth.bind(this);
    this.renderYear = this.renderYear.bind(this);
  }

  // build placeholder string
  get placeholder(): string {
    const { format, locale } = this.props;

    if (format) {
      return format;
    }

    const year = 2020;
    const monthIndex = 11;
    const day = 11;

    const date = new Date(year, monthIndex, day);
    const formattedDate = this.formatDate(locale, date);

    const datePieces = ['year', 'month', 'day'];
    const datePieceReplacements = ['y', 'M', 'd'];

    function formatDatePiece(name: string, dateToFormat: Date) {
      return getFormatter({ useGrouping: false, [name]: 'numeric' })(locale, dateToFormat).match(/\d{1,}/);
    }

    let placeholder = formattedDate;
    datePieces.forEach((datePiece, index) => {
      // check the convert from  RegExpMatchArray -> string
      const formattedDatePiece: RegExpMatchArray = formatDatePiece(datePiece, date);
      const datePieceReplacement = datePieceReplacements[index];
      placeholder = placeholder.replace(formattedDatePiece.toString(), datePieceReplacement);
    });

    return placeholder;
  }

  // get date formatter
  get formatDate(): (l: string, d: Date) => string {
    const { maxDetail } = this.props;

    const options: DateOptions = { year: 'numeric' };
    const level = allViews.indexOf(maxDetail);
    if (level >= 2) {
      options.month = 'numeric';
    }
    if (level >= 3) {
      options.day = 'numeric';
    }

    return getFormatter(options);
  }

  get divider(): string {
    return this.placeholder.match(/[^0-9a-z]/i)[0];
  }

  get valueType(): ValueType {
    const { maxDetail } = this.props;

    return getValueType(maxDetail);
  }

  // get input common props
  get inputCommonPros(): InputCommonProps {
    const { className, isDisabled, maxDate, minDate, isRequired, isReadOnly } = this.props;

    return {
      className,
      isDisabled,
      isReadOnly,
      maxDate: maxDate || defaultMaxDate,
      minDate: minDate || defaultMinDate,
      onChange: this.onChange,
      onKeyDown: this.onKeyDown,
      onKeyUp: this.onKeyUp,
      // This is only for showing validity when editing
      isRequired,
      itemRef: (ref: any, name: any) => {
        // Save a reference to each input field
        this[`${name}Input`] = ref;
      },
    };
  }

  /**
   * Gets current value in a desired format.
   */
  getProcessedValue(value: Date): Date | Date[] {
    const { minDate, maxDate, maxDetail, returnValue } = this.props;

    const processFunction = ((): ((args: DateCalculation) => Date | Date[]) => {
      switch (returnValue) {
        case 'start':
          return getDetailValueFrom;
        case 'end':
          return getDetailValueTo;
        case 'range':
          return getDetailValueArray;
        default:
          throw new Error('Invalid returnValue.');
      }
    })();

    return processFunction({
      value,
      minDate,
      maxDate,
      maxDetail,
    });
  }

  click = (): any => {
    if (this.dayInput) {
      this.dayInput.focus();
    }
  };

  /**
   * handlers
   */
  // handler for component click
  onClick = (event: React.MouseEvent<HTMLElement>): void => {
    if (event.target === event.currentTarget) {
      const target = event.target as HTMLElement;
      // Wrapper was directly clicked
      focus(target.children[0] as HTMLElement);
    }
  };

  /**
   * Called when date input is changed.
   */
  onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    let correctValue = null;
    if (value) {
      correctValue = parseInt(value, 10);
    }

    this.setState({ [name]: correctValue }, this.onChangeExternal);
  };

  /**
   * Called after internal onChange. Checks input validity. If all fields are valid,
   * calls props.onChange.
   */
  onChangeExternal = (): void => {
    const { onChange } = this.props;

    if (!onChange) {
      return;
    }

    const formElements = [this.dayInput, this.monthInput, this.yearInput].filter(Boolean);

    const values: { day?: string; month?: string; year?: string } = {};
    formElements.forEach((formElement) => {
      values[formElement.name] = formElement.value;
    });

    if (formElements.every((formElement) => !formElement.value)) {
      onChange(null);
      this.onError(false);
    } else if (formElements.every((formElement) => formElement.value && formElement.validity.valid)) {
      const year = parseInt(values.year, 10);
      const monthIndex = parseInt(values.month, 10) - 1 || 0;
      const day = parseInt(values.day || '1', 10);

      const proposedValue = new Date();
      proposedValue.setFullYear(year, monthIndex, day);
      proposedValue.setHours(0, 0, 0, 0);
      const processedValue = this.getProcessedValue(proposedValue);

      this.onError(false);
      onChange(processedValue);
    } else if (formElements.some((formElement) => !formElement.validity.valid)) {
      // in case when date is not valid
      this.onError(true);
      onChange(null);
    }
  };

  onError = (state: boolean): void => {
    const { isError } = this.state;

    if (isError !== state) {
      this.setState({ isError: state }, this.onErrorExternal);
    }
  };

  onErrorExternal = (): void => {
    const { isError } = this.state;
    const { onError } = this.props;

    if (onError) {
      onError(isError ? 'The date is invalid' : null);
    }
  };

  onKeyDown = (event: KeyboardEvent<HTMLElement>): void => {
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowRight':
      case this.divider: {
        event.preventDefault();

        const { target: input } = event;
        const property = event.key === 'ArrowLeft' ? 'previousElementSibling' : 'nextElementSibling';
        const nextInput = findInput(input as HTMLElement, property);
        focus(nextInput);
        break;
      }
      default:
    }
  };

  onKeyUp = (event: { key: any; target: any }): void => {
    const { key, target: input } = event;

    const isNumberKey = !isNaN(parseInt(key, 10));

    if (!isNumberKey) {
      return;
    }

    const { value } = input;
    const max = input.getAttribute('max');

    /**
     * Given 1, the smallest possible number the user could type by adding another digit is 10.
     * 10 would be a valid value given max = 12, so we won't jump to the next input.
     * However, given 2, smallers possible number would be 20, and thus keeping the focus in
     * this field doesn't make sense.
     */
    if (value * 10 > max || value.length >= max.length) {
      const property = 'nextElementSibling';
      const nextInput = findInput(input, property);
      focus(nextInput);
    }
  };

  /**
   * renders functions
   */
  // render day input
  renderDay(currentMatch: string | any[], index: number): ReactElement {
    const { autoFocus, dayAriaLabel, dayPlaceholder } = this.props;
    const { day, month, year } = this.state;

    if (currentMatch && currentMatch.length > 2) {
      throw new Error(`Unsupported token: ${currentMatch}`);
    }

    return (
      <DayInput
        key="day"
        {...this.inputCommonPros}
        ariaLabel={dayAriaLabel}
        autoFocus={index === 0 && autoFocus}
        placeholder={dayPlaceholder}
        value={day}
        month={month}
        year={year}
      />
    );
  }

  // render month
  renderMonth = (currentMatch: string | any[], index: number): ReactElement => {
    const { autoFocus, monthAriaLabel, monthPlaceholder } = this.props;
    const { month, year } = this.state;

    if (currentMatch && currentMatch.length > 4) {
      throw new Error(`Unsupported token: ${currentMatch}`);
    }

    return (
      <MonthInput
        key="month"
        {...this.inputCommonPros}
        ariaLabel={monthAriaLabel}
        autoFocus={index === 0 && autoFocus}
        placeholder={monthPlaceholder}
        value={month}
        year={year}
      />
    );
  };

  // render year
  renderYear = (_: unknown, index: number): ReactElement => {
    const { autoFocus, yearAriaLabel, yearPlaceholder } = this.props;
    const { year } = this.state;

    return (
      <YearInput
        key="year"
        {...this.inputCommonPros}
        ariaLabel={yearAriaLabel}
        autoFocus={index === 0 && autoFocus}
        placeholder={yearPlaceholder}
        value={year}
        valueType={this.valueType}
        maxLength={4}
      />
    );
  };

  // main render
  render(): ReactElement {
    const { className, format, onFocus, onBlur } = this.props;

    const elementFunctions = {
      d: this.renderDay,
      M: this.renderMonth,
      y: this.renderYear,
    };

    const allowMultipleInstances = typeof format !== 'undefined';

    return (
      <div className={className} onClick={this.onClick} onFocus={onFocus} onBlur={onBlur}>
        {renderCustomInputs(this.placeholder, elementFunctions, allowMultipleInstances)}
      </div>
    );
  }
}
