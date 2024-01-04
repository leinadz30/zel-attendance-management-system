/* eslint-disable @typescript-eslint/member-ordering */
import { TapLogs } from './../../../core/model/tap-logs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Parents } from 'src/app/core/model/parents';
import { Students } from 'src/app/core/model/students';
import { TapLogsService } from 'src/app/core/services/tap-logs.service';
import { StorageService } from 'src/app/core/storage/storage.service';
import * as moment from 'moment';
import { AuthService } from 'src/app/core/services/auth.service';
import { IonRefresher, ModalController } from '@ionic/angular';
import { AnimationService } from 'src/app/core/services/animation.service';
import { TimelinePage } from '../../timeline/timeline.page';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.page.html',
  styleUrls: ['./student-details.page.scss'],
})
export class StudentDetailsPage implements OnInit {
  modal;
  currentUser: Parents;
  details: Students;
  isLoading = false;
  error: any;
  tapLogs: TapLogs[] = [];
  @ViewChild(IonRefresher)ionRefresher: IonRefresher;
  constructor(
    private authService: AuthService,
    private modalCtrl: ModalController,
    private tapLogsService: TapLogsService,
    private animationService: AnimationService,
    private storageService: StorageService) { }

  get today() {
    return new Date();
  }

  get courseStrand() {
    if(this.details && this.details.schoolYearLevel?.educationalStage === 'COLLEGE') {
      return this.details?.studentCourse?.course?.name;
    } else if(this.details && this.details.schoolYearLevel?.educationalStage === 'SENIOR') {
      return this.details?.studentStrand?.strand?.name;
    } else {
      return null;
    }
  }

  get isAuthenticated() {
    const currentUser = this.storageService.getLoginUser();
    return currentUser &&
    currentUser?.parentCode &&
    currentUser?.user &&
    currentUser?.user?.userId;
  }


  ngOnInit() {
    this.initTapLogs(this.details?.studentCode);
  }
  async initTapLogs(studentCode){
    this.isLoading = true;
    this.tapLogsService.getStudentsTapsByStudentCode(studentCode,{date: moment().format('YYYY-MM-DD')}).subscribe(res=> {
      this.tapLogs = [ ...this.tapLogs, ...res.data ];
      if(this.ionRefresher) {
        this.ionRefresher.complete();
      }
      this.isLoading = false;
    });
  }

  async onShowDailyTapActivity() {
    if(!this.isAuthenticated) {
      this.authService.logout();
    }
    let modal: any = null;
    modal = await this.modalCtrl.create({
      component: TimelinePage,
      cssClass: 'modal-fullscreen',
      backdropDismiss: false,
      canDismiss: true,
      enterAnimation: this.animationService.pushLeftAnimation,
      leaveAnimation: this.animationService.leavePushLeftAnimation,
      componentProps: { modal, currentUser: this.currentUser, student: this.details  },
    });
    modal.present();
  }

  async doRefresh() {
    try {
      if(this.isLoading) {
        return;
      }
      this.tapLogs = [];
      await this.initTapLogs(this.details?.studentCode);
    }catch(ex) {
      if(this.ionRefresher) {
        this.ionRefresher.complete();
      }
    }
  }

  close() {
    this.modal.dismiss(null, 'cancel');
  }

}
