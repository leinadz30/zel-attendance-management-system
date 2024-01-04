/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/prefer-for-of */
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AlertController, IonModal, IonRefresher, ModalController, Platform } from '@ionic/angular';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';
import { DateConstant } from 'src/app/core/constant/date.constant';
import { AuthService } from 'src/app/core/services/auth.service';
import { StorageService } from 'src/app/core/storage/storage.service';
import { AnimationService } from 'src/app/core/services/animation.service';
import { Parents } from 'src/app/core/model/parents';
import { TapLogsService } from 'src/app/core/services/tap-logs.service';
import { Students } from 'src/app/core/model/students';
import { TapLogs } from 'src/app/core/model/tap-logs';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss'],
})
export class TimelinePage implements OnInit {
  isLoading = false;
  currentUser: Parents;
  student: Students;
  currentSelected = new Date().toISOString();
  maxDatePicker = new Date();
  weeks: {date: Date; isCurrent(date: Date): boolean; enabled(date: Date): boolean}[] = [];
  selectDateCtrl = new FormControl(null);
  data: TapLogs[] = [];
  animation: {
    enterAnimation;
    leaveAnimation;
  } = {} as any;
  @ViewChild(IonRefresher)ionRefresher: IonRefresher;
  constructor(
    private platform: Platform,
    private modalCtrl: ModalController,
    private authService: AuthService,
    private tapLogsService: TapLogsService,
    private animationService: AnimationService,
    private alertController: AlertController,
    private storageService: StorageService) {
      this.generateWeeks(this.currentSelected);
      console.log(this.weeks);
     }



  get isAuthenticated() {
    const currentUser = this.storageService.getLoginUser();
    return currentUser &&
    currentUser?.user &&
    currentUser?.user?.userId;
  }

  async onDatePickerChange(event) {
    this.generateWeeks(new Date(event.detail.value));
    await this.loadData();
  }

  async ngOnInit() {
    await this.loadData();
  }

  async prevDate(){
    const currentDate = new Date(this.currentSelected);
    const newDate = new Date(currentDate.setDate(currentDate.getDate() - 1));
    this.currentSelected = newDate.toISOString();
    this.generateWeeks(newDate);
    await this.loadData();
  }

  async nextDate(){
    const currentDate = new Date(this.currentSelected);
    const newDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    this.currentSelected = newDate.toISOString();
    this.generateWeeks(newDate);
    await this.loadData();
  }

  async selectDate(date) {
    this.currentSelected = new Date(date).toISOString();
    this.generateWeeks(date);
    await this.loadData();
  }

  get isNextEnable() {
    const today = new Date(moment(new Date()).format("YYYY-MM-DD"));
    const current = new Date(moment(this.currentSelected).format("YYYY-MM-DD"));
    const enabled = today > current;
    return enabled;
  }


  generateWeeks(date) {
    this.weeks = Array(7).fill(moment(date).format("YYYY-MM-DD")).map((el, idx) => {
      const date = moment(new Date(new Date(el).setDate(new Date(el).getDate() - new Date(el).getDay() + idx))).format("YYYY-MM-DD");
      return {
        date: new Date(date),
        moodEntityId: null,
        isCurrent: (d: Date)=> {
          return moment(d).format("YYYY-MM-DD") === moment(this.currentSelected).format("YYYY-MM-DD");
        },
        enabled: (d: Date) => {
          const today = new Date(moment(new Date()).format("YYYY-MM-DD"));
          const current = new Date(moment(d).format("YYYY-MM-DD"));
          const enabled = today >= current && moment(d).format("YYYY-MM-DD") !== moment(this.currentSelected).format("YYYY-MM-DD");
          return enabled;
        }
      };
    });
  }

  async loadData() {
    this.isLoading = true;
    const res = await this.tapLogsService
    .getStudentsTapsByStudentCode(this.student.studentCode, { date: moment(this.currentSelected).format("YYYY-MM-DD")})
    .toPromise();
    this.data = res.data;
    this.isLoading = false;
  }

  async doRefresh(){
    try {

      await this.loadData().finally(()=> {

        if(this.ionRefresher) {
          this.ionRefresher.complete();
        }
      });
    }catch(ex) {
      await this.presentAlert({
        header: 'Try again!',
        message: 'Error loading timeline',
        buttons: ['OK']
      });
      if(this.ionRefresher) {
        this.ionRefresher.complete();
      }
    }
  }

  async openDetails(details) {
    console.log(details);

    // if(!this.isAuthenticated) {
    //   this.authService.logout();
    // }
    // this.selectedDetails = details;
    // this.journalDetailsModal.present();
  }

  close() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  async presentAlert(options: any) {
    const alert = await this.alertController.create(options);
    await alert.present();
  }
}
