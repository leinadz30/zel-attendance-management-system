// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  versions: {
    android: {
      version: 4,
      build: 4,
    },
    ios: {
      version: 4,
      build: 4,
    },
  },
  market: {
    ios: 'itms-apps://appstore.com/zamsconnect',
    android: 'https://play.google.com/store/apps/details?id=com.zel.zamsconnect',
  },
  production: false,
  pusher: {
    key: '1ad4b93854243ae307e6',
    cluster: 'ap1',
  },
  inAppKeys: {
    tapAlert: 'tap-alert',
    linkStudent: 'link-student',
    announcement: 'announcement',
    appUpdate: 'app-update'
  },
  apiBaseUrl: 'http://192.168.254.140:3000/api/v1',
  oneSignalAppId: '81441ee0-49ed-4d78-a6e8-71d691176697'
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
