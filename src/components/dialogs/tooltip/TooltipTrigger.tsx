import React, { useState } from 'react';
import { useTooltipTrigger, useFocusVisible } from 'react-aria';
import { usePopper } from 'react-popper';
import { TooltipTriggerProps as RaTooltipTriggerProps } from '@react-types/tooltip';
import { useTooltipTriggerState } from 'react-stately';
import { Tooltip } from './Tooltip';
import { OpenTransition } from '../../OpenTransition';
import { WithBemClasses } from '../../utils';

export type TooltipPlacement =
  | 'auto'
  | 'auto-start'
  | 'auto-end'
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'left'
  | 'left-start'
  | 'left-end';

export interface TooltipTriggerProps extends RaTooltipTriggerProps, WithBemClasses {
  TriggerElement: React.ReactElement;
  children: React.ReactElement | string;

  tooltipType?: 'tooltip' | 'popover';

  /**
   * the placement of the tooltip
   */
  tooltipPlacement?: TooltipPlacement;

  /**
   * strategy of the tooltip positioning
   */
  tooltipStrategy?: 'absolute' | 'fixed';

  /**
   * Whether the tooltip should be disabled, independent from the trigger.
   */
  isDisabled?: boolean;
  /**
   * The delay time for the tooltip to show up. [See guidelines](https://spectrum.corp.adobe.com/page/tooltip/#Immediate-or-delayed-appearance).
   */
  delay?: number;

  /** Whether the overlay is open by default (controlled). */
  isOpen?: boolean;
  /** Whether the overlay is open by default (uncontrolled). */
  defaultOpen?: boolean;
  /** Handler that is called when the overlay's open state changes. */
  onOpenChange?: (isOpen: boolean) => void;
}

/**
 *
 * TooltipTrigger shows an arduino-styled tooltip when the trigger is in focus or hovered.
 *
 * The Trigger can be any valid html or ReactElement.
 *
 * Accessibilty is provided via [react-aria](https://react-spectrum.adobe.com/react-aria/useTooltipTrigger.html) hooks.
 *
 * The Tooltip is positioned using [popper.js](https://popper.js.org/react-popper/) in order to manage
 * corner cases such as opening a tooltip near the border of the browser window
 */
export function TooltipTrigger({
  TriggerElement,
  children,
  delay = 0,
  isDisabled = false,
  tooltipPlacement = 'right',
  tooltipStrategy = 'absolute',
  tooltipType = 'tooltip',
  className,
  ...props
}: TooltipTriggerProps): React.ReactElement {
  useFocusVisible();

  const tpProps = {
    delay,
    isDisabled,
    ...props,
  };

  const state = useTooltipTriggerState(tpProps);

  const [triggerRef, setTriggerRef] = useState(null);
  const [popperRef, setPopperRef] = useState(null);

  const { styles, attributes } = usePopper(triggerRef, popperRef, {
    placement: tooltipPlacement,
    strategy: tooltipStrategy,
  });

  // Get props for the trigger and its tooltip
  const { triggerProps, tooltipProps } = useTooltipTrigger(tpProps, state, triggerRef);

  // extract children and other props from trigger element
  const { children: triggerChildren, ...otherTriggerProps } = TriggerElement.props;

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <TriggerElement.type {...otherTriggerProps} {...triggerProps} ref={setTriggerRef}>
        {triggerChildren}
      </TriggerElement.type>
      {state.isOpen && (
        <OpenTransition in={state.isOpen} appear>
          <Tooltip
            {...tooltipProps}
            {...attributes.popper}
            className={className}
            popperStyle={styles.popper}
            ref={setPopperRef}
            popover={tooltipType === 'popover'}
          >
            {children}
          </Tooltip>
        </OpenTransition>
      )}
    </div>
  );
}
