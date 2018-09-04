// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import * as L from 'leaflet';

export const environment = {
  production: false,
  apiUrl: 'api/v1.1',

  authorizationEndpoint: 'https://i.centr.by/oauth2',
  redirectUrl: 'http://localhost:4200',
  postLogoutRedirectUrl: 'http://localhost:4200',
  postLoginRoute: 'http://localhost:4200',
  clientId: 'rdview_implicit',
  maxTokenOffsetInSeconds: 300,

  mapDefaultZoom: 6,
  mapDefaultCenter: L.latLng(53.5, 28),
  mapBounds: L.latLngBounds(L.latLng(40, 10), L.latLng(70, 50)),
  mapTitleLayerUrlTemplate: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  mapTitleLayerAttribution: '&copy;&nbsp;<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors,&nbsp;',

  logvisitUrl: 'https://i.centr.by/auth-statistics/api/v1/logvisit',
  appCode: 16036
};
