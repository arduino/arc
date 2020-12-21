import React, { useEffect, useState } from 'react';

import { useCheckboxGroupState } from 'react-stately';
import { useCheckboxGroup } from 'react-aria';

import { InputGroupWrapper } from './InputGroupWrapper';
import { InputGroupGenericInterface } from './InputGroup';

export const CheckboxGroupContext = React.createContext(null);

export type CheckboxGroupProps = InputGroupGenericInterface<string[]>;

/**
 *
 * ChecboxGroup is a way to associate different checboxes to a single field.
 * The output of the CheckboxGroup is an array containing the list of the checked values.
 *
 * Design on [Figma](https://www.figma.com/file/4Q0ZgRodfKuQ0vpFTUzoni/Contact-Forms?node-id=8%3A5612)
 * Accessibility provieded via [react-aria](https://react-spectrum.adobe.com/react-aria/useCheckboxGroup.html)
 *
 * When using this component, it's required to pass a list of ChecboxGroupItems as children.
 * A good usage example is both here and in the support-form component
 */
function _CheckboxGroup(props: CheckboxGroupProps): React.ReactElement {
  const { label, children, className } = props;
  const [values, setvalues] = useState([]);

  useEffect(() => {
    props.onChange(values);
  }, [values]);

  const state = useCheckboxGroupState({ ...props, onChange: (e) => setvalues(e) });
  const { groupProps, labelProps } = useCheckboxGroup(props, state);
  return (
    <InputGroupWrapper
      groupProps={groupProps}
      labelProps={labelProps}
      label={label}
      className={className}
      isRequired={props.isRequired}
    >
      <CheckboxGroupContext.Provider value={state}>{children}</CheckboxGroupContext.Provider>
    </InputGroupWrapper>
  );
}

export const CheckboxGroup = React.memo(_CheckboxGroup);
