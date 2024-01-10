/* eslint-disable no-bitwise */
/* eslint-disable eqeqeq */
/* eslint-disable no-trailing-spaces */
/* eslint-disable one-var */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable prefer-const */
/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { App } from '@capacitor/app';
import { AfterViewInit, Component, EventEmitter, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, ModalController, AlertController, AnimationController, IonModal, Platform, IonRefresher } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { StorageService } from 'src/app/core/storage/storage.service';
import { SettingsPage } from '../settings/settings.page';
import * as moment from 'moment';
import { DateConstant } from 'src/app/core/constant/date.constant';

import { AnimationService } from 'src/app/core/services/animation.service';
import { AppConfigService } from 'src/app/core/services/app-config.service';
import { environment } from 'src/environments/environment';
import { Parents } from 'src/app/core/model/parents';
import { Students } from 'src/app/core/model/students';
import { StudentDetailsPage } from '../my-students/student-details/student-details.page';
import { ParentsService } from 'src/app/core/services/parents.service';
import { StudentTapTracker, TapLogsService } from 'src/app/core/services/tap-logs.service';
import { StudentsService } from 'src/app/core/services/students.service';
import { PageLoaderService } from 'src/app/core/ui-service/page-loader.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  isLoading = false;
  currentUser: Parents;
  myStudents: StudentTapTracker[] = [];
  @ViewChild("moodModal") moodModal: IonModal;
  @ViewChild(IonRefresher)ionRefresher: IonRefresher;
  constructor(
    private platform: Platform,
    private router: Router,
    private authService: AuthService,
    private tapLogsService: TapLogsService,
    private studentsService: StudentsService,
    private modalCtrl: ModalController,
    private actionSheetController: ActionSheetController,
    private notificationService: NotificationService,
    private storageService: StorageService,
    private alertController: AlertController,
    private animationService: AnimationService,
    private appConfigService: AppConfigService,
    private parentsService: ParentsService,
    private pageLoaderService: PageLoaderService,
  ) {

    this.currentUser = this.storageService.getLoginUser();


    if(this.isAuthenticated) {
      this.initStudents();
    }
  }

  get today() {
    return new Date();
  }

  get env() {
    return environment.production ? 'PROD' : 'DEV';
  }

  get isAuthenticated() {
    const currentUser = this.storageService.getLoginUser();
    return currentUser &&
    currentUser?.parentCode &&
    currentUser?.user &&
    currentUser?.user?.userId;
  }

  get user() {
    return this.storageService.getLoginUser();
  }

  get totalUnreadNotification() {
    const total = this.storageService.getTotalUnreadNotif();
    return total && !isNaN(Number(total)) ? Number(total) : 0;
  }

  async initDashboard(){

  }

  ngOnInit() {
  }


  async onShowSettings() {

    if(!this.isAuthenticated) {
      this.authService.logout();
    }
    let modal: HTMLIonModalElement = null;
    modal = await this.modalCtrl.create({
      component: SettingsPage,
      cssClass: 'modal-fullscreen',
      backdropDismiss: false,
      canDismiss: true,
      enterAnimation: this.animationService.pushRightAnimation,
      leaveAnimation: this.animationService.leavePushRightAnimation,
      componentProps: { modal },
    });
    modal.present();
    modal.onDidDismiss().then(res=> {
      this.currentUser = this.storageService.getLoginUser();
    });
  }

  async initStudents() {
    this.isLoading = true;
    const currentUser = this.storageService.getLoginUser();
    const res = await this.tapLogsService.getStudentsTapsByParentCode(currentUser.parentCode, { date: moment().format("YYYY-MM-DD") }).toPromise();
    this.myStudents = res.data;
    this.isLoading = false;
    console.log(this.myStudents);
    if(this.ionRefresher) {
      this.ionRefresher.complete();
    }
  }

  async onShowStudentDetails(details: StudentTapTracker) {
    if(!this.isAuthenticated) {
      this.authService.logout();
    }
    await this.pageLoaderService.open('Loading please wait...');
    const res = await this.studentsService.getByCode(details.studentCode).toPromise();
    await this.pageLoaderService.close();
    let modal: any = null;
    const currentUser = this.storageService.getLoginUser();
    modal = await this.modalCtrl.create({
      component: StudentDetailsPage,
      cssClass: 'modal-fullscreen',
      backdropDismiss: false,
      canDismiss: true,
      enterAnimation: this.animationService.flyUpAnimation,
      leaveAnimation: this.animationService.leaveFlyUpAnimation,
      componentProps: { modal, currentUser, details: res.data },
    });
    modal.present();
  }

  ionViewWillEnter() {
    console.log('visited');
  }

  async doRefresh(){
    try {
      if(this.isLoading) {
        return;
      }
      this.myStudents = [];
      await this.initStudents();
    }catch(ex) {
      await this.presentAlert({
        header: 'Try again!',
        message: 'Error loading',
        buttons: ['OK']
      });
      if(this.ionRefresher) {
        this.ionRefresher.complete();
      }
    }
  }

  profilePicErrorHandler(event, type?) {
    if(!type || type === undefined) {
      event.target.src = '../../../assets/img/profile-not-found.svg';
    }
    else {
      event.target.src = '../../../assets/img/profile-not-found.svg';
    }
  }

  async presentAlert(options: any) {
    const alert = await this.alertController.create(options);
    await alert.present();
  }
}
