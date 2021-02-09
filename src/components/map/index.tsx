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
  agenda_link: string;
  phone_number: string;
  organization_name: string;
  organization_url: string;
  status: string;
};
export type MapProps = { height: string; markers: Marker[]; scrollWheelZoom: false; minZoom: number };

function addhttp(url) {
  if (typeof url === 'undefined' || url === null) {
    return null;
  }

  // add protocol if missing
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
    url = 'http://' + url;
  }

  // check if the url is a valid and return it
  if (
    /(https?:\/\/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9])(:?\d*)\/?([a-z_\/0-9\-#.]*)\??([a-z_\/0-9\-#=&]*)/g.test(
      url
    )
  ) {
    url = encodeURI(url);
    return url;
  }

  // not a valid url, return null
  return null;
}

/**
 * ArduinoDay Map
 */
export function Map({
  height = '450px',
  markers = [],
  scrollWheelZoom = false,
  minZoom = 1,
}: MapProps): React.ReactElement {
  useEffect(() => {
    // create map
    const map = L.map('map', {
      minZoom,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }),
      ],
      scrollWheelZoom,
    });

    map.setView([0, 0], 1);

    if (!scrollWheelZoom) {
      map.on('click', function () {
        if (map.scrollWheelZoom.enabled()) {
          map.scrollWheelZoom.disable();
        } else {
          map.scrollWheelZoom.enable();
        }
      });
    }

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
        .map((act) => activitiesMap[act] || null)
        .filter((act) => act !== null)
        .join(', ');

      let template = '';
      let icon;
      const eventData = {
        '%organizer%': eventItem.organizer_name,
        '%formatted_address%': eventItem.location || '',
        '%activities%': activities.length > 0 ? activities : '',
        '%agenda_link%': addhttp(eventItem.agenda_link) || '#',
        '%user_organization_link%': addhttp(eventItem.organization_url) || '#',
      };

      console.log(eventItem.organization_url, eventItem.agenda_link);

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