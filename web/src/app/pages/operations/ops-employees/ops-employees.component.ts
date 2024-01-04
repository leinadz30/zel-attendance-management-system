import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SchoolYearLevels } from 'src/app/model/school-year-levels';
import { Schools } from 'src/app/model/schools';
import { AppConfigService } from 'src/app/services/app-config.service';
import { EmployeesService } from 'src/app/services/employees.service';
import { SchoolYearLevelsService } from 'src/app/services/school-year-levels.service';
import { SchoolsService } from 'src/app/services/schools.service';
import { StorageService } from 'src/app/services/storage.service';
import { AlertDialogModel } from 'src/app/shared/alert-dialog/alert-dialog-model';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { SelectSchoolDialogComponent } from 'src/app/shared/select-school-dialog/select-school-dialog.component';
import { SelectSchoolYearLevelDialogComponent } from 'src/app/shared/select-school-year-level-dialog/select-school-year-level-dialog.component';
import { OpsEmployeesTableColumn } from 'src/app/shared/utility/table';
import { convertNotationToObject } from 'src/app/shared/utility/utility';
import { Location } from '@angular/common';
import { Departments } from 'src/app/model/departments';
import { DepartmentsService } from 'src/app/services/departments.service';
import { SelectDepartmentDialogComponent } from 'src/app/shared/select-department-dialog/select-department-dialog.component';
import { OpsEmployeeFormComponent } from './ops-employees-form/ops-employees-form.component';

@Component({
  selector: 'app-ops-employees',
  templateUrl: './ops-employees.component.html',
  styleUrls: ['./ops-employees.component.scss'],
  host: {
    class: "page-component"
  }
})
export class OpsEmployeesComponent {
  currentOperatorCode:string;
  error:string;
  dataSource = new MatTableDataSource<OpsEmployeesTableColumn>();
  columnDefs = [];
  displayedColumns = [];
  isLoading = false;
  isProcessing = false;
  pageIndex = 0;
  pageSize = 10;
  total = 0;
  order: any = { employeeCode: "DESC" };

  filter: {
    apiNotation: string;
    filter: any;
    name?: string;
    type: string;
  }[] = [];

  requestingAccess = 0;
  selectedSchool: Schools;
  selectedDepartment: Departments;

  constructor(
    private _location: Location,
    private employeesService: EmployeesService,
    private schoolsService: SchoolsService,
    private departmentsService: DepartmentsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public appConfig: AppConfigService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    public router: Router) {
      this.dataSource = new MatTableDataSource([]);
      if(this.route.snapshot.data) {
        this.selectedSchool = new Schools();
        this.selectedDepartment = new Departments();
        this.selectedSchool.schoolCode = this.route.snapshot.paramMap.get('schoolCode');
        this.selectedDepartment.departmentCode = this.route.snapshot.paramMap.get('departmentCode');
        if(!this.selectedSchool?.schoolCode || this.selectedSchool?.schoolCode === '') {
          this.selectedSchool.schoolCode = this.storageService.getOpsRecentSchool();
        }
        if(this.selectedSchool?.schoolCode && this.selectedSchool?.schoolCode !== "" && (!this.selectedDepartment?.departmentCode || this.selectedDepartment?.departmentCode === '')) {
          this.router.navigate(["/ops/employees/find/" +this.selectedSchool?.schoolCode]);
        }
      }
      this.appConfig.config.tableColumns.employees.forEach(x=> {
        if(x.name === "menu") {
          const menu = [{
            "name": "edit",
            "label": "Edit"
          },{
            "name": "delete",
            "label": "Delete"
          }];
          x["controlsMenu"] = menu;
        }
        this.columnDefs.push(x)
      });
    }

  ngOnInit(): void {
    const profile = this.storageService.getLoginProfile();
    this.currentOperatorCode = profile["operatorCode"];
  }

  async ngAfterViewInit() {
    const currentSelectedSchool = this.selectedSchool?.schoolCode ? this.selectedSchool?.schoolCode : "";
    const currentSelectedDepartment = this.selectedDepartment?.departmentCode ? this.selectedDepartment?.departmentCode : "";
    Promise.all([
      currentSelectedSchool && currentSelectedSchool !== "" ? this.schoolsService.getByCode(currentSelectedSchool).toPromise() : null,
      currentSelectedDepartment && currentSelectedDepartment !== "" ? this.departmentsService.getByCode(currentSelectedDepartment).toPromise() : null,
      this.getEmployeesPaginated(),
    ]).then(([school, department, employee])=> {
      if(school?.success && school?.data && school.data?.schoolName) {
        this.selectedSchool = school.data;
      }
      if(department?.success && department?.data && department.data?.departmentName) {
        this.selectedDepartment = department.data;
      }
    });



  }

  filterChange(event: {
    apiNotation: string;
    filter: string;
    name: string;
    type: string;
  }[]) {
    this.filter = event;
    this.getEmployeesPaginated();
  }

  async pageChange(event: { pageIndex: number, pageSize: number }) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    await this.getEmployeesPaginated();
  }

  async sortChange(event: { active: string, direction: string }) {
    const { active, direction } = event;
    const { apiNotation } = this.appConfig.config.tableColumns.employees.find(x=>x.name === active);
    this.order = convertNotationToObject(apiNotation, direction.toUpperCase());
    this.getEmployeesPaginated()
  }

  showSelectSchoolDialog() {
    const dialogRef = this.dialog.open(SelectSchoolDialogComponent, {
        disableClose: true,
        panelClass: "select-item-dialog"
    });
    dialogRef.componentInstance.selected = {
      schoolCode: this.selectedSchool?.schoolCode,
      schoolName: this.selectedSchool?.schoolName,
      selected: true
    }
    dialogRef.afterClosed().subscribe((res:Schools)=> {
      console.log(res);
      if(res) {
        this.selectedSchool = res;
        this.storageService.saveOpsRecentSchool(res.schoolCode);
        this._location.go("/ops/employees/find/" + res?.schoolCode);
        this.getEmployeesPaginated();
      }
    })
  }

  showSelectDepartmentDialog() {
    const dialogRef = this.dialog.open(SelectDepartmentDialogComponent, {
        disableClose: true,
        panelClass: "select-department-dialog"
    });
    dialogRef.componentInstance.selected = {
      departmentCode: this.selectedDepartment?.departmentCode,
      departmentName: this.selectedDepartment?.departmentName,
      selected: true
    }
    dialogRef.componentInstance.schoolCode = this.selectedSchool?.schoolCode;
    dialogRef.afterClosed().subscribe((res:Departments)=> {
      console.log(res);
      if(res) {
        this.selectedDepartment = res;
        this._location.go("/ops/employees/find/" + this.selectedSchool?.schoolCode + "/dept/" + this.selectedDepartment?.departmentCode);
        this.getEmployeesPaginated();
      }
    })
  }

  getEmployeesPaginated(){
    try{
      if(!this.selectedSchool?.schoolCode || this.selectedSchool?.schoolCode === "") {
        return;
      }
      let findIndex = this.filter.findIndex(x=>x.apiNotation === "school.schoolCode");
      if(findIndex >= 0) {
        this.filter[findIndex] = {
          apiNotation: "school.schoolCode",
          filter: this.selectedSchool?.schoolCode,
          type: "precise"
        };
      } else {
        this.filter.push({
          apiNotation: "school.schoolCode",
          filter: this.selectedSchool?.schoolCode,
          type: "precise"
        });
      }
      findIndex = this.filter.findIndex(x=>x.apiNotation === "department.departmentCode");
      if(findIndex >= 0) {
        this.filter[findIndex] = {
          apiNotation: "department.departmentCode",
          filter: this.selectedDepartment?.departmentCode,
          type: "precise"
        };
      } else {
        this.filter.push({
          apiNotation: "department.departmentCode",
          filter: this.selectedDepartment?.departmentCode,
          type: "precise"
        });
      }
      this.isLoading = true;
      this.employeesService.getByAdvanceSearch({
        order: this.order,
        columnDef: this.filter,
        pageIndex: this.pageIndex, pageSize: this.pageSize
      })
      .subscribe(async res => {
        if(res.success){
          let data = res.data.results.map((d)=>{
            return {
              employeeCode: d.employeeCode,
              fullName: d.fullName,
              mobileNumber: d.mobileNumber,
              cardNumber: d.cardNumber,
              department: d.department.departmentName,
            } as OpsEmployeesTableColumn
          });
          this.total = res.data.total;
          this.requestingAccess = res.data.requestingAccess;
          this.dataSource = new MatTableDataSource(data);
          this.isLoading = false;
        }
        else{
          this.error = Array.isArray(res.message) ? res.message[0] : res.message;
          this.snackBar.open(this.error, 'close', {panelClass: ['style-error']});
          this.isLoading = false;
        }
      }, async (err) => {
        this.error = Array.isArray(err.message) ? err.message[0] : err.message;
        this.snackBar.open(this.error, 'close', {panelClass: ['style-error']});
        this.isLoading = false;
      });
    }
    catch(e){
      this.error = Array.isArray(e.message) ? e.message[0] : e.message;
      this.snackBar.open(this.error, 'close', {panelClass: ['style-error']});
    }

  }

  controlMenuItemSelected(type: "edit" | "delete", data: OpsEmployeesTableColumn) {
    console.log(type, data);
    if(type === "edit") {
      const dialogRef = this.dialog.open(OpsEmployeeFormComponent, {
        maxWidth: '720px',
        width: '720px',
        disableClose: true,
        panelClass: "form-dialog"
      });
      dialogRef.componentInstance.school = this.selectedSchool;
      dialogRef.componentInstance.employeeCode = data.employeeCode;
      dialogRef.componentInstance.currentOperatorCode = this.currentOperatorCode;
      dialogRef.componentInstance.department = this.selectedDepartment && this.selectedDepartment?.departmentCode ? this.selectedDepartment : null;
      dialogRef.componentInstance.initDetails();
      dialogRef.afterClosed().subscribe(res=> {
        if(res) {
          this.getEmployeesPaginated();
        }
      });
    } else if(type === "delete") {
      this.onDelete(data.employeeCode);
    }
  }

  newEmployeeDialog() {
    const dialogRef = this.dialog.open(OpsEmployeeFormComponent, {
      maxWidth: '720px',
      width: '720px',
      disableClose: true,
      panelClass: "form-dialog"
    });
    dialogRef.componentInstance.isNew = true;
    dialogRef.componentInstance.school = this.selectedSchool;
    dialogRef.componentInstance.department = this.selectedDepartment && this.selectedDepartment?.departmentCode ? this.selectedDepartment : null;
    dialogRef.componentInstance.currentOperatorCode = this.currentOperatorCode;
    dialogRef.afterOpened().subscribe(()=> {
      if(this.selectedDepartment?.departmentId && this.selectedDepartment?.departmentId !== "") {
        dialogRef.componentInstance.f["departmentId"].setValue(this.selectedDepartment.departmentId);
        dialogRef.componentInstance.f["departmentId"].markAllAsTouched();
        dialogRef.componentInstance.f["departmentId"].markAsDirty();
      }
    });
    dialogRef.afterClosed().subscribe(res=> {
      if(res) {
        this.getEmployeesPaginated();
      }
    });
  }

  onDelete(employeeCode: string) {
    const dialogData = new AlertDialogModel();
    dialogData.title = 'Confirm';
    dialogData.message = 'Delete employee?';
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
        let res = await this.employeesService.delete(employeeCode).toPromise();
        if (res.success) {
          this.snackBar.open('Employee deleted!', 'close', {
            panelClass: ['style-success'],
          });
          this.isProcessing = false;
          dialogRef.componentInstance.isProcessing = this.isProcessing;
          dialogRef.close();
          this.getEmployeesPaginated();
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
