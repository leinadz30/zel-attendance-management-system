/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, AlertController, IonModal, ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { SearchSchoolPage } from 'src/app/component/search-school/search-school.page';
import { SearchStudentsBySchoolPage } from 'src/app/component/search-students-by-school/search-students-by-school.page';
import { Parents } from 'src/app/core/model/parents';
import { Schools } from 'src/app/core/model/schools';
import { Students } from 'src/app/core/model/students';
import { CensoredStringPipe } from 'src/app/core/pipe/censored-string.pipe';
import { AnimationService } from 'src/app/core/services/animation.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { LinkStudentRequestService } from 'src/app/core/services/link-student-request.service';
import { ParentsService } from 'src/app/core/services/parents.service';
import { SchoolsService } from 'src/app/core/services/schools.service';
import { StudentsService } from 'src/app/core/services/students.service';
import { StorageService } from 'src/app/core/storage/storage.service';
import { PageLoaderService } from 'src/app/core/ui-service/page-loader.service';

@Component({
  selector: 'app-link-student-request',
  templateUrl: './link-student-request.page.html',
  styleUrls: ['./link-student-request.page.scss'],
})
export class LinkStudentRequestPage implements OnInit {
  modal;
  currentUser: Parents;
  linkStudentRequestForm: FormGroup;
  selectedSchool: Schools;
  selectedStudent: Students;
  activeAditionalBackdrop = false;
  isSubmitting = false;
  isOpenRequestResultModal = false;
  requestResultModal: { type: 'success' | 'failed' | 'warning'; title: string; desc: string; done?; retry? };

  orgSchoolCode = new FormControl(null, [Validators.required]);
  orgStudentId = new FormControl(null, [Validators.required]);
  @ViewChild('searchSchoolCodeModal', { static: false }) searchSchoolCodeModal: IonModal;
  @ViewChild('searchStudentIdModal', { static: false }) searchStudentIdModal: IonModal;
  constructor(
    private parentsService: ParentsService,
    private censoredStringPipe: CensoredStringPipe,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    private pageLoaderService: PageLoaderService,
    private authService: AuthService,
    private schoolsService: SchoolsService,
    private studentsService: StudentsService,
    private linkStudentRequestService: LinkStudentRequestService,
    private modalCtrl: ModalController,
    private animationService: AnimationService,
    private storageService: StorageService) {
    this.currentUser = this.storageService.getLoginUser();
  }

  get valid() {
    return this.selectedSchool && this.selectedSchool.schoolId && this.selectedStudent && this.selectedStudent.studentId;
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

  async onShowSearchSchool() {

    if(!this.isAuthenticated) {
      this.authService.logout();
    }
    if(this.searchSchoolCodeModal) {
      this.orgSchoolCode.markAsUntouched();
      this.orgSchoolCode.markAsPristine();
      this.orgSchoolCode.updateValueAndValidity();
      this.searchSchoolCodeModal.present();
    }
  }

  async onSearchSchool() {
    try {
      await this.pageLoaderService.open('Checking please wait...');
      this.isSubmitting = true;
      const res = await this.schoolsService.getByOrgCode(this.orgSchoolCode.value).toPromise();
      this.isSubmitting = false;
      if(res.data && res.data?.schoolCode) {
        this.selectedSchool = res.data;
        this.orgSchoolCode.setErrors(null);
        this.orgSchoolCode.markAsPristine();
        this.orgSchoolCode.updateValueAndValidity();
        this.searchSchoolCodeModal.dismiss();
      } else {
        this.orgSchoolCode.setErrors({ notFound: true });
      }
      await this.pageLoaderService.close();
    } catch(ex) {
      this.isSubmitting = false;
      await this.pageLoaderService.close();
    }
  }

  async onShowSearchStudents() {

    if(!this.isAuthenticated) {
      this.authService.logout();
    }
    if(this.searchStudentIdModal) {
      this.orgStudentId.markAsUntouched();
      this.orgStudentId.markAsPristine();
      this.orgStudentId.updateValueAndValidity();
      this.searchStudentIdModal.present();
    }
  }

  async onSearchStudent() {
    try {
      await this.pageLoaderService.open('Checking please wait...');
      this.isSubmitting = true;
      const res = await this.studentsService.getByOrgStudentId(this.orgStudentId.value).toPromise();
      this.isSubmitting = false;
      if(res.data && res.data?.studentCode) {
        this.selectedStudent = res.data;
        this.orgStudentId.setErrors(null);
        this.orgStudentId.markAsPristine();
        this.orgStudentId.updateValueAndValidity();
        this.searchStudentIdModal.dismiss();
      } else {
        this.orgStudentId.setErrors({ notFound: true });
      }
      await this.pageLoaderService.close();
    } catch(ex) {
      this.isSubmitting = false;
      await this.pageLoaderService.close();
    }
  }

  async onSubmit() {
    try {
      // await this.presentAlert({
      //   header: 'Continue?',
      //   buttons: [
      //     {
      //       text: 'CANCEL',
      //       role: 'cancel',
      //     },
      //     {
      //       text: 'YES',
      //       role: 'confirm',
      //       handler: () => {
      //         this.save();
      //       },
      //     },
      //   ],
      // });

      const sheet = await this.actionSheetController.create({
        cssClass: 'app-action-sheet',
        header: `Are you sure you want to link student ${this.censoredStringPipe.transform(this.selectedStudent?.fullName)}?`,
        buttons: [
          {
            text: 'Yes?',
            handler: async () => {
              sheet.dismiss();
              this.save();
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
    catch(ex) {
      this.isSubmitting = false;
      await this.pageLoaderService.close();
      await this.presentAlert({
        header: 'Try again!',
        message: Array.isArray(ex.message) ? ex.message[0] : ex.message,
        buttons: ['OK'],
      });
    }
  }

  async save() {
    const params = {
      requestedByParentId: this.currentUser.parentId,
      schoolId: this.selectedSchool.schoolId,
      studentId: this.selectedStudent.studentId
    };
    console.log(params);
    try {
      await this.pageLoaderService.open('Sending request please wait...');
      this.isSubmitting = true;
      this.linkStudentRequestService.create(params)
        .subscribe(async res => {
          if (res.success) {
            await this.pageLoaderService.close();
            this.isOpenRequestResultModal = true;
            this.requestResultModal = {
              title: 'Success!',
              desc: 'Request to Link Student was successfully submitted.',
              type: 'success',
              done: ()=> {
                this.isOpenRequestResultModal = false;
                this.close();
              }
            };
          } else {
            this.isSubmitting = false;
            await this.pageLoaderService.close();
            this.isOpenRequestResultModal = true;
            this.requestResultModal = {
              title: 'Oops!',
              desc: res.message,
              type: 'failed',
              retry: ()=> {
                this.isOpenRequestResultModal = false;
              },
            };
          }
        });
    } catch (e) {
      this.isSubmitting = false;
      await this.pageLoaderService.close();
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
    return await alert.present();
  }
}
