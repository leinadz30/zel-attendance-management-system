import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Subscription, forkJoin } from 'rxjs';
import { EmployeeTitles } from 'src/app/model/employee-titles';
import { EmployeeTitlesService } from 'src/app/services/employee-titles.service';
import { StorageService } from 'src/app/services/storage.service';
import { AlertDialogModel } from 'src/app/shared/alert-dialog/alert-dialog-model';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { MyErrorStateMatcher } from 'src/app/shared/form-validation/error-state.matcher';

@Component({
  selector: 'app-common-employee-titles-form',
  templateUrl: './common-employee-titles-form.component.html',
  styleUrls: ['./common-employee-titles-form.component.scss']
})
export class CommonEmployeeTitleFormComponent {
  employeeTitleCode;
  isNew = false;
  error;
  isLoading = true;
  employeeTitleForm: FormGroup;
  mediaWatcher: Subscription;
  matcher = new MyErrorStateMatcher();
  isProcessing = false;
  employeeTitle: EmployeeTitles;
  schoolId;
  currentUserId;

  constructor(
    private formBuilder: FormBuilder,
    private employeeTitlesService: EmployeeTitlesService,
    private storageService: StorageService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private spinner: SpinnerVisibilityService,
    public dialogRef: MatDialogRef<CommonEmployeeTitleFormComponent>) {
      this.employeeTitleForm = this.formBuilder.group(
        {
          name: [null, [Validators.required]]
        }
      );
  }
  get f() {
    return this.employeeTitleForm.controls;
  }
  get formIsValid() {
    return this.employeeTitleForm.valid;
  }
  get formIsReady() {
    return this.employeeTitleForm.valid && this.employeeTitleForm.dirty;
  }
  get formData() {
    return this.employeeTitleForm.value;
  }

  async initDetails() {
    try {
      forkJoin([
        this.employeeTitlesService.getByCode(this.employeeTitleCode).toPromise()
      ]).subscribe(([employeeTitle])=> {
        if (employeeTitle.success) {
          this.employeeTitle = employeeTitle.data;
          this.employeeTitleForm.patchValue({
            name: employeeTitle.data.name
          });
          this.employeeTitleForm.updateValueAndValidity();
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.error = Array.isArray(employeeTitle.message) ? employeeTitle.message[0] : employeeTitle.message;
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
    if (this.employeeTitleForm.invalid) {
      return;
    }

    const dialogData = new AlertDialogModel();
    dialogData.title = 'Confirm';
    dialogData.message = this.isNew ? 'Save employeeTitle' : 'Update employeeTitle?';
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
          res = await this.employeeTitlesService.create(params).toPromise();
        } else {
          params = {
            ...params,
            updatedByUserId: this.currentUserId
          }
          res = await this.employeeTitlesService.update(this.employeeTitleCode, params).toPromise();
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
