import * as L from 'leaflet';

export const environment = {
  production: false,
  apiUrl: 'api',

  authorizationEndpoint: 'https://i.centr.by/oauth2',
  redirectUrl: 'https://i.centr.by/rdview',
  postLogoutRedirectUrl: 'https://i.centr.by/rdview',
  postLoginRoute: 'https://i.centr.by/rdview',
  clientId: 'rdview_implicit',
  maxTokenOffsetInSeconds: 300,

  mapDefaultZoom: 6,
  mapDefaultCenter: L.latLng(53.5, 28),
  mapBounds: L.latLngBounds(L.latLng(40, 10), L.latLng(70, 50)),
  mapTitleLayerUrlTemplate: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  mapTitleLayerAttribution: '&copy;&nbsp;<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors,&nbsp;'
};
