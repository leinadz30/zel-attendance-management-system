import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, forkJoin } from 'rxjs';
import { Schools } from 'src/app/model/schools';
import { AppConfigService } from 'src/app/services/app-config.service';
import { SchoolsService } from 'src/app/services/schools.service';
import { StorageService } from 'src/app/services/storage.service';
import { AlertDialogModel } from 'src/app/shared/alert-dialog/alert-dialog-model';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { MyErrorStateMatcher } from 'src/app/shared/form-validation/error-state.matcher';
import { MatTableDataSource } from '@angular/material/table';
import { Operators } from 'src/app/model/operators';

@Component({
  selector: 'app-common-school-management-details',
  templateUrl: './common-school-management-details.component.html',
  styleUrls: ['./common-school-management-details.component.scss'],
  host: {
    class: "page-component"
  }
})
export class CommonSchoolManagementDetailsComponent {
  schoolCode;
  isNew = false;
  isReadOnly = true;

  error;
  isLoading = false;

  mediaWatcher: Subscription;
  matcher = new MyErrorStateMatcher();
  isProcessing = false;
  isLoadingRoles = false;

  schoolForm: FormGroup;
  school: Schools;
  currentUserId;
  mode: 'OPERATION' | 'ORGANIZATION';
  constructor(
    private schoolsService: SchoolsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private appconfig: AppConfigService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) {
    const currentProfile = this.storageService.getLoginProfile();
    this.currentUserId = currentProfile?.user?.userId;
    const { isNew, edit } = this.route.snapshot.data;
    this.isNew = isNew;
    this.schoolCode = this.route.snapshot.paramMap.get('schoolCode');
    if(this.schoolCode && this.schoolCode !== "") {
      this.storageService.saveOpsRecentSchool(this.schoolCode);
    }
    this.isReadOnly = !edit && !isNew;
    if (this.route.snapshot.data) {
      this.mode = this.route.snapshot.data["mode"];
    }
    this.schoolForm = this.formBuilder.group(
      {
        orgSchoolCode: new FormControl(null, [Validators.required]),
        schoolName: new FormControl(null, [Validators.required]),
        schoolAddress: new FormControl(null, [Validators.required]),
        schoolContactNumber: new FormControl(),
        schoolEmail: new FormControl(),
        restrictGuardianTime: new FormControl(false),
        studentsAllowableTimeLate: new FormControl(),
        studentsTimeLate: new FormControl(),
        employeesTimeBeforeSwipeIsAllowed: new FormControl(),
        employeesAllowableTimeLate: new FormControl(),
        employeesTimeLate: new FormControl(),
        timeBeforeSwipeIsAllowed: new FormControl(),
        smsNotificationForStaffEntry: new FormControl(),
        smsNotificationForStudentBreakTime: new FormControl()
      }
    );
  }

  get pageRights() {
    let rights = {};
    return rights;
  }

  ngOnInit(): void {
    this.isLoading = true;
    if(!this.isNew) {
      this.initDetails();
    } else {
      this.isLoading = false;
    }
  }
  get f() {
    return this.schoolForm.controls;
  }
  get formIsValid() {
    return this.schoolForm.valid;
  }
  get formIsReady() {
    return this.schoolForm.valid && this.schoolForm.dirty;
  }
  get formData() {
    return this.schoolForm.value;
  }

  getError(key: string) {
    return this.f[key].errors;
  }

  async initDetails() {
    try {
        forkJoin([
          this.schoolsService.getByCode(this.schoolCode).toPromise(),
        ]).subscribe(([school])=> {
          if (school.success) {
            this.school = school.data;
            this.schoolForm.patchValue({
              orgSchoolCode: school.data.orgSchoolCode,
              schoolName: school.data.schoolName,
              schoolAddress: school.data.schoolAddress,
              studentsAllowableTimeLate: school.data.studentsAllowableTimeLate,
              studentsTimeLate: school.data.studentsTimeLate,
              restrictGuardianTime: school.data.restrictGuardianTime,
              employeesTimeBeforeSwipeIsAllowed: school.data.employeesTimeBeforeSwipeIsAllowed,
              employeesAllowableTimeLate: school.data.employeesAllowableTimeLate,
              employeesTimeLate: school.data.employeesTimeLate,
              timeBeforeSwipeIsAllowed: school.data.timeBeforeSwipeIsAllowed,
              smsNotificationForStudentBreakTime: school.data.smsNotificationForStudentBreakTime,
              schoolContactNumber: school.data.schoolContactNumber,
              schoolEmail: school.data.schoolEmail,
            });
            this.schoolForm.updateValueAndValidity();
            if (this.isReadOnly) {
              this.schoolForm.disable();
            }
            this.isLoading = false;
          } else {
            this.isLoading = false;
            this.error = Array.isArray(school.message) ? school.message[0] : school.message;
            this.snackBar.open(this.error, 'close', {
              panelClass: ['style-error'],
            });
          }
        });
    } catch(ex) {
      this.isLoading = false;
      this.error = Array.isArray(ex.message) ? ex.message[0] : ex.message;
      this.snackBar.open(this.error, 'close', {
        panelClass: ['style-error'],
      });
    }
  }

  onDelete() {
    const dialogData = new AlertDialogModel();
    dialogData.title = 'Confirm';
    dialogData.message = 'Delete schools?';
    dialogData.confirmButton = {
      visible: true,
      text: 'yes',
      color: 'primary',
    };
    dialogData.dismissButton = {
      visible: true,
      text: 'cancel',
    };
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      maxWidth: '400px',
      closeOnNavigation: true,
    });
    dialogRef.componentInstance.alertDialogConfig = dialogData;

    dialogRef.componentInstance.conFirm.subscribe(async (data: any) => {
      this.isProcessing = true;
      dialogRef.componentInstance.isProcessing = this.isProcessing;
      try {
        let res = await this.schoolsService.delete(this.schoolCode).toPromise();
        if (res.success) {
          this.snackBar.open('Saved!', 'close', {
            panelClass: ['style-success'],
          });
          if(this.mode === "OPERATION") {
            this.router.navigate(['/ops/school-management/']);
          } else {
            this.router.navigate(['/org/school-management/']);
          }
          this.isProcessing = false;
          dialogRef.componentInstance.isProcessing = this.isProcessing;
          dialogRef.close();
        } else {
          this.isProcessing = false;
          dialogRef.componentInstance.isProcessing = this.isProcessing;
          this.error = Array.isArray(res.message)
            ? res.message[0]
            : res.message;
          this.snackBar.open(this.error, 'close', {
            panelClass: ['style-error'],
          });
          dialogRef.close();
        }
      } catch (e) {
        this.isProcessing = false;
        dialogRef.componentInstance.isProcessing = this.isProcessing;
        this.error = Array.isArray(e.message) ? e.message[0] : e.message;
        this.snackBar.open(this.error, 'close', {
          panelClass: ['style-error'],
        });
        dialogRef.close();
      }
    });
  }


  onSubmit() {
    if (this.schoolForm.invalid) {
      return;
    }

    const dialogData = new AlertDialogModel();
    dialogData.title = 'Confirm';
    dialogData.message = this.isNew ? 'Create new school' : 'Update school?';
    dialogData.confirmButton = {
      visible: true,
      text: 'yes',
      color: 'primary',
    };
    dialogData.dismissButton = {
      visible: true,
      text: 'cancel',
    };
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      maxWidth: '400px',
      closeOnNavigation: true,
    });
    dialogRef.componentInstance.alertDialogConfig = dialogData;

    dialogRef.componentInstance.conFirm.subscribe(async (data: any) => {
      this.isProcessing = true;
      dialogRef.componentInstance.isProcessing = this.isProcessing;
      try {
        this.isProcessing = true;
        let params = this.formData;
        let res;
        if(this.isNew) {
          params = {
            ...params,
            registeredByUserId : this.currentUserId
          }
          res = await this.schoolsService.create(params).toPromise();
        } else {
          params = {
            ...params,
            updatedByUserId: this.currentUserId
          }
          res = await this.schoolsService.update(this.schoolCode, params).toPromise();
        }

        if (res.success) {
          this.snackBar.open('Saved!', 'close', {
            panelClass: ['style-success'],
          });
          this.isProcessing = false;
          dialogRef.componentInstance.isProcessing = this.isProcessing;
          dialogRef.close();
          if(this.mode === "OPERATION") {
            this.router.navigate(["/ops/school-management/"])
          } else {
            this.router.navigate(["/org/school-management/"])
          }
        } else {
          this.isProcessing = false;
          dialogRef.componentInstance.isProcessing = this.isProcessing;
          this.error = Array.isArray(res.message)
            ? res.message[0]
            : res.message;
          this.snackBar.open(this.error, 'close', {
            panelClass: ['style-error'],
          });
          dialogRef.close();
        }
      } catch (e) {
        this.isProcessing = false;
        dialogRef.componentInstance.isProcessing = this.isProcessing;
        this.error = Array.isArray(e.message) ? e.message[0] : e.message;
        this.snackBar.open(this.error, 'close', {
          panelClass: ['style-error'],
        });
        dialogRef.close();
      }
    });
  }
}
