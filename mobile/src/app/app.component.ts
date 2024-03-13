/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable space-before-function-paren */

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { Plugins } from '@capacitor/core';
import { Component, OnInit, Optional } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController, AlertOptions, IonRouterOutlet, ModalController, Platform } from '@ionic/angular';
import { AuthService } from './core/services/auth.service';
import { StorageService } from './core/storage/storage.service';
import { Capacitor } from '@capacitor/core';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';


import { Device } from '@capacitor/device';
import { FcmService } from './core/services/fcm.service';
import { App } from '@capacitor/app';
import { OneSignalNotificationService } from './core/services/one-signal-notification.service';
import { LocalNotificationsService } from './core/services/local-notifications.service';
import { AppReleaseService } from './core/services/app-release.service';
import { environment } from 'src/environments/environment';
import { AppRelease } from './core/model/app-release.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  currentDeviceModel;
  constructor(
    private platform: Platform,
    private alertController: AlertController,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private modalCtrl: ModalController,
    private actionSheetController: ActionSheetController,
    private storageService: StorageService,
    private fcmService: FcmService,
    private oneSignalNotificationService: OneSignalNotificationService,
    private androidPermissions: AndroidPermissions,
    private appReleaseService: AppReleaseService,
    private localNotificationsService: LocalNotificationsService,
    @Optional() private routerOutlet?: IonRouterOutlet
  ) {

    Device.getInfo().then(res=> {
      this.currentDeviceModel = res.model;
    });

    this.platform.backButton.subscribeWithPriority(10, async () => {
      const modal = await this.modalCtrl.getTop();
      const activeSheet = await this.actionSheetController.getTop();
      if (modal) {
          modal.dismiss();
      } else if(activeSheet) {
        activeSheet.dismiss();
      }else {
        const actionSheet = await this.actionSheetController.create({
          buttons: [
            {
              text: 'Minimize the app?',
              handler: async () => {
                App.minimizeApp();
                actionSheet.dismiss();
              },
            },
            {
              text: 'Close the app?',
              handler: async () => {
                App.exitApp();
                actionSheet.dismiss();
              },
            },
            {
              text: 'Cancel',
              handler: async () => {
                actionSheet.dismiss();
              },
            },
          ],
        });
        await actionSheet.present();
      }
    });
  }

  get _router() {
    return this.router;
  }

  get isAuthenticated() {
    const currentUser = this.storageService.getLoginUser();
    return currentUser &&
    currentUser?.parentCode &&
    currentUser?.user &&
    currentUser?.user?.userId;
  }

  async ngOnInit() {
    this.platform.ready().then(async () => {
      let platform = Capacitor.getPlatform();
      platform = platform.toLowerCase();
      if (platform !== 'web') {
        await this.fcmService.registerPushNotif();
        await this.localNotificationsService.init();
        await this.oneSignalNotificationService.registerOneSignal();
        let latestRelease: AppRelease;
        if(platform === 'android') {
          const result = await this.appReleaseService.getLatestVersion('A').toPromise();
          latestRelease = result?.data;
        } else if(platform === 'ios') {
          const result = await this.appReleaseService.getLatestVersion('I').toPromise();
          latestRelease = result?.data;
        }
        if(latestRelease && (latestRelease.appVersion !== environment.versions[platform]?.version?.toString() || latestRelease.appBuild !== environment.versions[platform].build?.toString())) {
          await this.presentAlert({
            header: 'New Version Update!',
            message: 'New Version is available on play store. Please update your ZamsConnect App to get the latest features.',
            buttons: [{
              text: 'Update now',
              handler: () => {
                window.open(environment.market[platform]);
              }
            }],
            backdropDismiss: false
          });
        }
      }
    });
  }
  async presentAlert(options: AlertOptions) {
    const alert = await this.alertController.create(options);
    await alert.present();
  }
}
