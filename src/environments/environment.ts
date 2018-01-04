// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: 'api',
  authorizationEndpoint: 'https://i.centr.by/oauth/token',
  authorizationCliendId: '8a8dbd75e60440ab94c2da5911d88f7a'
};
