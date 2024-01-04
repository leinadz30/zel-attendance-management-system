import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Subscription, forkJoin } from 'rxjs';
import { Strands } from 'src/app/model/strands';
import { StrandsService } from 'src/app/services/strands.service';
import { StorageService } from 'src/app/services/storage.service';
import { AlertDialogModel } from 'src/app/shared/alert-dialog/alert-dialog-model';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { MyErrorStateMatcher } from 'src/app/shared/form-validation/error-state.matcher';

@Component({
  selector: 'app-ops-strands-form',
  templateUrl: './ops-strands-form.component.html',
  styleUrls: ['./ops-strands-form.component.scss']
})
export class OpsStrandFormComponent {
  strandCode;
  isNew = false;
  error;
  isLoading = true;
  strandForm: FormGroup;
  mediaWatcher: Subscription;
  matcher = new MyErrorStateMatcher();
  isProcessing = false;
  strand: Strands;
  schoolId;
  currentOperatorCode;

  constructor(
    private formBuilder: FormBuilder,
    private strandsService: StrandsService,
    private storageService: StorageService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private spinner: SpinnerVisibilityService,
    public dialogRef: MatDialogRef<OpsStrandFormComponent>) {
      this.strandForm = this.formBuilder.group(
        {
          name: [null, [Validators.required]]
        }
      );
  }
  get f() {
    return this.strandForm.controls;
  }
  get formIsValid() {
    return this.strandForm.valid;
  }
  get formIsReady() {
    return this.strandForm.valid && this.strandForm.dirty;
  }
  get formData() {
    return this.strandForm.value;
  }

  async initDetails() {
    try {

      forkJoin([
        this.strandsService.getByCode(this.strandCode).toPromise()
      ]).subscribe(([strand])=> {
        if (strand.success) {
          this.strand = strand.data;
          this.strandForm.patchValue({
            name: strand.data.name
          });
          this.strandForm.updateValueAndValidity();
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.error = Array.isArray(strand.message) ? strand.message[0] : strand.message;
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
    if (this.strandForm.invalid) {
      return;
    }

    const dialogData = new AlertDialogModel();
    dialogData.title = 'Confirm';
    dialogData.message = this.isNew ? 'Save strand' : 'Update strand?';
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
          res = await this.strandsService.create(params).toPromise();
        } else {
          params = {
            ...params,
            updatedByUserId: this.currentOperatorCode
          }
          res = await this.strandsService.update(this.strandCode, params).toPromise();
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
