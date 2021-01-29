import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { Map, MapProps } from '.';

export default {
  title: 'ZeroHeight/Map',
  component: Map,
};

const Template: Story<MapProps> = (args) => <Map {...args} />;

const events = [
  {
    status: 'pending',
    event_name: 'Test Event',
    event_url: 'arduino.cc/test-event',
    organizer_name: 'Francesco Test',
    organizer_type: 'profit',
    organization_name: 'Arduino SRL',
    location: 'Toolbox Office, Via Agostino da Montefeltro, Torino, Metropolitan City of Turin, Italy',
    lat: '45.050238',
    lng: '7.669286',
    activity_list: 'talk|ask_expert|open_day',
    agenda_link: 'arduino.cc/test-event',
  },
  {
    status: 'confirmed',
    event_name: 'Test Event 1',
    event_url: 'arduino.cc/test-event',
    organizer_name: 'Francesco Test',
    organizer_type: 'official',
    organization_name: 'Arduino SRL',
    location: 'Toolbox Office, Via Agostino da Montefeltro, Torino, Metropolitan City of Turin, Italy',
    lat: '45.050238',
    lng: '11.669286',
    activity_list: 'talk|ask_expert|open_day',
    agenda_link: 'arduino.cc/test-event',
  },
];

export const Basic = Template.bind({});
Basic.args = {
  markers: events,
};
