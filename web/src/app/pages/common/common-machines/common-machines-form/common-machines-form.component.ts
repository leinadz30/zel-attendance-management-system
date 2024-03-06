import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Subscription, forkJoin } from 'rxjs';
import { Machines } from 'src/app/model/machines';
import { MachinesService } from 'src/app/services/machines.service';
import { StorageService } from 'src/app/services/storage.service';
import { AlertDialogModel } from 'src/app/shared/alert-dialog/alert-dialog-model';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { MyErrorStateMatcher } from 'src/app/shared/form-validation/error-state.matcher';

@Component({
  selector: 'app-common-machines-form',
  templateUrl: './common-machines-form.component.html',
  styleUrls: ['./common-machines-form.component.scss']
})
export class CommonMachineFormComponent {
  machineCode;
  isNew = false;
  error;
  isLoading = true;
  machineForm: FormGroup;
  mediaWatcher: Subscription;
  matcher = new MyErrorStateMatcher();
  isProcessing = false;
  machine: Machines;
  schoolId;
  currentUserId;

  constructor(
    private formBuilder: FormBuilder,
    private machinesService: MachinesService,
    private storageService: StorageService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private spinner: SpinnerVisibilityService,
    public dialogRef: MatDialogRef<CommonMachineFormComponent>) {
      this.machineForm = this.formBuilder.group(
        {
          description: [null, [Validators.required]]
        }
      );
  }
  get f() {
    return this.machineForm.controls;
  }
  get formIsValid() {
    return this.machineForm.valid;
  }
  get formIsReady() {
    return this.machineForm.valid && this.machineForm.dirty;
  }
  get formData() {
    return this.machineForm.value;
  }

  async initDetails() {
    try {
      forkJoin([
        this.machinesService.getByCode(this.machineCode).toPromise()
      ]).subscribe(([machine])=> {
        if (machine.success) {
          this.machine = machine.data;
          this.machineForm.patchValue({
            description: machine.data.description
          });
          this.machineForm.updateValueAndValidity();
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.error = Array.isArray(machine.message) ? machine.message[0] : machine.message;
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
    if (this.machineForm.invalid) {
      return;
    }

    const dialogData = new AlertDialogModel();
    dialogData.title = 'Confirm';
    dialogData.message = this.isNew ? 'Save machine' : 'Update machine?';
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
          res = await this.machinesService.create(params).toPromise();
        } else {
          params = {
            ...params,
            updatedByUserId: this.currentUserId
          }
          res = await this.machinesService.update(this.machineCode, params).toPromise();
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
