import React, { useCallback, useState } from 'react';
import classnames from 'classnames';

import { WithBemClasses } from '../utils';

import style from './tabs.module.scss';
import { TabPanel, TabPanelProps } from './TabPanel';
import { Tab, TabProps } from './Tab';

export interface ListTabProps
  extends Pick<TabProps, 'label' | 'icon' | 'id'>,
    Pick<TabPanelProps, 'onSelected' | 'onLeave'> {
  /** React Element with the content of the panel */
  panel: React.ReactElement;
}

export interface TabListProps extends WithBemClasses {
  tabs: ListTabProps[];

  /** Uncontrolled mode.
   * Set the tab with id === defaultTab to selected
   */
  defaultTab: string;

  /** When set, the Tab is in controlled mode.
   * Forces the tab with id === selectedTab to be the selected one
   */
  selectedTab: string;
}

function findIndexById(id: string, tabs): number {
  for (let i = 0; i < tabs.length; i++) {
    if (tabs[i].id === id) {
      return i;
    }
  }
  return 0;
}

/**
 * TabList
 */
export function TabList({ tabs, defaultTab, selectedTab, className }: TabListProps): React.ReactElement {
  // find the index position of the selected element in the array
  const selTabIndex = findIndexById(defaultTab, tabs);

  const controlledSelectedTab = selectedTab ? findIndexById(selectedTab, tabs) : null;

  const [selectedIndex, setselectedIndex] = useState(selTabIndex);

  const tabSelected = useCallback(
    (newTab: number) => {
      // if in controlled mode, can't change the selected tab
      if (controlledSelectedTab !== null) {
        return;
      }

      setselectedIndex(newTab);
    },
    [setselectedIndex, controlledSelectedTab]
  );

  const moveTab = useCallback(
    (dir: number) => {
      tabSelected((selectedIndex + (dir % tabs.length) + tabs.length) % tabs.length);
    },
    [selectedIndex, tabSelected, tabs]
  );

  const selectTab = useCallback(
    (id) => {
      tabSelected(findIndexById(id, tabs));
    },
    [tabs, tabSelected]
  );

  const tablistClasses = classnames(style.tablist, { [`${className}__tablist`]: !!className });

  return (
    <>
      <ul role="tablist" className={tablistClasses}>
        {tabs.map((tab, i) => {
          return (
            <Tab
              key={tab.id}
              {...tab}
              id={tab.id}
              moveTab={moveTab}
              selected={controlledSelectedTab !== null ? controlledSelectedTab === i : selectedIndex === i}
              selectTab={selectTab}
              className={className}
            />
          );
        })}
      </ul>
      {tabs.map((tab, i) => {
        return (
          <TabPanel
            key={tab.id}
            labelledBy={tab.id}
            id={`panel-${tab.id}`}
            selected={controlledSelectedTab !== null ? controlledSelectedTab === i : selectedIndex === i}
            className={className}
            onSelected={tab.onSelected}
            onLeave={tab.onLeave}
          >
            {tab.panel}
          </TabPanel>
        );
      })}
    </>
  );
}
