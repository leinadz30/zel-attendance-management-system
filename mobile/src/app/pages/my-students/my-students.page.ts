/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Capacitor } from '@capacitor/core';
import { Component, ViewChild } from '@angular/core';
import { AlertController, AlertOptions, IonRefresher, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { LinkStudentRequest } from 'src/app/core/model/link-student-request';
import { ParentStudent } from 'src/app/core/model/parent-students';
import { Students } from 'src/app/core/model/students';
import { AnimationService } from 'src/app/core/services/animation.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ParentsService } from 'src/app/core/services/parents.service';
import { StorageService } from 'src/app/core/storage/storage.service';
import { LinkStudentRequestPage } from './link-student-request/link-student-request.page';
import { LocalNotifications } from '@capacitor/local-notifications';
import { MyLinkStudentRequestsPage } from '../my-link-student-requests/my-link-student-requests.page';
import { StudentDetailsPage } from './student-details/student-details.page';

@Component({
  selector: 'app-my-students',
  templateUrl: 'my-students.page.html',
  styleUrls: ['my-students.page.scss']
})
export class MyStudentsPage {
  isLoading = false;
  myStudents: Students[] = [];
  @ViewChild(IonRefresher)ionRefresher: IonRefresher;
  constructor(
    private parentsService: ParentsService,
    private authService: AuthService,
    private alertController: AlertController,
    private modalCtrl: ModalController,
    private animationService: AnimationService,
    private storageService: StorageService) {
      if(this.isAuthenticated) {
        this.initStudents();
      }
    }

  get isAuthenticated() {
    const currentUser = this.storageService.getLoginUser();
    return currentUser &&
    currentUser?.parentCode &&
    currentUser?.user &&
    currentUser?.user?.userId;
  }

  async initStudents() {
    this.isLoading = true;
    const currentUser = this.storageService.getLoginUser();
    const res = await this.parentsService.getByCode(currentUser.parentCode).toPromise();
    this.isLoading = false;
    this.myStudents = res.data.parentStudents.map(x=> x.student);
    console.log(this.myStudents);
    if(this.ionRefresher) {
      this.ionRefresher.complete();
    }
  }

  async onShowNewRequest() {
    if(!this.isAuthenticated) {
      this.authService.logout();
    }
    let modal: any = null;
    modal = await this.modalCtrl.create({
      component: LinkStudentRequestPage,
      cssClass: 'modal-fullscreen',
      backdropDismiss: false,
      canDismiss: true,
      enterAnimation: this.animationService.flyUpAnimation,
      leaveAnimation: this.animationService.leaveFlyUpAnimation,
      componentProps: { modal },
    });
    modal.present();
  }

  async onShowStudentDetails(details: Students) {
    if(!this.isAuthenticated) {
      this.authService.logout();
    }
    let modal: any = null;
    const currentUser = this.storageService.getLoginUser();
    modal = await this.modalCtrl.create({
      component: StudentDetailsPage,
      cssClass: 'modal-fullscreen',
      backdropDismiss: false,
      canDismiss: true,
      enterAnimation: this.animationService.pushLeftAnimation,
      leaveAnimation: this.animationService.leavePushLeftAnimation,
      componentProps: { modal, currentUser, details },
    });
    modal.present();
  }

  async onShowMyRequests() {
    if(!this.isAuthenticated) {
      this.authService.logout();
    }
    let modal: any = null;
    modal = await this.modalCtrl.create({
      component: MyLinkStudentRequestsPage,
      cssClass: 'modal-fullscreen',
      backdropDismiss: false,
      canDismiss: true,
      enterAnimation: this.animationService.flyUpAnimation,
      leaveAnimation: this.animationService.leaveFlyUpAnimation,
      componentProps: { modal },
    });
    modal.present();
  }

  async doRefresh(){
    try {
      if(this.isLoading) {
        return;
      }
      this.myStudents = [];
      await this.initStudents();
    }catch(ex) {
      if(this.ionRefresher) {
        this.ionRefresher.complete();
      }
      await this.presentAlert({
        header: 'Try again!',
        message: 'Error loading',
        buttons: ['OK']
      });
    }
  }

  async presentAlert(options: AlertOptions) {
    const alert = await this.alertController.create(options);
    await alert.present();
  }
}
