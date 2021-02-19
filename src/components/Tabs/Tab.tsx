import React from 'react';
import classnames from 'classnames';

import { WithBemClasses } from '../utils';

import style from './tabs.module.scss';

export interface TabProps extends WithBemClasses {
  /** Text to show for the tab */
  label: string;
  /** icon for the tab */
  icon?: React.ReactElement;
  /** true if the tab is the selected one */
  selected: boolean;
  /** unique id of the tab */
  id: string;
  /** callback when the arrow key is pressed */
  moveTab: (dir: number) => void;
  /** callback when a tab is clicked */
  selectTab: (id: string) => void;
}
export function _Tab({ label, selected, icon, id, className, moveTab, selectTab }: TabProps): React.ReactElement {
  const tabClasses = classnames(style.tab, {
    [style.tabselected]: selected,
    [`${className}__tab`]: !!className,
    [`${className}__tab--selected`]: !!className && selected,
  });

  const iconClasses = classnames(style.icon, { [`${className}__tab-icon--selected`]: !!className });

  const handleArrowkey = (e) => {
    const code = e.keyCode || e.charCode;

    switch (code) {
      case 37: // left, go to previous tab
        moveTab(-1);
        break;

      case 39: // right, go to next tab
        moveTab(1);
        break;

      default:
        break;
    }
  };
  return (
    <li
      className={tabClasses}
      role="tab"
      id={id}
      tabIndex={0}
      onKeyDown={handleArrowkey}
      onClick={() => selectTab(id)}
      aria-controls={`panel-${id}`}
      aria-selected={selected ? 'true' : 'false'}
    >
      {icon && <span className={iconClasses}>{icon}</span>} {label}
    </li>
  );
}
export const Tab = React.memo(_Tab);
