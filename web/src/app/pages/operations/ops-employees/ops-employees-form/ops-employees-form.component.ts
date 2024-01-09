import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Subscription, forkJoin } from 'rxjs';
import { Departments } from 'src/app/model/departments';
import { SchoolYearLevels } from 'src/app/model/school-year-levels';
import { Schools } from 'src/app/model/schools';
import { EmployeesService } from 'src/app/services/employees.service';
import { StorageService } from 'src/app/services/storage.service';
import { AlertDialogModel } from 'src/app/shared/alert-dialog/alert-dialog-model';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { MyErrorStateMatcher } from 'src/app/shared/form-validation/error-state.matcher';
import { SelectDepartmentDialogComponent } from 'src/app/shared/select-department-dialog/select-department-dialog.component';
import { SelectSchoolYearLevelDialogComponent } from 'src/app/shared/select-school-year-level-dialog/select-school-year-level-dialog.component';
import { DepartmentsService } from 'src/app/services/departments.service';
import { EmployeeTitles } from 'src/app/model/employee-titles';
import { SelectEmployeeTitleDialogComponent } from 'src/app/shared/select-employee-title-dialog/select-employee-title-dialog.component';
import { Employees } from 'src/app/model/employees';

@Component({
  selector: 'app-ops-employees-form',
  templateUrl: './ops-employees-form.component.html',
  styleUrls: ['./ops-employees-form.component.scss']
})
export class OpsEmployeeFormComponent {
  employeeCode;
  isNew = false;
  error;
  isLoading = true;
  employeeForm: FormGroup;
  mediaWatcher: Subscription;
  matcher = new MyErrorStateMatcher();
  isProcessing = false;
  employee: Employees;
  school: Schools;
  department: Departments;
  employeeTitle: EmployeeTitles;
  currentOperatorCode;

  constructor(
    private formBuilder: FormBuilder,
    private employeesService: EmployeesService,
    private departmentsService: DepartmentsService,
    private storageService: StorageService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private spinner: SpinnerVisibilityService,
    public dialogRef: MatDialogRef<OpsEmployeeFormComponent>) {
      this.employeeForm = this.formBuilder.group(
        {
          orgEmployeeId: new FormControl(),
          firstName: new FormControl(null, Validators.required),
          middleInitial: new FormControl(null),
          lastName: new FormControl(null, Validators.required),
          mobileNumber: new FormControl(),
          cardNumber: new FormControl(),
          departmentId: new FormControl(null, Validators.required),
          employeeTitleId: new FormControl(null, Validators.required)
        }
      );
  }
  get f() {
    return this.employeeForm.controls;
  }
  get formIsValid() {
    return this.employeeForm.valid;
  }
  get formIsReady() {
    return this.employeeForm.valid && this.employeeForm.dirty;
  }
  get formData() {
    return this.employeeForm.value;
  }

  async initDetails() {
    try {
      forkJoin([
        this.employeesService.getByCode(this.employeeCode).toPromise()
      ]).subscribe(([employee])=> {
        if (employee.success) {
          this.employee = employee.data;
          this.employeeForm.patchValue({
            orgEmployeeId: employee.data.orgEmployeeId,
            firstName: employee.data.firstName,
            middleInitial: employee.data.middleInitial,
            lastName: employee.data.lastName,
            mobileNumber: employee.data.mobileNumber,
            cardNumber: employee.data.cardNumber,
            departmentId: employee.data.department.departmentId,
            employeeTitleId: employee.data.employeePosition.employeeTitleId
          });
          this.employeeTitle = employee.data?.employeePosition;
          this.employeeForm.updateValueAndValidity();
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.error = Array.isArray(employee.message) ? employee.message[0] : employee.message;
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
    if (this.employeeForm.invalid) {
      return;
    }

    const dialogData = new AlertDialogModel();
    dialogData.title = 'Confirm';
    dialogData.message = this.isNew ? 'Save employee' : 'Update employee?';
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
          res = await this.employeesService.create(params).toPromise();
        } else {
          params = {
            ...params,
            updatedByUserId: this.currentOperatorCode
          }
          res = await this.employeesService.update(this.employeeCode, params).toPromise();
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

  showSelectEmployeeTitleDialog() {
    const dialogRef = this.dialog.open(SelectEmployeeTitleDialogComponent, {
        disableClose: true,
        panelClass: "select-employee-title-dialog"
    });
    dialogRef.componentInstance.selected = {
      employeeTitleCode: this.employeeTitle?.employeeTitleCode,
      name: this.employeeTitle?.name,
      selected: true
    }
    dialogRef.componentInstance.schoolCode = this.school?.schoolCode;
    dialogRef.afterClosed().subscribe((res:EmployeeTitles)=> {
      console.log(res);
      if(res) {
        this.employeeTitle = res;
        this.f["employeeTitleId"].setValue(res.employeeTitleId);
      }
      this.f["employeeTitleId"].markAllAsTouched();
      this.f["employeeTitleId"].markAsDirty();
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
}
