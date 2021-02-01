import React, { useEffect } from 'react';

import L from 'leaflet';
import 'leaflet.markercluster';

import { COMMUNITY_TEMPLATE, OFFICIAL_TEMPLATE, PENDING_DESCRIPTION } from './markers-message-template';

import pin_blue from './pin-blue.png';
import pin_orange from './marker-maker.png';
import pin_orange_temp from './marker-TBC.png';
import pin_shadow from './pin-shadow.png';

import './map.scss';

const activitiesMap = {
  open_day: 'Open Day',
  show_and_tell: 'Show-and-Tell',
  workshop: 'Workshop and Live Demo',
  talk: 'Talk',
  ask_expert: 'Ask the Arduino Expert',
  hackathon: 'Hackathon',
};

export type Marker = {
  event_name: string;
  event_url: string;
  organizer_name: string;
  organizer_url: string;
  organizer_type: string;
  location: string;
  lat: number;
  lng: number;
  activity_list: string;
  agenda: string;
  phone_number: string;
  organization_name: string;
  organization_url: string;
  status: string;
};
export type MapProps = { height: string; markers: Marker[] };

/**
 * ArduinoDay Map
 */
export function Map({ height = '450px', markers = [] }: MapProps): React.ReactElement {
  useEffect(() => {
    // create map
    const map = L.map('map', {
      minZoom: 1,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }),
      ],
    });

    map.setView([0, 0], 1);

    // define icons
    const icons = {
      defaultIcon: {},
      // official event
      blueIcon: {
        iconUrl: pin_blue,
        shadowUrl: pin_shadow,
        iconSize: [38, 53], // size of the icon
        shadowSize: [39, 53], // size of the shadow
        popupAnchor: [1, -16], // point from which the popup should open relative to the iconAnchor
        iconAnchor: [15, 40], // icon position
      },
      // community event, approved
      orangeIcon: {
        iconUrl: pin_orange,
        shadowUrl: pin_shadow,
        iconSize: [38, 53],
        shadowSize: [39, 53],
        popupAnchor: [1, -16],
        iconAnchor: [15, 40],
      },
      // community event, pre-approved/pending
      lightOrangeIcon: {
        iconUrl: pin_orange_temp,
        shadowUrl: pin_shadow,
        iconSize: [38, 53],
        shadowSize: [39, 53],
        popupAnchor: [1, -16],
        iconAnchor: [15, 40],
      },
    };

    const markersCluster = L.markerClusterGroup();

    for (let e = 0; e < markers.length; e++) {
      const eventItem = markers[e];

      activitiesMap;

      // load activities
      const activities = eventItem.activity_list
        .split('|')
        .map((act) => activitiesMap[act] || 'Unknown Activity')
        .join(', ');

      let template = '';
      let icon;
      const eventData = {
        '%organizer%': eventItem.organizer_name,
        '%formatted_address%': eventItem.location,
        '%activities%': activities,
        '%agenda_link%': eventItem.agenda,
        '%user_organization_link%': eventItem.organization_url || null,
      };

      if (eventItem.organizer_type === 'official') {
        icon = icons.blueIcon;
        template = OFFICIAL_TEMPLATE.replace(/%\w+%/g, function (all) {
          return all in eventData ? eventData[all] : all;
        });
      } else if (eventItem.status.toLowerCase() === 'pre-approved') {
        icon = icons.lightOrangeIcon;
        template = PENDING_DESCRIPTION.replace(/%\w+%/g, function (all) {
          return all in eventData ? eventData[all] : all;
        });
      } else {
        template = COMMUNITY_TEMPLATE.replace(/%\w+%/g, function (all) {
          return all in eventData ? eventData[all] : all;
        });
        icon = icons.orangeIcon;
      }

      const marker = L.marker([eventItem.lat, eventItem.lng], { icon: L.icon(icon) });

      marker.bindPopup(template).openPopup();

      markersCluster.addLayer(marker);
    }

    map.addLayer(markersCluster);
  }, [markers]);

  return (
    <div className="map-container">
      <div id="map" style={{ height }}></div>
    </div>
  );
}
