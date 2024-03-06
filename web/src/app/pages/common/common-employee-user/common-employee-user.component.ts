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
import { CommonEmployeeUserTableColumn, CommonEmployeesTableColumn } from 'src/app/shared/utility/table';
import { convertNotationToObject } from 'src/app/shared/utility/utility';
import { Location } from '@angular/common';
import { Departments } from 'src/app/model/departments';
import { DepartmentsService } from 'src/app/services/departments.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { EmployeeUserAccess } from 'src/app/model/employee-user-access';
import { EmployeeUserAccessService } from 'src/app/services/employee-user-access.service';
import { SelectEmployeeUserAccessDialogComponent } from 'src/app/shared/select-employee-user-access-dialog/select-employee-user-access-dialog.component';
import { EmployeeUserService } from 'src/app/services/employee-user.service';

@Component({
  selector: 'app-common-employee-user',
  templateUrl: './common-employee-user.component.html',
  styleUrls: ['./common-employee-user.component.scss'],
  host: {
    class: "page-component"
  }
})
export class CommonEmployeeUserComponent {
  currentUserId:string;
  error:string;
  dataSource = new MatTableDataSource<CommonEmployeeUserTableColumn>();
  columnDefs = [];
  displayedColumns = [];
  isLoading = false;
  isProcessing = false;
  pageIndex = 0;
  pageSize = 10;
  total = 0;
  order: any = { employee: { employeeCode: "DESC" } };

  filter: {
    apiNotation: string;
    filter: any;
    name?: string;
    type: string;
  }[] = [];

  requestingAccess = 0;
  selectedSchool: Schools;
  selectedEmployeeUserAccess: EmployeeUserAccess;
  mode: 'OPERATION' | 'ORGANIZATION';
  constructor(
    private spinner: SpinnerVisibilityService,
    private _location: Location,
    private employeeUserService: EmployeeUserService,
    private schoolsService: SchoolsService,
    private employeeUserAccessService: EmployeeUserAccessService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public appConfig: AppConfigService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    public router: Router) {
      const currentProfile = this.storageService.getLoginProfile();
      this.currentUserId = currentProfile?.user?.userId;
      this.dataSource = new MatTableDataSource([]);
      this.selectedSchool = new Schools();
      if(this.route.snapshot.data) {
        this.mode = this.route.snapshot.data["mode"];
        this.selectedEmployeeUserAccess = new EmployeeUserAccess();
        if(this.mode === "OPERATION") {
          this.selectedSchool.schoolCode = this.route.snapshot.paramMap.get('schoolCode');
          if(!this.selectedSchool?.schoolCode || this.selectedSchool?.schoolCode === '') {
            this.selectedSchool.schoolCode = this.storageService.getOpsRecentSchool();
          }
        } else {
          this.selectedSchool.schoolCode = currentProfile?.employee?.school?.schoolCode;
        }
        this.selectedEmployeeUserAccess.employeeUserAccessCode = this.route.snapshot.paramMap.get('employeeUserAccessCode');
        if(this.selectedSchool?.schoolCode && this.selectedSchool?.schoolCode !== "" && (!this.selectedEmployeeUserAccess?.employeeUserAccessCode || this.selectedEmployeeUserAccess?.employeeUserAccessCode === '')) {
          if(this.mode === "OPERATION") {
            this.router.navigate(["/ops/employee-user/find/" +this.selectedSchool?.schoolCode]);
          } else {
            this.router.navigate(["/org/employee-user"])
          }
        }
      }
      this.appConfig.config.tableColumns.employeeUser.forEach(x=> {
        if(x.name === "menu") {
          const menu = [{
            "name": "details",
            "label": "Details"
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
  }

  async ngAfterViewInit() {
    const currentSelectedSchool = this.selectedSchool?.schoolCode ? this.selectedSchool?.schoolCode : "";
    const currentSelectedDepartment = this.selectedEmployeeUserAccess?.employeeUserAccessCode ? this.selectedEmployeeUserAccess?.employeeUserAccessCode : "";
    Promise.all([
      currentSelectedSchool && currentSelectedSchool !== "" ? this.schoolsService.getByCode(currentSelectedSchool).toPromise() : null,
      currentSelectedDepartment && currentSelectedDepartment !== "" ? this.employeeUserAccessService.getByCode(currentSelectedDepartment).toPromise() : null,
      this.getEmployeeUserPaginated(),
    ]).then(([school, employeeUserAccess, employee])=> {
      if(school?.success && school?.data && school.data?.schoolName) {
        this.selectedSchool = school.data;
      }
      if(employeeUserAccess?.success && employeeUserAccess?.data && employeeUserAccess.data?.employeeUserAccessCode) {
        this.selectedEmployeeUserAccess = employeeUserAccess.data;
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
    this.getEmployeeUserPaginated();
  }

  async pageChange(event: { pageIndex: number, pageSize: number }) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    await this.getEmployeeUserPaginated();
  }

  async sortChange(event: { active: string, direction: string }) {
    const { active, direction } = event;
    const { apiNotation } = this.appConfig.config.tableColumns.employees.find(x=>x.name === active);
    this.order = convertNotationToObject(apiNotation, direction.toUpperCase());
    this.getEmployeeUserPaginated()
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
        if(this.mode === "OPERATION") {
          this._location.go("/ops/employees/find/" + res?.schoolCode);
        } else {
          this._location.go("/org/employees/find/" + res?.schoolCode);
        }
        this.getEmployeeUserPaginated();
      }
    })
  }

  showSelectEmployeeUserAccessDialog() {
    const dialogRef = this.dialog.open(SelectEmployeeUserAccessDialogComponent, {
        disableClose: true,
        panelClass: "select-employeeUserAccess-dialog"
    });
    dialogRef.componentInstance.selected = {
      employeeUserAccessCode: this.selectedEmployeeUserAccess?.employeeUserAccessCode,
      name: this.selectedEmployeeUserAccess?.name,
      selected: true
    }
    dialogRef.componentInstance.schoolCode = this.selectedSchool?.schoolCode;
    dialogRef.afterClosed().subscribe((res:EmployeeUserAccess)=> {
      console.log(res);
      this.selectedEmployeeUserAccess = res;
      if(this.mode === "OPERATION") {
        this._location.go("/ops/employee-user/find/" + this.selectedSchool?.schoolCode + "/role/" + this.selectedEmployeeUserAccess?.employeeUserAccessCode);
      } else {
        this._location.go("/org/employee-user/find/" + this.selectedSchool?.schoolCode + "/role/" + this.selectedEmployeeUserAccess?.employeeUserAccessCode);
      }
      this.getEmployeeUserPaginated();
    })
  }

  getEmployeeUserPaginated(){
    try{
      if(!this.selectedSchool?.schoolCode || this.selectedSchool?.schoolCode === "") {
        return;
      }
      let findIndex = this.filter.findIndex(x=>x.apiNotation === "employee.school.schoolCode");
      if(findIndex >= 0) {
        this.filter[findIndex] = {
          apiNotation: "employee.school.schoolCode",
          filter: this.selectedSchool?.schoolCode,
          type: "precise"
        };
      } else {
        this.filter.push({
          apiNotation: "employee.school.schoolCode",
          filter: this.selectedSchool?.schoolCode,
          type: "precise"
        });
      }
      findIndex = this.filter.findIndex(x=>x.apiNotation === "employeeUserAccess.employeeUserAccessCode");
      if(findIndex >= 0) {
        this.filter[findIndex] = {
          apiNotation: "employeeUserAccess.employeeUserAccessCode",
          filter: this.selectedEmployeeUserAccess?.employeeUserAccessCode,
          type: "precise"
        };
      } else {
        this.filter.push({
          apiNotation: "employeeUserAccess.employeeUserAccessCode",
          filter: this.selectedEmployeeUserAccess?.employeeUserAccessCode,
          type: "precise"
        });
      }
      this.isLoading = true;
      this.spinner.show();
      this.employeeUserService.getByAdvanceSearch({
        order: this.order,
        columnDef: this.filter,
        pageIndex: this.pageIndex, pageSize: this.pageSize
      })
      .subscribe(async res => {
        if(res.success){
          let data = res.data.results.map((d)=>{
            return {
              employeeCode: d.employee?.employeeCode,
              orgEmployeeId: d.employee?.orgEmployeeId,
              fullName: d.employee?.fullName,
              mobileNumber: d.employee?.mobileNumber,
              userName: d.user?.userName,
              employeeUserAccess: d.employeeUserAccess?.name,
              url: `${(this.mode === 'OPERATION' ? '/ops' : '/org')}/employee-user/${d.employee?.employeeCode}`,
            } as CommonEmployeeUserTableColumn
          });
          this.total = res.data.total;
          this.requestingAccess = res.data.requestingAccess;
          this.dataSource = new MatTableDataSource(data);
          this.isLoading = false;
          this.spinner.hide();
        }
        else{
          this.error = Array.isArray(res.message) ? res.message[0] : res.message;
          this.snackBar.open(this.error, 'close', {panelClass: ['style-error']});
          this.isLoading = false;
          this.spinner.hide();
        }
      }, async (err) => {
        this.error = Array.isArray(err.message) ? err.message[0] : err.message;
        this.snackBar.open(this.error, 'close', {panelClass: ['style-error']});
        this.isLoading = false;
        this.spinner.hide();
      });
    }
    catch(e){
      this.error = Array.isArray(e.message) ? e.message[0] : e.message;
      this.snackBar.open(this.error, 'close', {panelClass: ['style-error']});
      this.isLoading = false;
      this.spinner.hide();
    }

  }

  controlMenuItemSelected(type: "details" | "delete", data: CommonEmployeesTableColumn) {
    console.log(type, data);
    if(type === "details") {
      this.router.navigate([(this.mode === 'OPERATION' ? '/ops' : '/org') + "/employee-user/" + data.employeeCode]);
    } else if(type === "delete") {
      this.onDelete(data.employeeCode);
    }
  }

  onDelete(employeeCode: string) {
    const dialogData = new AlertDialogModel();
    dialogData.title = 'Confirm';
    dialogData.message = 'Delete Employee user?';
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
        let res = await this.employeeUserService.delete(employeeCode).toPromise();
        if (res.success) {
          this.snackBar.open('Employee user deleted!', 'close', {
            panelClass: ['style-success'],
          });
          this.isProcessing = false;
          dialogRef.componentInstance.isProcessing = this.isProcessing;
          dialogRef.close();
          this.getEmployeeUserPaginated();
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
