import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { forkJoin } from 'rxjs';
import { Students } from 'src/app/model/students';
import { StudentsService } from 'src/app/services/students.service';
import { StorageService } from 'src/app/services/storage.service';
import { Parents } from 'src/app/model/parents';
import { CommonParentDetailsComponent } from '../../common-parents/common-parent-details/common-parent-details.component';

@Component({
  selector: 'app-common-students-parents-dialog',
  templateUrl: './common-students-parents-dialog.component.html',
  styleUrls: ['./common-students-parents-dialog.component.scss']
})
export class CommonStudentParentsDialogComponent {
  studentCode;
  isNew = false;
  error;
  isLoading = true;
  isProcessing = false;
  student: Students;
  parentStudent: Parents[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private studentsService: StudentsService,
    private storageService: StorageService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private spinner: SpinnerVisibilityService,
    public dialogRef: MatDialogRef<CommonStudentParentsDialogComponent>) {
  }

  async init() {
    try {
      forkJoin([
        this.studentsService.getByCode(this.studentCode).toPromise()
      ]).subscribe(([student])=> {
        if (student.success) {
          this.student = student.data;
          this.parentStudent = student.data.parentStudents.map(x=>x.parent);
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.error = Array.isArray(student.message) ? student.message[0] : student.message;
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

  async showParentDetails(parent: Parents) {
    const dialogRef = this.dialog.open(CommonParentDetailsComponent, {
      maxWidth: '720px',
      width: '720px',
      disableClose: true,
      panelClass: "form-dialog"
    });
    dialogRef.componentInstance.parentCode = parent.parentCode;
    dialogRef.componentInstance.initDetails();
  }
}
