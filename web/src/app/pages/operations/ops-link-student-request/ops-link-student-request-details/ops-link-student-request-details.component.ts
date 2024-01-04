import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Subscription, forkJoin } from 'rxjs';
import { LinkStudentRequest } from 'src/app/model/link-student-request';
import { OpsParentDetailsComponent } from 'src/app/pages/parents/ops-parent-details/ops-parent-details.component';
import { LinkStudentRequestService } from 'src/app/services/link-student-request.service';
import { StorageService } from 'src/app/services/storage.service';
import { AlertDialogModel } from 'src/app/shared/alert-dialog/alert-dialog-model';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { MyErrorStateMatcher } from 'src/app/shared/form-validation/error-state.matcher';
import { OpsStudentFormComponent } from '../../ops-students/ops-students-form/ops-students-form.component';

@Component({
  selector: 'app-ops-link-student-request-details',
  templateUrl: './ops-link-student-request-details.component.html',
  styleUrls: ['./ops-link-student-request-details.component.scss']
})
export class OpsLinkStudentRequestDetailsComponent {
  linkStudentRequestCode;
  isNew = false;
  error;
  isLoading = true;
  mediaWatcher: Subscription;
  isProcessing = false;
  linkStudentRequest: LinkStudentRequest;

  constructor(
    private formBuilder: FormBuilder,
    private linkStudentRequestsService: LinkStudentRequestService,
    private storageService: StorageService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private spinner: SpinnerVisibilityService,
    public dialogRef: MatDialogRef<OpsLinkStudentRequestDetailsComponent>) {
  }
  async initDetails() {
    try {
      this.isLoading = true;
      forkJoin([
        this.linkStudentRequestsService.getByCode(this.linkStudentRequestCode).toPromise()
      ]).subscribe(([linkStudentRequest])=> {
        if (linkStudentRequest.success) {
          this.linkStudentRequest = linkStudentRequest.data;
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.error = Array.isArray(linkStudentRequest.message) ? linkStudentRequest.message[0] : linkStudentRequest.message;
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

  async showStudentDetails() {
    const dialogRef = this.dialog.open(OpsStudentFormComponent, {
      maxWidth: '720px',
      width: '720px',
      disableClose: true,
      panelClass: "form-dialog"
    });
    dialogRef.componentInstance.title = "Student Information";
    dialogRef.componentInstance.studentCode = this.linkStudentRequest.student.studentCode;
    dialogRef.componentInstance.initDetails();
    dialogRef.componentInstance.studentForm.disable();
  }

  async showParentDetails() {
    const dialogRef = this.dialog.open(OpsParentDetailsComponent, {
      maxWidth: '720px',
      width: '720px',
      disableClose: true,
      panelClass: "form-dialog"
    });
    dialogRef.componentInstance.parentCode = this.linkStudentRequest.requestedByParent.parentCode;
    dialogRef.componentInstance.initDetails();
  }
}
