import React from 'react';

import { useRadioGroupState } from 'react-stately';
import { useRadioGroup } from 'react-aria';

import { InputGroupWrapper } from './InputGroupWrapper';
import { InputGroupGenericInterface } from './InputGroup';
import { WrapperStatusMsgProps } from '../../wrapper/WrapperStatusMsg';
import { WrapperProps } from '../../wrapper';

export const RadioGroupContext = React.createContext(null);

export interface RadioGroupProps
  extends InputGroupGenericInterface<string>,
    WrapperStatusMsgProps,
    Pick<WrapperProps, 'helper'> {
  /**
   * The axis the Radio Button(s) should align with.
   * @default 'vertical'
   */
  orientation: 'horizontal' | 'vertical';
}

/**
 *
 * RadioGroup is the default method to add radios in a page.
 * Design on [Figma](https://www.figma.com/file/4Q0ZgRodfKuQ0vpFTUzoni/Contact-Forms?node-id=8%3A5612)
 * Accessibility provieded via [react-aria](https://react-spectrum.adobe.com/react-aria/useRadioGroup.html)
 *
 * When using this component, it's required to pass a list of RadioGroupItems as children.
 * A good usage example is both here and in the support-form component
 */
export function RadioGroup(props: RadioGroupProps): React.ReactElement {
  const { label, children, className } = props;
  const state = useRadioGroupState(props);

  // add disabled/readonly to state in order to use them in the radioElements
  state['isDisabled'] = props.isDisabled || false;
  state['isReadOnly'] = props.isReadOnly || false;

  const { radioGroupProps, labelProps } = useRadioGroup(props, state);

  return (
    <InputGroupWrapper
      groupProps={radioGroupProps}
      labelProps={labelProps}
      label={label}
      className={className}
      isRequired={props.isRequired}
      error={props.error}
      successMsg={props.successMsg}
      infoMsg={props.infoMsg}
      helper={props.helper}
    >
      <RadioGroupContext.Provider value={state}>{children}</RadioGroupContext.Provider>
    </InputGroupWrapper>
  );
}
