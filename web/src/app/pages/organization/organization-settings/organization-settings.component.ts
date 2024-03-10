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
  selector: 'app-organization-settings-details',
  templateUrl: './organization-settings.component.html',
  styleUrls: ['./organization-settings.component.scss'],
  host: {
    class: "page-component"
  }
})
export class OrganizationSettingsComponent {
  schoolCode;
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
    this.schoolCode = currentProfile?.employee?.school?.schoolCode;
    if (this.route.snapshot.data) {
    }
    this.schoolForm = this.formBuilder.group(
      {
        orgSchoolCode: new FormControl(null, [Validators.required]),
        schoolName: new FormControl(null, [Validators.required]),
        schoolAddress: new FormControl(),
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
    this.initDetails();
    this.isLoading = false;
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


  onSubmit() {
    if (this.schoolForm.invalid) {
      return;
    }
    let params = {
      ...this.formData,
      updatedByUserId: this.currentUserId,
    };

    const dialogData = new AlertDialogModel();
    dialogData.title = 'Confirm';
    dialogData.message = "Update organization?";
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
        const res = await this.schoolsService.update(this.schoolCode, params).toPromise();
        if (res.success) {
          this.snackBar.open('Saved!', 'close', {
            panelClass: ['style-success'],
          });
          this.isProcessing = false;
          dialogRef.componentInstance.isProcessing = this.isProcessing;
          dialogRef.close();
          this.router.navigate(["/org/organization-settings/"])
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
