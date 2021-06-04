import React, { useEffect, useState } from 'react';

import { useCheckboxGroupState } from 'react-stately';
import { useCheckboxGroup } from 'react-aria';

import { InputGroupWrapper } from './InputGroupWrapper';
import { InputGroupGenericInterface } from './InputGroup';
import { WrapperStatusMsgProps } from '../../wrapper/WrapperStatusMsg';
import { WrapperProps } from '../../wrapper';

export const CheckboxGroupContext = React.createContext(null);

export interface CheckboxGroupProps
  extends InputGroupGenericInterface<string[]>,
    WrapperStatusMsgProps,
    Pick<WrapperProps, 'helper'> {}

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
  const { label, children, className, defaultValue, onChange } = props;
  const [values, setvalues] = useState(defaultValue || []);

  useEffect(() => {
    onChange(values);
  }, [onChange, values]);

  const state = useCheckboxGroupState({ ...props, onChange: (e) => setvalues(e) });
  const { groupProps, labelProps } = useCheckboxGroup(props, state);
  return (
    <InputGroupWrapper
      groupProps={groupProps}
      labelProps={labelProps}
      label={label}
      className={className}
      isRequired={props.isRequired}
      error={props.error}
      successMsg={props.successMsg}
      infoMsg={props.infoMsg}
      helper={props.helper}
    >
      <CheckboxGroupContext.Provider value={state}>{children}</CheckboxGroupContext.Provider>
    </InputGroupWrapper>
  );
}

export const CheckboxGroup = React.memo(_CheckboxGroup);
