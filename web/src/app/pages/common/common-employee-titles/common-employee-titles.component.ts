import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfigService } from 'src/app/services/app-config.service';
import { EmployeeTitlesService } from 'src/app/services/employee-titles.service';
import { StorageService } from 'src/app/services/storage.service';
import { AlertDialogModel } from 'src/app/shared/alert-dialog/alert-dialog-model';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { CommonEmployeeTitlesTableColumn } from 'src/app/shared/utility/table';
import { convertNotationToObject } from 'src/app/shared/utility/utility';
import { Schools } from 'src/app/model/schools';
import { SelectSchoolDialogComponent } from 'src/app/shared/select-school-dialog/select-school-dialog.component';
import { Location } from '@angular/common';
import { forkJoin } from 'rxjs';
import { SchoolsService } from 'src/app/services/schools.service';
import { EmployeeTitles } from 'src/app/model/employee-titles';
import { CommonEmployeeTitleFormComponent } from './common-employee-titles-form/common-employee-titles-form.component';
import { SpinnerVisibilityService } from 'ng-http-loader';

@Component({
  selector: 'app-common-employee-titles',
  templateUrl: './common-employee-titles.component.html',
  styleUrls: ['./common-employee-titles.component.scss'],
  host: {
    class: "page-component"
  }
})
export class CommonEmployeeTitleComponent {
  currentUserId:string;
  error:string;
  dataSource = new MatTableDataSource<CommonEmployeeTitlesTableColumn>();
  columnDefs = [];
  displayedColumns = [];
  isLoading = false;
  isProcessing = false;
  pageIndex = 0;
  pageSize = 10;
  total = 0;
  order: any = { employeeTitleCode: "DESC" };

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
    private employeeTitlesService: EmployeeTitlesService,
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
      this.appConfig.config.tableColumns.employeeTitles.forEach(x=> {
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
      this.getEmployeeTitlesPaginated(),
    ]).then(([school, employeeTitle])=> {
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
    this.getEmployeeTitlesPaginated();
  }

  async pageChange(event: { pageIndex: number, pageSize: number }) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    await this.getEmployeeTitlesPaginated();
  }

  async sortChange(event: { active: string, direction: string }) {
    const { active, direction } = event;
    const { apiNotation } = this.appConfig.config.tableColumns.employeeTitles.find(x=>x.name === active);
    this.order = convertNotationToObject(apiNotation, direction.toUpperCase());
    this.getEmployeeTitlesPaginated()
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
          this._location.go("/ops/employee-titles/find/" + res?.schoolCode);
        } else {
          this._location.go("/org/employee-titles/find/" + res?.schoolCode);
        }
        this.getEmployeeTitlesPaginated();
      }
    })
  }

  getEmployeeTitlesPaginated(){
    try{
      if(this.selectedSchool?.schoolCode) {
        const findIndex = this.filter.findIndex(x=>x.apiNotation === "school.schoolCode");
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
        this.isLoading = true;
        this.spinner.show();
        this.employeeTitlesService.getByAdvanceSearch({
          order: this.order,
          columnDef: this.filter,
          pageIndex: this.pageIndex, pageSize: this.pageSize
        })
        .subscribe(async res => {
          if(res.success){
            let data = res.data.results.map((d)=>{
              return {
                employeeTitleCode: d.employeeTitleCode,
                name: d.name,
              } as CommonEmployeeTitlesTableColumn
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

  controlMenuItemSelected(type: "edit" | "delete", data: CommonEmployeeTitlesTableColumn) {
    console.log(type, data);
    if(type === "edit") {
      const dialogRef = this.dialog.open(CommonEmployeeTitleFormComponent, {
        maxWidth: '400px',
        width: '400px',
        disableClose: true,
        panelClass: "form-dialog"
      });
      dialogRef.componentInstance.employeeTitleCode = data.employeeTitleCode;
      dialogRef.componentInstance.currentUserId = this.currentUserId;
      dialogRef.componentInstance.initDetails();
      dialogRef.afterClosed().subscribe(res=> {
        this.getEmployeeTitlesPaginated();
      });
    } else if(type === "delete") {
      this.onDelete(data.employeeTitleCode);
    }
  }

  newEmployeeTitleDialog() {
    const dialogRef = this.dialog.open(CommonEmployeeTitleFormComponent, {
      maxWidth: '400px',
      width: '400px',
      disableClose: true,
      panelClass: "form-dialog"
    });
    dialogRef.componentInstance.isNew = true;
    dialogRef.componentInstance.schoolId = this.selectedSchool?.schoolId;
    dialogRef.componentInstance.currentUserId = this.currentUserId;
    dialogRef.afterClosed().subscribe(res=> {
      this.getEmployeeTitlesPaginated();
    });
  }

  onDelete(employeeTitleCode: string) {
    const dialogData = new AlertDialogModel();
    dialogData.title = 'Confirm';
    dialogData.message = 'Delete employeeTitle?';
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
        let res = await this.employeeTitlesService.delete(employeeTitleCode).toPromise();
        if (res.success) {
          this.snackBar.open('EmployeeTitle deleted!', 'close', {
            panelClass: ['style-success'],
          });
          this.isProcessing = false;
          dialogRef.componentInstance.isProcessing = this.isProcessing;
          dialogRef.close();
          this.getEmployeeTitlesPaginated();
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
