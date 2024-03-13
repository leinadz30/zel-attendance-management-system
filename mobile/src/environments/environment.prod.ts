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
  production: true,
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
  apiBaseUrl: 'https://zams-api.vercel.app/api/v1',
  oneSignalAppId: 'e72b9652-3594-4bd1-8f58-d01fc50d0b11',
};
