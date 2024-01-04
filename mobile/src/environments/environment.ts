// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  pusher: {
    key: '1ad4b93854243ae307e6',
    cluster: 'ap1',
  },
  apiBaseUrl: 'http://192.168.254.140:3000/api/v1',
  oneSignalAppId: 'e72b9652-3594-4bd1-8f58-d01fc50d0b11'
  // // apiBaseUrl: 'http://192.168.195.221:3000/api/v1'
  // apiBaseUrl: 'http://localhost:3000/api/v1'
  // apiBaseUrl: 'https://zams-stage-api.vercel.app/api/v1'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
