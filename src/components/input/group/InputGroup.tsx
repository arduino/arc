import React from 'react';

import { GenericFieldProps, WithBemClasses, WithChildren } from '../../utils';

export interface InputGroupGenericInterface<T>
  extends Pick<GenericFieldProps, 'isRequired' | 'isDisabled' | 'isReadOnly'>,
    WithChildren,
    WithBemClasses {
  /** The content to display as the label. */
  label?: React.ReactNode;
  /** The current value (controlled). */
  value?: T;
  /** The default value (uncontrolled). */
  defaultValue?: T;
  /** Handler that is called when the value changes. */
  onChange?: (value: T) => void;
}
