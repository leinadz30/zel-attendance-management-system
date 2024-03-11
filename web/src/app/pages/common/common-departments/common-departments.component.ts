import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfigService } from 'src/app/services/app-config.service';
import { DepartmentsService } from 'src/app/services/departments.service';
import { StorageService } from 'src/app/services/storage.service';
import { AlertDialogModel } from 'src/app/shared/alert-dialog/alert-dialog-model';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { CommonDepartmentsTableColumn } from 'src/app/shared/utility/table';
import { convertNotationToObject } from 'src/app/shared/utility/utility';
import { Schools } from 'src/app/model/schools';
import { SelectSchoolDialogComponent } from 'src/app/shared/select-school-dialog/select-school-dialog.component';
import { Location } from '@angular/common';
import { forkJoin } from 'rxjs';
import { SchoolsService } from 'src/app/services/schools.service';
import { Departments } from 'src/app/model/departments';
import { CommonDepartmentFormComponent } from './common-departments-form/common-departments-form.component';
import { SpinnerVisibilityService } from 'ng-http-loader';

@Component({
  selector: 'app-common-departments',
  templateUrl: './common-departments.component.html',
  styleUrls: ['./common-departments.component.scss'],
  host: {
    class: "page-component"
  }
})
export class CommonDepartmentsComponent {
  currentUserId:string;
  error:string;
  dataSource = new MatTableDataSource<CommonDepartmentsTableColumn>();
  columnDefs = [];
  displayedColumns = [];
  isLoading = false;
  isProcessing = false;
  pageIndex = 0;
  pageSize = 10;
  total = 0;
  order: any = { departmentCode: "DESC" };
  selectedType: 'STUDENT' | 'EMPLOYEE';

  filter: {
    apiNotation: string;
    filter: any;
    name?: string;
    type: string;
  }[] = [];

  requestingAccess = 0;
  selectedSchool: Schools;
  mode: 'OPERATION' | 'ORGANIZATION';

  constructor(
    private spinner: SpinnerVisibilityService,
    private _location: Location,
    private departmentsService: DepartmentsService,
    private schoolsService: SchoolsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public appConfig: AppConfigService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    public router: Router) {
      const currentProfile = this.storageService.getLoginProfile();
      this.currentUserId = currentProfile?.user?.userId;
      this.dataSource = new MatTableDataSource([]);
      if(this.route.snapshot.data) {
        this.mode = this.route.snapshot.data["mode"];
      }
      this.selectedSchool = new Schools();
      if(this.mode === "OPERATION") {
        this.selectedSchool.schoolCode = this.route.snapshot.paramMap.get('schoolCode');
        if(!this.selectedSchool?.schoolCode || this.selectedSchool?.schoolCode === '') {
          this.selectedSchool.schoolCode = this.storageService.getOpsRecentSchool();
        }
      } else {
        this.selectedSchool.schoolCode = currentProfile?.employee?.school?.schoolCode;
      }
      const type: any = this.route.snapshot.paramMap.get('type');
      this.selectedType = type;
      this.appConfig.config.tableColumns.departments.forEach(x=> {
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
  }

  async ngAfterViewInit() {
    const currentSelectedSchool = this.selectedSchool?.schoolCode ? this.selectedSchool?.schoolCode : "";
    Promise.all([
      currentSelectedSchool && currentSelectedSchool !== "" ? this.schoolsService.getByCode(currentSelectedSchool).toPromise() : null,
      this.getDepartmentsPaginated(),
    ]).then(([school, department])=> {
      if(school?.success && school?.data && school.data?.schoolName) {
        this.selectedSchool = school.data;
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
    this.getDepartmentsPaginated();
  }

  async onTypeChange() {
    if(this.mode === "OPERATION") {
      this._location.go("/ops/departments/find/" + this.selectedSchool?.schoolCode + "/type/" + this.selectedType);
    } else {
      this._location.go("/org/departments/find/" + this.selectedSchool?.schoolCode + "/type/" + this.selectedType);
    }
    await this.getDepartmentsPaginated();
  }

  async pageChange(event: { pageIndex: number, pageSize: number }) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    await this.getDepartmentsPaginated();
  }

  async sortChange(event: { active: string, direction: string }) {
    const { active, direction } = event;
    const { apiNotation } = this.appConfig.config.tableColumns.departments.find(x=>x.name === active);
    this.order = convertNotationToObject(apiNotation, direction.toUpperCase());
    this.getDepartmentsPaginated()
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
    dialogRef.afterClosed().subscribe((res:any)=> {
      console.log(res);
      if(res && !res?.cancel) {
        this.selectedSchool = res;
        this.storageService.saveOpsRecentSchool(res.schoolCode);
        if(this.mode === "OPERATION") {
          this._location.go("/ops/departments/find/" + res?.schoolCode);
        } else {
          this._location.go("/org/departments/find/" + res?.schoolCode);
        }
        this.getDepartmentsPaginated();
      }
    })
  }

  getDepartmentsPaginated(){
    try{
      if(this.selectedSchool?.schoolCode) {
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
        findIndex = this.filter.findIndex(x=>x.apiNotation === "type");
        if(findIndex >= 0) {
          this.filter[findIndex] = {
            apiNotation: "type",
            filter: this.selectedType,
            type: "precise"
          };
        } else {
          this.filter.push({
            apiNotation: "type",
            filter: this.selectedType,
            type: "precise"
          });
        }
        this.isLoading = true;
        this.spinner.show();
        this.departmentsService.getByAdvanceSearch({
          order: this.order,
          columnDef: this.filter,
          pageIndex: this.pageIndex, pageSize: this.pageSize
        })
        .subscribe(async res => {
          if(res.success){
            let data = res.data.results.map((d)=>{
              return {
                departmentCode: d.departmentCode,
                departmentName: d.departmentName,
                type: d.type === "EMPLOYEE" ? "Employee" : "Student",
              } as CommonDepartmentsTableColumn
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
    }
    catch(e){
      this.error = Array.isArray(e.message) ? e.message[0] : e.message;
      this.snackBar.open(this.error, 'close', {panelClass: ['style-error']});
      this.isLoading = false;
      this.spinner.hide();
    }

  }

  controlMenuItemSelected(type: "edit" | "delete", data: CommonDepartmentsTableColumn) {
    console.log(type, data);
    if(type === "edit") {
      const dialogRef = this.dialog.open(CommonDepartmentFormComponent, {
        maxWidth: '720px',
        width: '720px',
        disableClose: true,
        panelClass: "form-dialog"
      });
      dialogRef.componentInstance.departmentCode = data.departmentCode;
      dialogRef.componentInstance.currentUserId = this.currentUserId;
      dialogRef.componentInstance.initDetails();
      dialogRef.afterClosed().subscribe(res=> {
        this.getDepartmentsPaginated();
      });
    } else if(type === "delete") {
      this.onDelete(data.departmentCode);
    }
  }

  newDepartmentDialog() {
    const dialogRef = this.dialog.open(CommonDepartmentFormComponent, {
      maxWidth: '720px',
      width: '720px',
      disableClose: true,
      panelClass: "form-dialog"
    });
    dialogRef.componentInstance.isNew = true;
    dialogRef.componentInstance.selectedType = this.selectedType;
    dialogRef.componentInstance.schoolId = this.selectedSchool?.schoolId;
    dialogRef.componentInstance.currentUserId = this.currentUserId;
    dialogRef.afterClosed().subscribe(res=> {
      this.getDepartmentsPaginated();
    });
  }

  onDelete(departmentCode: string) {
    const dialogData = new AlertDialogModel();
    dialogData.title = 'Confirm';
    dialogData.message = 'Delete department?';
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
        let res = await this.departmentsService.delete(departmentCode).toPromise();
        if (res.success) {
          this.snackBar.open('Department deleted!', 'close', {
            panelClass: ['style-success'],
          });
          this.isProcessing = false;
          dialogRef.componentInstance.isProcessing = this.isProcessing;
          dialogRef.close();
          this.getDepartmentsPaginated();
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
