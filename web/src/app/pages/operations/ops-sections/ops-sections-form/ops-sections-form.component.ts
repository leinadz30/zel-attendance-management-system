import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Spinkit, SpinnerVisibilityService } from 'ng-http-loader';
import { Subscription, forkJoin } from 'rxjs';
import { Employees } from 'src/app/model/employees';
import { Departments } from 'src/app/model/departments';
import { SchoolYearLevels } from 'src/app/model/school-year-levels';
import { Schools } from 'src/app/model/schools';
import { Sections } from 'src/app/model/sections';
import { SectionsService } from 'src/app/services/sections.service';
import { StorageService } from 'src/app/services/storage.service';
import { AlertDialogModel } from 'src/app/shared/alert-dialog/alert-dialog-model';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { MyErrorStateMatcher } from 'src/app/shared/form-validation/error-state.matcher';
import { SelectDepartmentDialogComponent } from 'src/app/shared/select-department-dialog/select-department-dialog.component';
import { SelectEmployeeDialogComponent } from 'src/app/shared/select-employee-dialog/select-employee-dialog.component';
import { SelectSchoolYearLevelDialogComponent } from 'src/app/shared/select-school-year-level-dialog/select-school-year-level-dialog.component';

@Component({
  selector: 'app-ops-sections-form',
  templateUrl: './ops-sections-form.component.html',
  styleUrls: ['./ops-sections-form.component.scss']
})
export class OpsSectionFormComponent {

  public spinkit = Spinkit;
  sectionCode;
  isNew = false;
  error;
  isLoading = true;
  sectionForm: FormGroup;
  mediaWatcher: Subscription;
  matcher = new MyErrorStateMatcher();
  isProcessing = false;
  section: Sections;
  school: Schools;
  schoolYearLevel: SchoolYearLevels;
  department: Departments;
  adviserEmployee: Employees;
  currentOperatorCode;

  constructor(
    private formBuilder: FormBuilder,
    private sectionsService: SectionsService,
    private storageService: StorageService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private spinner: SpinnerVisibilityService,
    public dialogRef: MatDialogRef<OpsSectionFormComponent>) {
      this.sectionForm = this.formBuilder.group(
        {
          sectionName: [null, [Validators.required]],
          adviserEmployeeId: new FormControl(null, Validators.required),
          schoolYearLevelId: new FormControl(),
          departmentId: new FormControl(),
        }
      );
  }
  get f() {
    return this.sectionForm.controls;
  }
  get formIsValid() {
    return this.sectionForm.valid;
  }
  get formIsReady() {
    return this.sectionForm.valid && this.sectionForm.dirty;
  }
  get formData() {
    return this.sectionForm.value;
  }

  async initDetails() {
    try {
      forkJoin([
        this.sectionsService.getByCode(this.sectionCode).toPromise()
      ]).subscribe(([section])=> {
        if (section.success) {
          this.section = section.data;
          this.sectionForm.patchValue({
            sectionName: section.data.sectionName,
            adviserEmployeeId: section.data.adviserEmployee?.employeeId,
            schoolYearLevelId: section.data.schoolYearLevel?.schoolYearLevelId,
            departmentId: section.data.department?.departmentId,
          });
          this.adviserEmployee = section.data?.adviserEmployee;
          this.schoolYearLevel = section.data?.schoolYearLevel;
          this.department = section.data?.department;
          this.sectionForm.updateValueAndValidity();
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.error = Array.isArray(section.message) ? section.message[0] : section.message;
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
    if (this.sectionForm.invalid) {
      return;
    }

    const dialogData = new AlertDialogModel();
    dialogData.title = 'Confirm';
    dialogData.message = this.isNew ? 'Save section' : 'Update section?';
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
            schoolId: this.school?.schoolId,
            createdByUserId: this.currentOperatorCode
          }
          res = await this.sectionsService.create(params).toPromise();
        } else {
          params = {
            ...params,
            updatedByUserId: this.currentOperatorCode
          }
          res = await this.sectionsService.update(this.sectionCode, params).toPromise();
        }

        if (res.success) {
          this.snackBar.open('Saved!', 'close', {
            panelClass: ['style-success'],
          });
          this.isProcessing = false;
          dialogRef.componentInstance.isProcessing = this.isProcessing;
          dialogRef.close();
          this.dialogRef.close(true);
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

  showSelectSchoolYearLevelDialog() {
    const dialogRef = this.dialog.open(SelectSchoolYearLevelDialogComponent, {
        disableClose: true,
        panelClass: "select-school-year-level-dialog"
    });
    dialogRef.componentInstance.selected = {
      schoolYearLevelCode: this.schoolYearLevel?.schoolYearLevelCode,
      name: this.schoolYearLevel?.name,
      selected: true
    }
    dialogRef.componentInstance.schoolCode = this.school?.schoolCode;
    dialogRef.afterClosed().subscribe((res:SchoolYearLevels)=> {
      console.log(res);
      if(res) {
        this.schoolYearLevel = res;
        this.f["schoolYearLevelId"].setValue(res.schoolYearLevelId);
      }
      this.f["schoolYearLevelId"].markAllAsTouched();
      this.f["schoolYearLevelId"].markAsDirty();
    })
  }

  showSelectDepartmentDialog() {
    const dialogRef = this.dialog.open(SelectDepartmentDialogComponent, {
        disableClose: true,
        panelClass: "select-department-dialog"
    });
    dialogRef.componentInstance.selected = {
      departmentCode: this.department?.departmentCode,
      departmentName: this.department?.departmentName,
      selected: true
    }
    dialogRef.componentInstance.schoolCode = this.school?.schoolCode;
    dialogRef.afterClosed().subscribe((res:Departments)=> {
      console.log(res);
      if(res) {
        this.department = res;
        this.f["departmentId"].setValue(res.departmentId);
      }
      this.f["departmentId"].markAllAsTouched();
      this.f["departmentId"].markAsDirty();
    })
  }

  showSelectAdviserDialog() {
    const dialogRef = this.dialog.open(SelectEmployeeDialogComponent, {
        disableClose: true,
        panelClass: "select-employee-dialog"
    });
    dialogRef.componentInstance.title = "Select Adviser"
    dialogRef.componentInstance.selected = {
      employeeCode: this.adviserEmployee?.employeeCode,
      fullName: this.adviserEmployee?.fullName,
      selected: true
    }
    dialogRef.componentInstance.schoolCode = this.school?.schoolCode;
    dialogRef.componentInstance.departmentCode = this.department?.departmentCode;
    dialogRef.afterClosed().subscribe((res:Employees)=> {
      console.log(res);
      if(res) {
        this.adviserEmployee = res;
        this.f["adviserEmployeeId"].setValue(res.employeeId);
      }
      this.f["adviserEmployeeId"].markAllAsTouched();
      this.f["adviserEmployeeId"].markAsDirty();
    })
  }
}
