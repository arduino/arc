import { GenericFieldProps } from '../../utils';

export interface DateOptions {
  useGrouping?: boolean;
  year?: string;
  month?: string;
  day?: string;
}

export type ValueType = 'century' | 'decade' | 'year' | 'month' | 'day';

export interface DateInputBaseProps extends GenericFieldProps {
  value?: Date | string;
  format?: string;
  locale?: string;
  dayPlaceholder?: string;
  monthPlaceholder?: string;
  yearPlaceholder?: string;
  maxDate?: Date;
  minDate?: Date;
  onChange?: (d: Date | Date[]) => void;
  onError?: (v: string | null) => void;
}
