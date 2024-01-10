/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { PusherService } from '../services/pusher.service';
import { StorageService } from '../storage/storage.service';
import { Capacitor } from '@capacitor/core';
import { forkJoin } from 'rxjs';
import { RequestInfoPage } from 'src/app/component/request-info/request-info.page';
import { StudentTimeInfoPage } from 'src/app/component/student-time-info/student-time-info.page';
import { AuthService } from './auth.service';
import { PageLoaderService } from '../ui-service/page-loader.service';
import { ModalController } from '@ionic/angular';
import { LinkStudentRequestService } from './link-student-request.service';
import { NotificationService } from './notification.service';
import { AnimationService } from './animation.service';
import { TapLogsService } from './tap-logs.service';

@Injectable({
  providedIn: 'root'
})
export class LocalNotificationsService {

  constructor(
    private authService: AuthService,
    private pageLoaderService: PageLoaderService,
    private modalCtrl: ModalController,
    private storageService: StorageService,
    private notificationService: NotificationService,
    private animationService: AnimationService,
    private tapLogsService: TapLogsService,
    private linkStudentRequestService: LinkStudentRequestService,
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
      channelUser.bind('notifAdded', async (res: { title: string; description: string;notificationIds: string[]; referenceId: string; type: string}) => {
        console.log('notifAdded received....', JSON.stringify(res));
        setTimeout(async ()=> {
          let receivedNotif = this.storageService.getReceivedNotification();
          if(!receivedNotif || receivedNotif === undefined) { receivedNotif = [];};
          console.log('Current local notif....', JSON.stringify(receivedNotif));
          const { title, description, notificationIds, referenceId, type } = res;
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
                  extra: {
                    referenceId,
                    type,
                  }
                },
              ],
            });
          }
        }, 5000);
      });
    }
    LocalNotifications.addListener('localNotificationActionPerformed', async (payload) => {
      // triggers when the notification is clicked.
      console.log('local notifications data: ', JSON.stringify(payload));
      if(payload?.notification?.extra) {
        const { type, referenceId } = payload?.notification?.extra;
        if(type.toString().toUpperCase() === 'ANNOUNCEMENT') {

        } else if(type === 'LINK_STUDENT') {
          if(!this.isAuthenticated) {
            this.authService.logout();
          }
          await this.pageLoaderService.open('Loading please wait...');
          const currentUser = this.storageService.getLoginUser();
          const [requestRes, notifRes] = await forkJoin([
            this.linkStudentRequestService.getByCode(referenceId),
            this.notificationService.getUnreadByUser(currentUser.user.userId),
          ]).toPromise();
          this.storageService.saveTotalUnreadNotif(notifRes.data);
          this.pageLoaderService.close();
          let modal: any = null;
          modal = await this.modalCtrl.create({
            component: RequestInfoPage,
            cssClass: 'modal-fullscreen',
            backdropDismiss: true,
            canDismiss: true,
            enterAnimation: this.animationService.flyUpAnimation,
            leaveAnimation: this.animationService.leaveFlyUpAnimation,
            componentProps: { modal, request: requestRes.data },
          });
          modal.present();
        } else if(type === 'STUDENT_LOGIN_LOGOUT' && referenceId && referenceId !== '') {
        if(!this.isAuthenticated) {
          this.authService.logout();
        }
        await this.pageLoaderService.open('Loading please wait...');
        const currentUser = this.storageService.getLoginUser();
        const [tapLogRes, notifRes] = await forkJoin([
          this.tapLogsService.getById(referenceId),
          this.notificationService.getUnreadByUser(currentUser.user.userId),
        ]).toPromise();
        console.log('Tap data: ', JSON.stringify(tapLogRes.data));
        this.storageService.saveTotalUnreadNotif(notifRes.data);
        this.pageLoaderService.close();
        let modal: any = null;
        modal = await this.modalCtrl.create({
          component: StudentTimeInfoPage,
          cssClass: 'modal-fullscreen',
          backdropDismiss: true,
          canDismiss: true,
          enterAnimation: this.animationService.flyUpAnimation,
          leaveAnimation: this.animationService.leaveFlyUpAnimation,
          componentProps: { modal, tapLog: tapLogRes.data },
        });
        modal.present();
        }
      }
    });
  }
}
