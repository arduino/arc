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
    status: 'confirmed',
    event_name: 'Test Event Confirmed',
    event_url: 'www.arduino.cc/test-event',
    organizer_name: 'Francesco Test Confirmed',
    organizer_type: 'profit',
    organization_name: 'Arduino SRL',
    organization_url: 'arduino.cc/test-event',
    location: 'Toolbox Office, Via Agostino da Montefeltro, Torino, Metropolitan City of Turin, Italy',
    lat: '45.050238',
    lng: '7.669286',
    activity_list: 'talk|ask_expert|open_day',
    agenda_link: 'arduino.cc/test-event',
  },
  {
    status: 'confirmed',
    event_name: 'evento di test',
    event_url: 'url finto',
    organizer_name: 'francesco org',
    organizer_type: 'foundation',
    organization_name: 'francesco org',
    organization_url: "non ce l'ho",
    location: 'Cairo, Egypt',
    lat: '30.0444196',
    lng: '31.2357116',
    activity_list: 'workshop',
    agenda_link: "non ce l'ho",
  },
];

export const Basic = Template.bind({});
Basic.args = {
  markers: events,
};
