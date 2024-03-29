import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Subscription, forkJoin } from 'rxjs';
import { Parents } from 'src/app/model/parents';
import { ParentsService } from 'src/app/services/parents.service';
import { StorageService } from 'src/app/services/storage.service';
import { AlertDialogModel } from 'src/app/shared/alert-dialog/alert-dialog-model';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { MyErrorStateMatcher } from 'src/app/shared/form-validation/error-state.matcher';

@Component({
  selector: 'app-common-parent-details',
  templateUrl: './common-parent-details.component.html',
  styleUrls: ['./common-parent-details.component.scss']
})
export class CommonParentDetailsComponent {
  parentCode;
  isNew = false;
  error;
  isLoading = true;
  parentForm: FormGroup;
  mediaWatcher: Subscription;
  matcher = new MyErrorStateMatcher();
  isProcessing = false;
  parent: Parents;
  schoolId;
  currentUserId;

  constructor(
    private formBuilder: FormBuilder,
    private parentsService: ParentsService,
    private storageService: StorageService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private spinner: SpinnerVisibilityService,
    public dialogRef: MatDialogRef<CommonParentDetailsComponent>) {
      this.parentForm = this.formBuilder.group(
        {
          userName: new FormControl(null),
          fullName: new FormControl(null),
          mobileNumber: new FormControl(null),
        }
      );
  }
  get f() {
    return this.parentForm.controls;
  }
  get formIsValid() {
    return this.parentForm.valid;
  }
  get formIsReady() {
    return this.parentForm.valid && this.parentForm.dirty;
  }
  get formData() {
    return this.parentForm.value;
  }

  async initDetails() {
    try {

      forkJoin([
        this.parentsService.getByCode(this.parentCode).toPromise()
      ]).subscribe(([parent])=> {
        if (parent.success) {
          this.parent = parent.data;
          this.parentForm.patchValue({
            userName: parent.data.user.userName,
            fullName: parent.data.fullName,
            mobileNumber: parent.data.mobileNumber,
          });
          this.parentForm.updateValueAndValidity();
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.error = Array.isArray(parent.message) ? parent.message[0] : parent.message;
          this.snackBar.open(this.error, 'close', {
            panelClass: ['style-error'],
          });
        }
        this.parentForm.disable();
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
}
