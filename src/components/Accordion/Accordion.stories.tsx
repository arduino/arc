import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { AccordionList, AccordionListProps } from './AccordionList';
import { IconCommerceShoppingTagNormal } from '@bcmi-labs/react-icons';

export default {
  title: 'ZeroHeight/AccordionList',
  component: AccordionList,
} as Meta;

const Template: Story<AccordionListProps> = (args: AccordionListProps) => <AccordionList {...args}></AccordionList>;

const baseArgs = {
  accordions: [
    {
      label: 'Accordion One',
      id: 'acc1',
      panel: <>Accordion One Content</>,
    },
    {
      label: 'Accordion Two (Default Open)',
      id: 'acc2',
      panel: <>Loading</>,
      iconPosition: 'right',
      defaultExpanded: true,
      onExpand: (setContentHook) => {
        setContentHook(<>Accordion Two Content</>);
      },
    },

    {
      label: 'Accordion Three',
      id: 'acc3',
      icon: <IconCommerceShoppingTagNormal />,
      panel: <>Loading Accordion Three</>,
      iconPosition: 'right',
      onExpand: (setContentHook) => {
        setContentHook(<>Loading</>);
        setTimeout(() => {
          setContentHook(<>Accordion Three Content</>);
        }, 1000);
      },
      onCollapse: (setContentHook) => {
        setContentHook(<>Content Unloaded</>);
      },
    },

    {
      label: 'Accordion - Controlled Open',
      id: 'acc-controlled-open',
      isExpanded: true,
      panel: <>Cannot be closed</>,
    },
    {
      label: 'Accordion - Controlled Closed (Disabled)',
      id: 'acc-controlled-closed',
      isExpanded: false,
      panel: <>Accordion Disabled</>,
    },
  ],
};

export const Basic = Template.bind({});
Basic.args = {
  ...baseArgs,
};
