import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Subscription, forkJoin } from 'rxjs';
import { Courses } from 'src/app/model/courses';
import { CoursesService } from 'src/app/services/courses.service';
import { StorageService } from 'src/app/services/storage.service';
import { AlertDialogModel } from 'src/app/shared/alert-dialog/alert-dialog-model';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { MyErrorStateMatcher } from 'src/app/shared/form-validation/error-state.matcher';

@Component({
  selector: 'app-common-courses-form',
  templateUrl: './common-courses-form.component.html',
  styleUrls: ['./common-courses-form.component.scss']
})
export class CommonCourseFormComponent {
  courseCode;
  isNew = false;
  error;
  isLoading = true;
  courseForm: FormGroup;
  mediaWatcher: Subscription;
  matcher = new MyErrorStateMatcher();
  isProcessing = false;
  course: Courses;
  schoolId;
  currentUserId;

  constructor(
    private formBuilder: FormBuilder,
    private coursesService: CoursesService,
    private storageService: StorageService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private spinner: SpinnerVisibilityService,
    public dialogRef: MatDialogRef<CommonCourseFormComponent>) {
      this.courseForm = this.formBuilder.group(
        {
          name: [null, [Validators.required]]
        }
      );
  }
  get f() {
    return this.courseForm.controls;
  }
  get formIsValid() {
    return this.courseForm.valid;
  }
  get formIsReady() {
    return this.courseForm.valid && this.courseForm.dirty;
  }
  get formData() {
    return this.courseForm.value;
  }

  async initDetails() {
    try {

      forkJoin([
        this.coursesService.getByCode(this.courseCode).toPromise()
      ]).subscribe(([course])=> {
        if (course.success) {
          this.course = course.data;
          this.courseForm.patchValue({
            name: course.data.name
          });
          this.courseForm.updateValueAndValidity();
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.error = Array.isArray(course.message) ? course.message[0] : course.message;
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
    if (this.courseForm.invalid) {
      return;
    }

    const dialogData = new AlertDialogModel();
    dialogData.title = 'Confirm';
    dialogData.message = this.isNew ? 'Save course' : 'Update course?';
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
          res = await this.coursesService.create(params).toPromise();
        } else {
          params = {
            ...params,
            updatedByUserId: this.currentUserId
          }
          res = await this.coursesService.update(this.courseCode, params).toPromise();
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
