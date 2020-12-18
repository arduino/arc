import { GenericFieldProps } from '../../utils';

export interface DateOptions {
  useGrouping?: boolean;
  year?: string;
  month?: string;
  day?: string;
}

export type ValueType = 'century' | 'decade' | 'year' | 'month' | 'day';

export interface DateInputBaseProps extends GenericFieldProps {
  /**
   * Input value
   */
  value?: Date | string;
  /**
   * Set date format view.
   * Default: 'dd/MM/yyyy'
   */
  format?: string;
  /**
   * Set date locale, this will be use for converting a Date to a string.
   * Example: 'en-GB
   */
  locale?: string;
  /**
   * Set day input placeholder. 
   * Default: 'DD'
   */
  dayPlaceholder?: string;
  /**
   * Set day input placeholder. 
   * Default: 'MM'
   */
  monthPlaceholder?: string;
  /**
   * Set year input placeholder. 
   * Default: 'YYYY'
   */
  yearPlaceholder?: string;
  /**
   * Set maximum value of date.
   */
  maxDate?: Date;
  /**
   * Set minimum value of date.
   */
  minDate?: Date;
  /**
   * send event when value has been changes.
   */
  onChange?: (d: Date | Date[]) => void;
  /**
   * send event when value is invalid.
   */
  onError?: (v: string | null) => void;
}
