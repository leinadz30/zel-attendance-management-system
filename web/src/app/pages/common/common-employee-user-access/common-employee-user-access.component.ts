import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { EmployeeUserAccess } from 'src/app/model/employee-user-access';
import { EmployeeUserAccessService } from 'src/app/services/employee-user-access.service';
import { AppConfigService } from 'src/app/services/app-config.service';
import { StorageService } from 'src/app/services/storage.service';
import { AlertDialogModel } from 'src/app/shared/alert-dialog/alert-dialog-model';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { convertNotationToObject } from 'src/app/shared/utility/utility';
import { SelectSchoolDialogComponent } from 'src/app/shared/select-school-dialog/select-school-dialog.component';
import { Schools } from 'src/app/model/schools';
import { Location } from '@angular/common';
import { SchoolsService } from 'src/app/services/schools.service';

@Component({
  selector: 'app-common-employee-user-access',
  templateUrl: './common-employee-user-access.component.html',
  styleUrls: ['./common-employee-user-access.component.scss'],
  host: {
    class: "page-component"
  }
})
export class CommonEmployeeUserAccessComponent {
  currentUserId:string;
  error:string;
  dataSource = new MatTableDataSource<any>();
  displayedColumns = [];
  isLoading = false;
  isProcessing = false;
  pageIndex = 0;
  pageSize = 10;
  total = 0;
  order: any = { employeeUserAccessCode: "DESC" };

  filter: {
    apiNotation?: string;
    filter?: string;
    name?: string;
    type?: string;
  }[] = [];

  // pageAccess: Access = {
  //   view: true,
  //   modify: false,
  // };

  selectedSchool: Schools;
  mode: 'OPERATION' | 'ORGANIZATION';
  @ViewChild('employeeUserAccessFormDialog') employeeUserAccessFormDialogTemp: TemplateRef<any>;
  constructor(
    private spinner: SpinnerVisibilityService,
    private _location: Location,
    private employeeUserAccessService: EmployeeUserAccessService,
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
        // this.pageAccess = {
        //   ...this.pageAccess,
        //   ...this.route.snapshot.data["access"]
        // };
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
    }

  ngOnInit(): void {
    const profile = this.storageService.getLoginProfile();
    // this.currentUserId = profile && profile.userId;
  }

  ngAfterViewInit() {
    const currentSelectedSchool = this.selectedSchool?.schoolCode ? this.selectedSchool?.schoolCode : "";

    Promise.all([
      currentSelectedSchool && currentSelectedSchool !== "" ? this.schoolsService.getByCode(currentSelectedSchool).toPromise() : null,
      this.getEmployeeUserAccessPaginated(),
    ]).then(([school, employeeUserAccess])=> {
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
    this.getEmployeeUserAccessPaginated();
  }

  async pageChange(event: { pageIndex: number, pageSize: number }) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    await this.getEmployeeUserAccessPaginated();
  }

  async sortChange(event: { active: string, direction: string }) {
    const { active, direction } = event;
    const { apiNotation } = this.appConfig.config.tableColumns.employeeUserAccess.find(x=>x.name === active);
    this.order = convertNotationToObject(apiNotation, direction.toUpperCase());
    this.getEmployeeUserAccessPaginated()
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
          this._location.go("/ops/departments/find/" + res?.schoolCode);
        } else {
          this._location.go("/org/departments/find/" + res?.schoolCode);
        }
        this.getEmployeeUserAccessPaginated();
      }
    })
  }

  getEmployeeUserAccessPaginated(){
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
        this.employeeUserAccessService.getByAdvanceSearch({
          order: this.order,
          columnDef: this.filter,
          pageIndex: this.pageIndex, pageSize: this.pageSize
        })
        .subscribe(async res => {
          if(res.success){
            let data = res.data.results.map((d)=>{
              return {
                employeeUserAccessCode: d.employeeUserAccessCode,
                name: d.name,
                url: `${(this.mode === 'OPERATION' ? '/ops' : '/org')}/employee-user-access/${d.employeeUserAccessCode}`,
              } as any
            });
            this.total = res.data.total;
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

  showAddDialog() {
    this.dialog.open(this.employeeUserAccessFormDialogTemp)
  }

  closeNewAccessDialog() {
    this.dialog.closeAll();
  }

  saveNewAccess(formData) {
    formData = {
      ...formData,
      createdByUserId: this.currentUserId,
      schoolId: 1,
    }
    const dialogData = new AlertDialogModel();
    dialogData.title = 'Confirm';
    dialogData.message = 'Save User group?';
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
        let res = await this.employeeUserAccessService.create(formData).toPromise();
        if (res.success) {
          this.snackBar.open('Saved!', 'close', {
            panelClass: ['style-success'],
          });
          this.dialog.closeAll();
          this.router.navigate([(this.mode === 'OPERATION' ? '/ops' : '/org') + '/employee-user-access/' + res.data.employeeUserAccessCode]);
          this.isProcessing = false;
          dialogRef.componentInstance.isProcessing = this.isProcessing;
          dialogRef.close();
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
