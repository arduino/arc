import React, { useEffect, useState } from 'react';
import classnames from 'classnames';

import { WithBemClasses, WithChildren } from '../utils';

import style from './tabs.module.scss';

export interface TabPanelProps extends WithBemClasses, WithChildren {
  /** unique id of the panel. */
  id: string;
  /** unique id of the tab controlling this panel. */
  labelledBy: string;
  /** static content of the panel. if the content needs to be loaded at runtime use onSelected */
  content?: React.ReactElement;
  /** true if the panel is visible */
  selected: boolean;
  /** callback when the tab is selected */
  onSelected?: (setContentHook: React.Dispatch<any>) => void;
  /** callback when the tab is leaved */
  onLeave?: (setContentHook: React.Dispatch<any>) => void;
}
export function TabPanel({
  id,
  labelledBy,
  children,
  selected,
  className,
  onSelected,
  onLeave,
}: TabPanelProps): React.ReactElement {
  const [content, setcontent] = useState(children);

  // unselected: onLeave callback
  useEffect(() => {
    if (!selected && onLeave) {
      onLeave(setcontent);
    }
  }, [selected, onLeave]);

  // selected: onSelected callback
  useEffect(() => {
    if (selected && onSelected) {
      onSelected(setcontent);
    }
  }, [selected, onSelected]);

  const panelClasses = classnames(style.panel, {
    [style.panelselected]: selected,
    [`${className}__panel`]: !!className,
    [`${className}__panel--selected`]: !!className && selected,
  });

  return (
    <div
      id={id}
      className={panelClasses}
      role="tabpanel"
      aria-labelledby={labelledBy}
      aria-hidden={selected ? 'false' : 'true'}
    >
      {content}
    </div>
  );
}
