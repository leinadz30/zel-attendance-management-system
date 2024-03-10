/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, AlertController, IonModal, IonRefresher, ModalController } from '@ionic/angular';
import { LinkStudentRequest } from 'src/app/core/model/link-student-request';
import { AnimationService } from 'src/app/core/services/animation.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { LinkStudentRequestService } from 'src/app/core/services/link-student-request.service';
import { StorageService } from 'src/app/core/storage/storage.service';
import { PageLoaderService } from 'src/app/core/ui-service/page-loader.service';

@Component({
  selector: 'app-my-link-student-requests',
  templateUrl: './my-link-student-requests.page.html',
  styleUrls: ['./my-link-student-requests.page.scss'],
})
export class MyLinkStudentRequestsPage implements OnInit {
  @ViewChild('requestInfoModal', { static: false }) requestInfoModal: IonModal;
  isLoading = false;
  isSubmitting = false;
  modal;
  pageIndex = 0;
  pageSize = 10;
  limit = 10;
  total = 0;
  myRequests: LinkStudentRequest[] = [];
  current: LinkStudentRequest;
  @ViewChild(IonRefresher)ionRefresher: IonRefresher;
  constructor(
    private linkStudentRequestService: LinkStudentRequestService,
    private authService: AuthService,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    private pageLoaderService: PageLoaderService,
    private modalCtrl: ModalController,
    private animationService: AnimationService,
    private storageService: StorageService) {
      if(this.isAuthenticated) {
        this.initRequests();
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
  }

  initRequests() {
    this.isLoading = true;
    const currentUser = this.storageService.getLoginUser();
    this.linkStudentRequestService.getByAdvanceSearch({
      order: { linkStudentRequestCode: 'DESC' },
      columnDef: [{
        apiNotation: 'requestedByParent.parentCode',
        filter: currentUser.parentCode,
        type: 'precise'
      }],
      pageIndex: this.pageIndex, pageSize: this.pageSize
    }).subscribe(res=> {
      this.isLoading = false;
      this.myRequests = [...this.myRequests, ...res.data.results];
      this.total = res.data.total;
      console.log(this.myRequests);
      if(this.ionRefresher) {
        this.ionRefresher.complete();
      }
    });
  }

  async loadMore() {
    this.pageIndex = this.pageIndex + 1;
    await this.initRequests();
  }

  async doRefresh(){
    try {
      if(this.isLoading) {
        return;
      }
      this.pageIndex = 0;
      this.pageSize = 10;
      this.myRequests = [];
      await this.initRequests();
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

  async onCancel() {
    const sheet = await this.actionSheetController.create({
      cssClass: 'app-action-sheet',
      header: 'Do you want to cancel request?',
      buttons: [
        {
          text: 'Yes?',
          handler: async () => {
            sheet.dismiss();
            const currentUser = this.storageService.getLoginUser();
            this.cancel(this.current.linkStudentRequestCode, {
              updatedByUserId: currentUser.user.userId,
            });
          },
        },
        {
          text: 'No',
          handler: async () => {
            sheet.dismiss();
          },
        },
      ],
    });
    await sheet.present();
  }

  async cancel(linkStudentRequestCode, params) {
    try {
      this.isSubmitting = true;
      await this.pageLoaderService.open('Checking please wait...');
      this.linkStudentRequestService.cancel(linkStudentRequestCode, params).subscribe(
        async (res) => {
          console.log(res);
          this.pageLoaderService.close();
          if (res.success) {
            console.log(res);
            this.isSubmitting = false;
            const findIndex = this.myRequests.findIndex(x=>x.linkStudentRequestId === res.data.linkStudentRequestId);
            this.myRequests[findIndex] = res.data;
            this.current = res.data;
            await this.presentAlert({
              header: 'Done!',
              message: 'Request is now cancelled!',
              buttons: ['OK'],
            });
          } else {
            this.isSubmitting = false;
            await this.presentAlert({
              header: 'Try again!',
              message: Array.isArray(res.message)
                ? res.message[0]
                : res.message,
              buttons: ['OK'],
            });
          }
        },
        async (err) => {
          this.pageLoaderService.close();
          this.isSubmitting = false;
          await this.presentAlert({
            header: 'Try again!',
            message: Array.isArray(err.message) ? err.message[0] : err.message,
            buttons: ['OK'],
          });
        }
      );
    } catch (e) {
      this.pageLoaderService.close();
      this.isSubmitting = false;
      await this.presentAlert({
        header: 'Try again!',
        message: Array.isArray(e.message) ? e.message[0] : e.message,
        buttons: ['OK'],
      });
    }
  }

  close() {
    this.modal.dismiss(null, 'cancel');
  }

  async presentAlert(options: any) {
    const alert = await this.alertController.create(options);
    await alert.present();
  }
}
