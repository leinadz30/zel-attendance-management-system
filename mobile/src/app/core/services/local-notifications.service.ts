/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { PusherService } from '../services/pusher.service';
import { StorageService } from '../storage/storage.service';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class LocalNotificationsService {

  constructor(
    private storageService: StorageService,
    private pusherService: PusherService) { }


  get isAuthenticated() {
    const currentUser = this.storageService.getLoginUser();
    return currentUser &&
    currentUser?.parentCode &&
    currentUser?.user &&
    currentUser?.user?.userId;
  }

  init() {
    // adding the listener

    if(this.isAuthenticated) {
      this.storageService.saveReceivedNotification([]);
      const currentUser = this.storageService.getLoginUser();
      const channelUser = this.pusherService.init(currentUser.user.userId);
      channelUser.bind('notifAdded', async (res: { title: string; description: string;notificationIds: string[]}) => {
        console.log('notifAdded received....', JSON.stringify(res));
        setTimeout(async ()=> {
          let receivedNotif = this.storageService.getReceivedNotification();
          if(!receivedNotif || receivedNotif === undefined) { receivedNotif = []};
          console.log('Current local notif....', JSON.stringify(receivedNotif));
          const { title, description, notificationIds } = res;
          console.log('New local notif....', JSON.stringify(receivedNotif));
          if(Capacitor.platform !== 'web' && !receivedNotif.some(x=>notificationIds.some(i => x === i))) {
            receivedNotif = [...receivedNotif, ...notificationIds ];
            this.storageService.saveReceivedNotification(receivedNotif);
            console.log('Creating notif....');
            const notifs = await LocalNotifications.schedule({
              notifications: [
                {
                  title,
                  body: description,
                  id: 1,
                  sound: 'notif_alert.wav',
                },
              ],
            });
          }
        }, 5000);
      });
    }
    LocalNotifications.addListener('localNotificationActionPerformed', (payload) => {
      // triggers when the notification is clicked.
      console.log('local notifications data: ', JSON.stringify(payload.notification));
    });
  }
}
