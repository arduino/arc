import React, { useEffect, useState } from 'react';
import classnames from 'classnames';

import { WithBemClasses, WithChildren } from '../utils';

import style from './accordion.module.scss';

export interface AccordionPanelProps extends WithBemClasses, WithChildren {
  /** unique id of the panel. */
  id: string;
  /** unique id of the accordionBtn controlling this panel. */
  labelledBy: string;
  /** static content of the panel. if the content needs to be loaded at runtime use onSelected */
  content?: React.ReactElement;
  /** true if the panel is visible */
  expanded: boolean;
  /** callback when the accordion is expanded */
  onExpand?: (setContentHook: React.Dispatch<any>) => void;
  /** callback when the accordion is collapsed */
  onCollapse?: (setContentHook: React.Dispatch<any>) => void;
}
export function AccordionPanel({
  id,
  labelledBy,
  children,
  expanded,
  className,
  onExpand,
  onCollapse,
}: AccordionPanelProps): React.ReactElement {
  const [content, setcontent] = useState(children);

  // unselected: onLeave callback
  useEffect(() => {
    if (!expanded && onCollapse) {
      onCollapse(setcontent);
    }
  }, [expanded, onCollapse]);

  // selected: onSelected callback
  useEffect(() => {
    if (expanded && onExpand) {
      onExpand(setcontent);
    }
  }, [expanded, onExpand]);

  const panelClasses = classnames(style.panel, {
    [style.panelexpanded]: expanded,
    [`${className}__panel`]: !!className,
    [`${className}__panel--expanded`]: !!className && expanded,
  });

  return (
    <div
      id={id}
      className={panelClasses}
      role="region"
      aria-labelledby={labelledBy}
      aria-hidden={expanded ? 'false' : 'true'}
    >
      {content}
    </div>
  );
}
