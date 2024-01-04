import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Subscription, forkJoin } from 'rxjs';
import { Departments } from 'src/app/model/departments';
import { SchoolYearLevels } from 'src/app/model/school-year-levels';
import { Schools } from 'src/app/model/schools';
import { Students } from 'src/app/model/students';
import { StudentsService } from 'src/app/services/students.service';
import { StorageService } from 'src/app/services/storage.service';
import { AlertDialogModel } from 'src/app/shared/alert-dialog/alert-dialog-model';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { MyErrorStateMatcher } from 'src/app/shared/form-validation/error-state.matcher';
import { SelectDepartmentDialogComponent } from 'src/app/shared/select-department-dialog/select-department-dialog.component';
import { SelectEmployeeDialogComponent } from 'src/app/shared/select-employee-dialog/select-employee-dialog.component';
import { SelectSchoolYearLevelDialogComponent } from 'src/app/shared/select-school-year-level-dialog/select-school-year-level-dialog.component';
import { Courses } from 'src/app/model/courses';
import { Sections } from 'src/app/model/sections';
import { SelectCourseDialogComponent } from 'src/app/shared/select-course-dialog/select-course-dialog.component';
import { SelectSectionDialogComponent } from 'src/app/shared/select-section-dialog/select-section-dialog.component';
import { ParentStudent } from 'src/app/model/parent-students';
import { Parents } from 'src/app/model/parents';
import { OpsParentDetailsComponent } from 'src/app/pages/parents/ops-parent-details/ops-parent-details.component';

@Component({
  selector: 'app-ops-students-parents-dialog',
  templateUrl: './ops-students-parents-dialog.component.html',
  styleUrls: ['./ops-students-parents-dialog.component.scss']
})
export class OpsStudentParentsDialogComponent {
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
    public dialogRef: MatDialogRef<OpsStudentParentsDialogComponent>) {
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
    const dialogRef = this.dialog.open(OpsParentDetailsComponent, {
      maxWidth: '720px',
      width: '720px',
      disableClose: true,
      panelClass: "form-dialog"
    });
    dialogRef.componentInstance.parentCode = parent.parentCode;
    dialogRef.componentInstance.initDetails();
  }
}
