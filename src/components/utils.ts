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
export interface WithFlavour {
  /** Vertical and font size of the button. Use accordingly to UX specs */
  size?: 'big' | 'normal' | 'small';
  /** Changes the theme of the button. Use accordingly to UX specs */
  theme?: 'light' | 'dark';
}

export interface GenericFieldProps extends WithBemClasses {
  /**  placeholder text for the input element*/
  placeholder?: string;
  /**  if true, the field must contain a value */
  isRequired?: boolean;
  /** Whether the input can be interacted with but cannot have its state changed. */
  isReadOnly?: boolean;
  /** Whether or not the input is disabled */
  isDisabled?: boolean;
  /**  set a custom id for the field element. If omitted a uniqueId is generated */
  id?: string;
  /**  name of the input, required when using event.target.name */
  name?: string;
  /** hides the status element. Has no effect if the field is not using a Wrapper */
  withoutStatus?: boolean;
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

// FIXME: This is from react-aria: we need to pin to a specific version but because it depends from other subpackages, and because it's a peer dependency, stuff gets tricky.
// So, for the time being, this live here, too.
export interface OverlayProps {
  /** Whether the overlay is currently open. */
  isOpen?: boolean;
  /** Handler that is called when the overlay should close. */
  onClose?: () => void;
  /**
   * Whether to close the overlay when the user interacts outside it.
   * @default false
   */
  isDismissable?: boolean;
  /** Whether the overlay should close when focus is lost or moves outside it. */
  shouldCloseOnBlur?: boolean;
  /**
   * Whether pressing the escape key to close the overlay should be disabled.
   * @default false
   */
  isKeyboardDismissDisabled?: boolean;
  /**
   * When user interacts with the argument element outside of the overlay ref,
   * return true if onClose should be called.  This gives you a chance to filter
   * out interaction with elements that should not dismiss the overlay.
   * By default, onClose will always be called on interaction outside the overlay ref.
   */
  shouldCloseOnInteractOutside?: (element: HTMLElement) => boolean;
}
