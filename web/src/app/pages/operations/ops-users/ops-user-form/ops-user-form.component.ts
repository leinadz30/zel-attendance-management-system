import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Subscription, forkJoin } from 'rxjs';
import { Operators } from 'src/app/model/operators';
import { OperatorsService } from 'src/app/services/operatros.service';
import { AlertDialogModel } from 'src/app/shared/alert-dialog/alert-dialog-model';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { MyErrorStateMatcher } from 'src/app/shared/form-validation/error-state.matcher';

@Component({
  selector: 'app-ops-user-form',
  templateUrl: './ops-user-form.component.html',
  styleUrls: ['./ops-user-form.component.scss']
})
export class OpsUserFormComponent {
  currentOperatorCode;
  operatorCode;
  isNew = false;
  error;
  isLoading = true;
  operatorForm: FormGroup;
  mediaWatcher: Subscription;
  matcher = new MyErrorStateMatcher();
  isProcessing = false;
  operator: Operators;


  constructor(
    private formBuilder: FormBuilder,
    private operatorsService: OperatorsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private spinner: SpinnerVisibilityService,
    public dialogRef: MatDialogRef<OpsUserFormComponent>) {
      this.operatorForm = this.formBuilder.group(
        {
          userName: [null, [Validators.required]],
          name: [
            '',
            [Validators.required],
          ],
          password: [
            '',
            [
              Validators.minLength(6),
              Validators.maxLength(16),
              Validators.required,
            ],
          ],
          confirmPassword: '',
        },
        { validators: this.checkPasswords }
      );
      this.f['userName'].valueChanges.subscribe(value=> {
        if(/\s/.test(value)) {
          this.f['userName'].setErrors({ whitespace: true})
        }
      })
  }
  get f() {
    return this.operatorForm.controls;
  }
  get formIsValid() {
    return this.operatorForm.valid;
  }
  get formIsReady() {
    return this.operatorForm.valid && this.operatorForm.dirty;
  }
  get formData() {
    return this.operatorForm.value;
  }

  async initDetails() {
    try {
      this.operatorForm = this.formBuilder.group({
        userName: [null],
        name: [
          '',
          [Validators.required],
        ],
      });

      forkJoin([
        this.operatorsService.getByCode(this.operatorCode).toPromise()
      ]).subscribe(([operator])=> {
        if (operator.success) {
          this.operator = operator.data;
          this.operatorForm.patchValue({
            userName: operator.data.user.userName,
            name: operator.data.name,
          });
          this.operatorForm.updateValueAndValidity();
          this.f['userName'].disable();
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.error = Array.isArray(operator.message) ? operator.message[0] : operator.message;
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
    if (key === 'confirmPassword') {
      this.formData.confirmPassword !== this.formData.password
        ? this.f[key].setErrors({ notMatched: true })
        : this.f[key].setErrors(null);
    }
    return this.f[key].errors;
  }

  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notMatched: true };
  };

  onSubmit() {
    if (this.operatorForm.invalid) {
      return;
    }

    const dialogData = new AlertDialogModel();
    dialogData.title = 'Confirm';
    dialogData.message = this.isNew ? 'Save operator' : 'Update operator?';
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
        const params = this.formData;
        let res;
        if(this.isNew) {
          res = await this.operatorsService.create(params).toPromise();
        } else {
          res = await this.operatorsService.update(this.operatorCode, params).toPromise();
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
