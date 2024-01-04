/* eslint-disable @typescript-eslint/member-ordering */
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { StorageService } from '../core/storage/storage.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.page.html',
  styleUrls: ['./navigation.page.scss'],
})
export class NavigationPage implements OnInit, OnDestroy {
  currentUser: any;
  active = '';
  // totalUnreadNotification = 0;
  constructor(
    private storageService: StorageService,
    private alertController: AlertController) {
      this.currentUser = this.storageService.getLoginUser();
    }

  get totalUnreadNotification() {
    const total = this.storageService.getTotalUnreadNotif();
    return total? Number(total) : 0;
  }


  ngOnInit() {
    //start session
    // this.sessionActivityService.stop();
    // this.sessionActivityService.start();
  }
  ngOnDestroy() {
    //stop session
  }

  ionViewWillLeave(){
  }

  onTabsWillChange(event) {
    this.active = event.tab;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @HostListener('click', ['$event.target']) onClick(e) {
  }

  async presentAlert(options: any) {
    const alert = await this.alertController.create(options);
    await alert.present();
  }
}
