/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import OneSignalPlugin from 'onesignal-cordova-plugin';
import { environment } from 'src/environments/environment';
import { StorageService } from '../storage/storage.service';
import { UserOneSignalSubscriptionService } from './user-one-signal-subscription.service';
import { TapLogsService } from './tap-logs.service';
import { AuthService } from './auth.service';
import { ModalController } from '@ionic/angular';
import { AnimationService } from './animation.service';
import { StudentTimeInfoPage } from 'src/app/component/student-time-info/student-time-info.page';
import { PageLoaderService } from '../ui-service/page-loader.service';
import { forkJoin } from 'rxjs';
import { NotificationService } from './notification.service';
import { RequestInfoPage } from 'src/app/component/request-info/request-info.page';
import { LinkStudentRequestService } from './link-student-request.service';



@Injectable({
  providedIn: 'root'
})
export class OneSignalNotificationService {

  constructor(
    private storageService: StorageService,
    private tapLogsService: TapLogsService,
    private pageLoaderService: PageLoaderService,
    private modalCtrl: ModalController,
    private notificationService: NotificationService,
    private linkStudentRequestService: LinkStudentRequestService,
    private animationService: AnimationService,
    private authService: AuthService,
    private userOneSignalSubscriptionService: UserOneSignalSubscriptionService) { }


  get isAuthenticated() {
    const currentUser = this.storageService.getLoginUser();
    return currentUser &&
    currentUser?.parentCode &&
    currentUser?.user &&
    currentUser?.user?.userId;
  }

  async registerOneSignal() {
    // Uncomment to set OneSignal device logging to VERBOSE
    // OneSignal.Debug.setLogLevel(6);

    // Uncomment to set OneSignal visual logging to VERBOSE
    // OneSignal.Debug.setAlertLevel(6);

    // NOTE: Update the init value below with your OneSignal AppId.
    console.log('calling setAppId');
    OneSignalPlugin.setAppId(environment.oneSignalAppId);

    console.log('calling addSubscriptionObserver');
    OneSignalPlugin.addSubscriptionObserver(res=> {
      console.log('Subscription id ', res?.to?.userId);

      this.storageService.saveOneSignalSubscriptionId(res?.to?.userId);
      if(this.isAuthenticated) {
        const currentUser = this.storageService.getLoginUser();
        this.userOneSignalSubscriptionService.create({
          userId: currentUser?.user?.userId,
          firebaseToken: res?.to?.userId
        }).subscribe((res)=> {
          console.log('subscription saved');
        }, (err)=>{console.log('error saving subscription');console.log(err);});
      }
    });
    console.log('calling addPermissionObserver');
    OneSignalPlugin.addPermissionObserver(res=> {
      console.log('addPermissionObserver result', JSON.stringify(res));
    });

    OneSignalPlugin.setNotificationOpenedHandler(async res=> {
      console.log('setNotificationOpenedHandler result', JSON.stringify(res));
      console.log('received data from api : ' + JSON.stringify(res?.notification?.additionalData));
      const { type, referenceId } = res?.notification?.additionalData as any;
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
    });
    // OneSignalPlugin.addEventListener('click', async (event: any) => {
    //   const notificationData = JSON.stringify(event);
    //   console.log('Notification data : ' + notificationData);
    //   console.log('received data from api : ' + JSON.stringify(event?.notification?.additionalData));
    //   const { type, referenceId } = event?.notification?.additionalData;
    //   if(type.toString().toUpperCase() === 'ANNOUNCEMENT') {

    //   } else if(type === 'LINK_STUDENT') {
    //     if(!this.isAuthenticated) {
    //       this.authService.logout();
    //     }
    //     await this.pageLoaderService.open('Loading please wait...');
    //     const currentUser = this.storageService.getLoginUser();
    //     const [requestRes, notifRes] = await forkJoin([
    //       this.linkStudentRequestService.getByCode(referenceId),
    //       this.notificationService.getUnreadByUser(currentUser.user.userId),
    //     ]).toPromise();
    //     this.storageService.saveTotalUnreadNotif(notifRes.data);
    //     this.pageLoaderService.close();
    //     let modal: any = null;
    //     modal = await this.modalCtrl.create({
    //       component: RequestInfoPage,
    //       cssClass: 'modal-fullscreen',
    //       backdropDismiss: true,
    //       canDismiss: true,
    //       enterAnimation: this.animationService.flyUpAnimation,
    //       leaveAnimation: this.animationService.leaveFlyUpAnimation,
    //       componentProps: { modal, request: requestRes.data },
    //     });
    //     modal.present();
    //   } else if(type === 'STUDENT_LOGIN_LOGOUT' && referenceId && referenceId !== '') {
    //     if(!this.isAuthenticated) {
    //       this.authService.logout();
    //     }
    //     await this.pageLoaderService.open('Loading please wait...');
    //     const currentUser = this.storageService.getLoginUser();
    //     const [tapLogRes, notifRes] = await forkJoin([
    //       this.tapLogsService.getById(referenceId),
    //       this.notificationService.getUnreadByUser(currentUser.user.userId),
    //     ]).toPromise();
    //     this.storageService.saveTotalUnreadNotif(notifRes.data);
    //     this.pageLoaderService.close();
    //     let modal: any = null;
    //     modal = await this.modalCtrl.create({
    //       component: StudentTimeInfoPage,
    //       cssClass: 'modal-fullscreen',
    //       backdropDismiss: true,
    //       canDismiss: true,
    //       enterAnimation: this.animationService.flyUpAnimation,
    //       leaveAnimation: this.animationService.leaveFlyUpAnimation,
    //       componentProps: { modal, tapLog: tapLogRes.data },
    //     });
    //     modal.present();
    //   }
    // });


    // Prompts the user for notification permissions.
    //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 7) to better communicate to your users what notifications they will get.
    // OneSignalPlugin.Notifications.requestPermission(true).then((accepted: boolean) => {
    //   console.log('User accepted notifications: ' + accepted);
    // });

    // OneSignalPlugin.User.pushSubscription.addEventListener('change', (subscription) => {
    //   console.log('OneSignal: subscription changed:', JSON.stringify(subscription));
    //   this.storageService.saveOneSignalSubscriptionId(subscription.current.id);
    //   if(this.isAuthenticated) {
    //     const currentUser = this.storageService.getLoginUser();
    //     this.userOneSignalSubscriptionService.create({
    //       userId: currentUser?.user?.userId,
    //       firebaseToken: subscription.current.id
    //     }).subscribe((res)=> {
    //       console.log('subscription saved');
    //     }, (err)=>{console.log('error saving subscription');console.log(err);});
    //   }
    // });

  }
}
