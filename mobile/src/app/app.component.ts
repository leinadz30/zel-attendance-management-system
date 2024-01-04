
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { Plugins } from '@capacitor/core';
import { Component, OnInit, Optional } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController, IonRouterOutlet, ModalController, Platform } from '@ionic/angular';
import { AuthService } from './core/services/auth.service';
import { StorageService } from './core/storage/storage.service';
import { Capacitor } from '@capacitor/core';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { Style } from '@capacitor/status-bar';
import { environment } from 'src/environments/environment';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';


import { Device } from '@capacitor/device';
import { FcmService } from './core/services/fcm.service';
import { App } from '@capacitor/app';
import { UserFirebaseTokenService } from './core/services/user-firebase-token.service';
import { OneSignalNotificationService } from './core/services/one-signal-notification.service';
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
    private userFirebaseTokenService: UserFirebaseTokenService,
    private route: ActivatedRoute,
    private router: Router,
    private modalCtrl: ModalController,
    private actionSheetController: ActionSheetController,
    private storageService: StorageService,
    private fcmService: FcmService,
    private oneSignalNotificationService: OneSignalNotificationService,
    private androidPermissions: AndroidPermissions,
    @Optional() private routerOutlet?: IonRouterOutlet
  ) {

    Device.getInfo().then(res=> {
      this.currentDeviceModel = res.model;
    });


    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    );

    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);

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
      if (Capacitor.platform !== 'web') {
        await this.oneSignalNotificationService.registerOneSignal();
      }
    });
  }


  async presentAlert(options: any) {
    const alert = await this.alertController.create(options);
    await alert.present();
  }
}
