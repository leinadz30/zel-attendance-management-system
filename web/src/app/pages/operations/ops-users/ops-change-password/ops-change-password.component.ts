import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { OperatorsService } from 'src/app/services/operatros.service';
import { AlertDialogModel } from 'src/app/shared/alert-dialog/alert-dialog-model';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { MyErrorStateMatcher } from 'src/app/shared/form-validation/error-state.matcher';

@Component({
  selector: 'app-ops-change-password',
  templateUrl: './ops-change-password.component.html',
  styleUrls: ['./ops-change-password.component.scss']
})
export class OpsChangePasswordComponent {
  isProcessing = false;
  error;
  changePasswordForm: FormGroup;
  operatorCode;
  matcher = new MyErrorStateMatcher();
  departmentCode: string;
  constructor(
    private formBuilder: FormBuilder,
    private operatorsService: OperatorsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private spinner: SpinnerVisibilityService,
    public dialogRef: MatDialogRef<OpsChangePasswordComponent>) {

    }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.changePasswordForm = this.formBuilder.group(
      {
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
  }

  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notMatched: true };
  };

  get f() {
    return this.changePasswordForm.controls;
  }
  get formIsValid() {
    return this.changePasswordForm.valid;
  }
  get formIsReady() {
    return this.changePasswordForm.valid && this.changePasswordForm.dirty;
  }
  get formData() {
    return this.changePasswordForm.value;
  }

  getError(key: string) {
    if (key === 'confirmPassword') {
      this.formData.confirmPassword !== this.formData.password
        ? this.f[key].setErrors({ notMatched: true })
        : this.f[key].setErrors(null);
    }
    return this.f[key].errors;
  }

  onSubmitChangePassword() {
    if (this.changePasswordForm.invalid || this.changePasswordForm.invalid) {
      return;
    }

    const dialogData = new AlertDialogModel();
    dialogData.title = 'Confirm';
    dialogData.message = 'Update operator password?';
    dialogData.confirmButton = {
      visible: true,
      text: 'Yes, Update now',
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
        const params = this.formData;
        this.isProcessing = true;
        const res = await this.operatorsService.resetPassword(this.operatorCode, params).toPromise();

        if (res.success) {
          this.snackBar.open('Password updated!', 'close', {
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
