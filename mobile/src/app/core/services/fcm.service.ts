/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
  PushNotification,
  PushNotificationActionPerformed,
  PushNotificationToken,
} from '@capacitor/push-notifications';
import { FCM } from '@capacitor-community/fcm';
import { StorageService } from '../storage/storage.service';
import { Capacitor } from '@capacitor/core';
import { Parents } from '../model/parents';
import { UserFirebaseTokenService } from './user-firebase-token.service';
import { Device } from '@capacitor/device';


@Injectable({
  providedIn: 'root'
})
export class FcmService {
  topic = 'announcements';
  currentUser: Parents;
  currentDeviceModel;
  constructor(
    private userFirebaseTokenService: UserFirebaseTokenService,
    private storageService: StorageService) {
      this.currentUser = this.storageService.getLoginUser();
      Device.getInfo().then(res=> {
        this.currentDeviceModel = res.model;
      });
    }

  get isAuthenticated() {
    const currentUser = this.storageService.getLoginUser();
    return currentUser &&
    currentUser?.parentCode &&
    currentUser?.user &&
    currentUser?.user?.userId;
  }

  init() {
    if (Capacitor.platform !== 'web') {
      //disable FCM Service but use Register push notif for Permission
      // this.delete();
    //   PushNotifications.createChannel({
    //    id: 'fcm_default_channel',
    //    name: 'ZamsConnect',
    //    importance: 5,
    //    visibility: 1,
    //    lights: true,
    //    vibration: true,
    //    sound: 'notif_alert'
    //  });
     this.registerPushNotif();
    }
  }

  registerPushNotif() {
    this.currentUser = this.storageService.getLoginUser();

    PushNotifications.requestPermissions().then((permission) => {
      PushNotifications.register();
      if (permission.receive) {
        // Register with Apple / Google to receive push via APNS/FCM
      } else {
        // No permission for push granted
      }
    });


    // // now you can subscribe to a specific topic
    // FCM.subscribeTo({ topic: this.topic })
    //   .then((r) => console.log(`subscribed to topic`))
    //   .catch((err) => {console.log('error subscribing to topic');console.log(err);});

    // PushNotifications.addListener(
    //   'registration',
    //   (token: PushNotificationToken) => {
    //     this.storageService.saveFirebaseToken(token.value);
    //     if(this.isAuthenticated) {
    //       this.userFirebaseTokenService.create({
    //         userId: this.currentUser?.user?.userId,
    //         firebaseToken: token.value,
    //         device: this.currentDeviceModel
    //       }).subscribe((res)=> {
    //         console.log('firebase token saved');
    //       }, (err)=>{console.log('error saving firebase token');console.log(err);});
    //     }
    //   }
    // );

    // PushNotifications.addListener('registrationError', (error: any) => {
    //   console.log('Error: ' + JSON.stringify(error));
    // });

    // PushNotifications.addListener(
    //   'pushNotificationReceived',
    //   async (notification: PushNotification) => {
    //     console.log('Push received: ' + JSON.stringify(notification));
    //   }
    // );

    // PushNotifications.addListener(
    //   'pushNotificationActionPerformed',
    //   async (notification: PushNotificationActionPerformed) => {
    //     const data = notification.notification.data;
    //     console.log('Action performed: ' + JSON.stringify(notification.notification));
    //     if (data.detailsId) {
    //       // this.router.navigateByUrl(`/home/${data.detailsId}`);
    //     }
    //   }
    // );
  }


  delete() {
    if (Capacitor.platform !== 'web') {

      // Remove FCM instance
      FCM.deleteInstance()
        .then(() => console.log(`Token deleted`))
        .catch((err) => {console.log('error deleting instance token');console.log(err);});

      // Unsubscribe from a specific topic
      FCM.unsubscribeFrom({ topic: this.topic })
      .then(() => console.log(`unsubscribed from topic`))
      .catch((err) => {console.log('error unsubscribing topic');console.log(err);});
    }
  }


}
