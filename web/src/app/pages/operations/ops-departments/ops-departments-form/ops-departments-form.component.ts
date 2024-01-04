import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Subscription, forkJoin } from 'rxjs';
import { Departments } from 'src/app/model/departments';
import { DepartmentsService } from 'src/app/services/departments.service';
import { StorageService } from 'src/app/services/storage.service';
import { AlertDialogModel } from 'src/app/shared/alert-dialog/alert-dialog-model';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { MyErrorStateMatcher } from 'src/app/shared/form-validation/error-state.matcher';

@Component({
  selector: 'app-ops-departments-form',
  templateUrl: './ops-departments-form.component.html',
  styleUrls: ['./ops-departments-form.component.scss']
})
export class OpsDepartmentFormComponent {
  departmentCode;
  isNew = false;
  error;
  isLoading = true;
  departmentForm: FormGroup;
  mediaWatcher: Subscription;
  matcher = new MyErrorStateMatcher();
  isProcessing = false;
  department: Departments;
  schoolId;
  currentOperatorCode;

  constructor(
    private formBuilder: FormBuilder,
    private departmentsService: DepartmentsService,
    private storageService: StorageService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private spinner: SpinnerVisibilityService,
    public dialogRef: MatDialogRef<OpsDepartmentFormComponent>) {
      this.departmentForm = this.formBuilder.group(
        {
          departmentName: [null, [Validators.required]]
        }
      );
  }
  get f() {
    return this.departmentForm.controls;
  }
  get formIsValid() {
    return this.departmentForm.valid;
  }
  get formIsReady() {
    return this.departmentForm.valid && this.departmentForm.dirty;
  }
  get formData() {
    return this.departmentForm.value;
  }

  async initDetails() {
    try {
      forkJoin([
        this.departmentsService.getByCode(this.departmentCode).toPromise()
      ]).subscribe(([department])=> {
        if (department.success) {
          this.department = department.data;
          this.departmentForm.patchValue({
            departmentName: department.data.departmentName
          });
          this.departmentForm.updateValueAndValidity();
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.error = Array.isArray(department.message) ? department.message[0] : department.message;
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
    if (this.departmentForm.invalid) {
      return;
    }

    const dialogData = new AlertDialogModel();
    dialogData.title = 'Confirm';
    dialogData.message = this.isNew ? 'Save department' : 'Update department?';
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
            createdByUserId: this.currentOperatorCode
          }
          res = await this.departmentsService.create(params).toPromise();
        } else {
          params = {
            ...params,
            updatedByUserId: this.currentOperatorCode
          }
          res = await this.departmentsService.update(this.departmentCode, params).toPromise();
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
