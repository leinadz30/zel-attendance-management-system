import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Subscription, forkJoin } from 'rxjs';
import { SchoolYearLevels } from 'src/app/model/school-year-levels';
import { SchoolYearLevelsService } from 'src/app/services/school-year-levels.service';
import { StorageService } from 'src/app/services/storage.service';
import { AlertDialogModel } from 'src/app/shared/alert-dialog/alert-dialog-model';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { MyErrorStateMatcher } from 'src/app/shared/form-validation/error-state.matcher';

@Component({
  selector: 'app-common-school-year-form',
  templateUrl: './common-school-year-form.component.html',
  styleUrls: ['./common-school-year-form.component.scss']
})
export class CommonSchoolYearLevelFormComponent {
  schoolYearLevelCode;
  isNew = false;
  error;
  isLoading = true;
  schoolYearLevelForm: FormGroup;
  mediaWatcher: Subscription;
  matcher = new MyErrorStateMatcher();
  isProcessing = false;
  schoolYearLevel: SchoolYearLevels;
  schoolId;
  currentUserId;

  constructor(
    private formBuilder: FormBuilder,
    private schoolYearLevelsService: SchoolYearLevelsService,
    private storageService: StorageService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private spinner: SpinnerVisibilityService,
    public dialogRef: MatDialogRef<CommonSchoolYearLevelFormComponent>) {
      this.schoolYearLevelForm = this.formBuilder.group(
        {
          name: [null, [Validators.required]],
          educationalStage: new FormControl(null, [Validators.required])
        }
      );
  }
  get f() {
    return this.schoolYearLevelForm.controls;
  }
  get formIsValid() {
    return this.schoolYearLevelForm.valid;
  }
  get formIsReady() {
    return this.schoolYearLevelForm.valid && this.schoolYearLevelForm.dirty;
  }
  get formData() {
    return this.schoolYearLevelForm.value;
  }

  async initDetails() {
    try {
      forkJoin([
        this.schoolYearLevelsService.getByCode(this.schoolYearLevelCode).toPromise()
      ]).subscribe(([schoolYearLevel])=> {
        if (schoolYearLevel.success) {
          this.schoolYearLevel = schoolYearLevel.data;
          this.schoolYearLevelForm.patchValue({
            name: schoolYearLevel.data.name,
            educationalStage: schoolYearLevel.data.educationalStage
          });
          this.schoolYearLevelForm.updateValueAndValidity();
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.error = Array.isArray(schoolYearLevel.message) ? schoolYearLevel.message[0] : schoolYearLevel.message;
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

  getError(key: string) {
    return this.f[key].errors;
  }
  onSubmit() {
    if (this.schoolYearLevelForm.invalid) {
      return;
    }

    const dialogData = new AlertDialogModel();
    dialogData.title = 'Confirm';
    dialogData.message = this.isNew ? 'Save School Year Level' : 'Update School Year Level?';
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
            schoolId: this.schoolId,
            createdByUserId: this.currentUserId
          }
          res = await this.schoolYearLevelsService.create(params).toPromise();
        } else {
          params = {
            ...params,
            updatedByUserId: this.currentUserId
          }
          res = await this.schoolYearLevelsService.update(this.schoolYearLevelCode, params).toPromise();
        }

        if (res.success) {
          this.snackBar.open('Saved!', 'close', {
            panelClass: ['style-success'],
          });
          this.isProcessing = false;
          dialogRef.componentInstance.isProcessing = this.isProcessing;
          dialogRef.close();
          this.dialogRef.close();
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
