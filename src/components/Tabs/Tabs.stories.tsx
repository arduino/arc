import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { TabList, TabListProps } from './TabList';
import { IconOperationListNormal, IconFileFileNormal, IconCommerceShoppingTagNormal } from '@bcmi-labs/react-icons';

export default {
  title: 'ZeroHeight/Tabs',
  component: TabList,
} as Meta;

const Template: Story<TabListProps> = (args: TabListProps) => <TabList {...args} />;

const baseArgs = {
  tabs: [
    {
      label: 'All Categories',
      id: 'tab1',
      icon: <IconOperationListNormal />,
      panel: <>All Categories</>,
    },
    {
      label: 'Pages',
      id: 'tab2',
      icon: <IconFileFileNormal />,
      panel: <>Loading</>,
      onSelected: (setContentHook) => {
        setContentHook(<>Dynamic Content</>);
      },
    },
    {
      label: 'Store',
      id: 'tab3',
      icon: <IconCommerceShoppingTagNormal />,
      panel: <>Store</>,
      onSelected: (setContentHook) => {
        setContentHook(<>Loading</>);
        setTimeout(() => {
          setContentHook(<>Content Loaded</>);
        }, 1000);
      },
    },
  ],
};

export const Basic = Template.bind({});
Basic.args = {
  ...baseArgs,
};

export const UncontrolledWithDefault = Template.bind({});
UncontrolledWithDefault.args = {
  ...baseArgs,
  defaultTab: 'tab2',
};

export const Controlled = Template.bind({});
Controlled.args = {
  ...baseArgs,
  selectedTab: 'tab3',
};
