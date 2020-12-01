import React from 'react';

export interface WithChildren {
  children?: React.ReactNode;
}

export interface WithBemClasses {
  /**
   * Additional class to add to the component. Sub elements of the component will stick to BEM naming convention
   */
  className?: string;
}

export interface GenericFieldProps extends WithBemClasses {
  /**
   * placeholder text for the input element
   */
  placeholder?: string;

  /**
   * if true, the field must contain a value
   */
  required?: boolean;

  /**
   * if true, the field cannot be changed
   */
  readOnly?: boolean;

  /**
   * if true, the field is disabled
   */
  disabled?: boolean;

  /**
   * set a custom id for the field element. If omitted a uniqueId is generated
   */
  id?: string;
}

export interface GenericFieldPropsEvents<T = Element> {
  /**
   * fires when the field changes
   */
  onChange?: (event: React.ChangeEvent<T>) => void;

  /**
   * fires when the field lose focus
   */
  onBlur?: (event: React.FocusEvent<T>) => void;
}
