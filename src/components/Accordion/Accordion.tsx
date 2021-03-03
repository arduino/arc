import React, { useCallback, useState } from 'react';
import classnames from 'classnames';

import { WithBemClasses } from '../utils';

import style from './accordion.module.scss';
import { AccordionPanel, AccordionPanelProps } from './AccordionPanel';
import { AccordionIcon } from './AccordionIcon';

export interface AccordionProps extends WithBemClasses, Pick<AccordionPanelProps, 'onExpand' | 'onCollapse'> {
  /** Text to show for the accordion button */
  label: string;
  /** unique id of the accordion button */
  id: string;
  /** Uncontrolled mode.
   * Set the accordion initial state to expanded (open) or not.
   * Defaults to false.
   */
  defaultExpanded?: boolean;
  /** Controlled mode.
   * Forces the accordion expanded state.
   * Setting this param to false, automatically disabled the accordion.
   * Defaults to null.
   */
  isExpanded?: boolean;
  /** the position of the icon on the button */
  iconPosition?: 'left' | 'right';
  /** React Element with the content of the panel */
  panel: React.ReactElement;
  /** React Element with a custom icon to use to expand the accordion */
  customIcon?: React.ReactElement;
}
export function _Accordion({
  label,
  defaultExpanded = false,
  isExpanded = null,
  id,
  className,
  iconPosition = 'left',
  customIcon = null,
  panel,
  onExpand,
  onCollapse,
}: AccordionProps): React.ReactElement {
  const [expanded, setExpanded] = useState(isExpanded !== null ? isExpanded : defaultExpanded);

  const expandToggle = useCallback(() => {
    // if in controlled mode, can't change the expanded state
    if (isExpanded !== null) {
      return;
    }

    setExpanded(!expanded);
  }, [isExpanded, expanded]);

  const accordionClasses = classnames(style.accordion, {
    [`${className}__accordion`]: !!className,
    [`${className}__accordion--expanded`]: !!className && expanded,
  });

  const accordionBtnClasses = classnames(style.accordionbtn, {
    [style.accordionbtndisabled]: isExpanded === false,
    [style.iconright]: iconPosition === 'right',
    [`${className}__accordion-btn`]: !!className,
    [`${className}__accordion-btn--iconright`]: !!className && iconPosition === 'right',
    [`${className}__accordion-btn--disabled`]: !!className && isExpanded === false,
  });

  const accordionLabelClasses = classnames(style.accordionlabel, {
    [`${className}__accordion-label`]: !!className,
  });

  return (
    <div className={accordionClasses}>
      <button
        className={accordionBtnClasses}
        id={id}
        onClick={() => expandToggle()}
        aria-controls={`panel-${id}`}
        aria-expanded={expanded ? 'true' : 'false'}
      >
        {customIcon ? (
          React.cloneElement(customIcon, { expanded, iconPosition })
        ) : (
          <AccordionIcon expanded={expanded} iconPosition={iconPosition} />
        )}

        <span className={accordionLabelClasses}>{label}</span>
      </button>
      <AccordionPanel
        labelledBy={id}
        id={`panel-${id}`}
        expanded={expanded}
        className={className}
        onExpand={onExpand}
        onCollapse={onCollapse}
      >
        {panel}
      </AccordionPanel>
    </div>
  );
}
export const Accordion = React.memo(_Accordion);
