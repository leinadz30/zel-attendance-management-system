import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Schools } from 'src/app/model/schools';
import { AppConfigService } from 'src/app/services/app-config.service';
import { LinkStudentRequestService } from 'src/app/services/link-student-request.service';
import { SchoolsService } from 'src/app/services/schools.service';
import { StorageService } from 'src/app/services/storage.service';
import { AlertDialogModel } from 'src/app/shared/alert-dialog/alert-dialog-model';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { SelectSchoolDialogComponent } from 'src/app/shared/select-school-dialog/select-school-dialog.component';
import { OpsLinkStudentRequestTableColumn } from 'src/app/shared/utility/table';
import { convertNotationToObject } from 'src/app/shared/utility/utility';
import { Location } from '@angular/common';
import { OpsParentDetailsComponent } from '../../parents/ops-parent-details/ops-parent-details.component';
import { OpsLinkStudentRequestDetailsComponent } from './ops-link-student-request-details/ops-link-student-request-details.component';
import { OpsStudentFormComponent } from '../ops-students/ops-students-form/ops-students-form.component';
import { Operators } from 'src/app/model/operators';

@Component({
  selector: 'app-ops-link-student-request',
  templateUrl: './ops-link-student-request.component.html',
  styleUrls: ['./ops-link-student-request.component.scss'],
  host: {
    class: "page-component"
  }
})
export class OpsLinkStudentRequestComponent {
  currentOperatorCode:string;
  error:string;
  dataSource = new MatTableDataSource<OpsLinkStudentRequestTableColumn>();
  columnDefs = [];
  displayedColumns = [];
  isLoading = false;
  isProcessing = false;
  pageIndex = 0;
  pageSize = 10;
  total = 0;
  order: any = { linkStudentRequestCode: "DESC" };

  filter: {
    apiNotation: string;
    filter: any;
    name?: string;
    type: string;
  }[] = [];

  requestingAccess = 0;
  selectedSchool: Schools;

  constructor(
    private _location: Location,
    private linkStudentRequestService: LinkStudentRequestService,
    private schoolsService: SchoolsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public appConfig: AppConfigService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    public router: Router) {
      this.dataSource = new MatTableDataSource([]);
      if(this.route.snapshot.data) {
      }
      this.selectedSchool = new Schools();
      this.selectedSchool.schoolCode = this.route.snapshot.paramMap.get('schoolCode');
      if(!this.selectedSchool?.schoolCode || this.selectedSchool?.schoolCode === '') {
        this.selectedSchool.schoolCode = this.storageService.getOpsRecentSchool();
      }
      this.appConfig.config.tableColumns.linkStudentRequest.forEach(x=> {
        this.columnDefs.push(x)
      });
    }

  ngOnInit(): void {
    const profile = this.storageService.getLoginProfile();
    this.currentOperatorCode = profile["operatorCode"];
  }

  async ngAfterViewInit() {
    const currentSelectedSchool = this.selectedSchool?.schoolCode ? this.selectedSchool?.schoolCode : "";
    Promise.all([
      currentSelectedSchool && currentSelectedSchool !== "" ? this.schoolsService.getByCode(currentSelectedSchool).toPromise() : null,
      this.getLinkStudentRequestPaginated(),
    ]).then(([school, linkStudentRequest])=> {
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
    this.getLinkStudentRequestPaginated();
  }

  async pageChange(event: { pageIndex: number, pageSize: number }) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    await this.getLinkStudentRequestPaginated();
  }

  async sortChange(event: { active: string, direction: string }) {
    const { active, direction } = event;
    const { apiNotation } = this.appConfig.config.tableColumns.linkStudentRequest.find(x=>x.name === active);
    this.order = convertNotationToObject(apiNotation, direction.toUpperCase());
    this.getLinkStudentRequestPaginated()
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
        this._location.go("/ops/linkStudentRequest/find/" + res?.schoolCode);
        this.getLinkStudentRequestPaginated();
      }
    })
  }

  getLinkStudentRequestPaginated(){
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
        this.linkStudentRequestService.getByAdvanceSearch({
          order: this.order,
          columnDef: this.filter,
          pageIndex: this.pageIndex, pageSize: this.pageSize
        })
        .subscribe(async res => {
          if(res.success){
            let data = res.data.results.map((d)=>{
              let menu = [];
              if(d.status === "PENDING") {
                menu = [{
                  "name": "details",
                  "label": "Request Details"
                },{
                  "name": "student",
                  "label": "Student Information"
                },{
                  "name": "parent",
                  "label": "Parent Information"
                },{
                  "name": "approve",
                  "label": "Approve"
                },{
                  "name": "reject",
                  "label": "Reject"
                }]
              } else {
                menu = [{
                  "name": "details",
                  "label": "Request Details"
                }]
              }
              return {
                dateRequested: d.dateRequested.toString(),
                status: d.status,
                student: d.student.fullName,
                studentCode: d.student.studentCode,
                requestedByParent: d.requestedByParent.fullName,
                requestedByParentCode: d.requestedByParent.parentCode,
                linkStudentRequestCode: d.linkStudentRequestCode,
                menu
              } as OpsLinkStudentRequestTableColumn
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
    }
    catch(e){
      this.error = Array.isArray(e.message) ? e.message[0] : e.message;
      this.snackBar.open(this.error, 'close', {panelClass: ['style-error']});
    }

  }

  controlMenuItemSelected(type: "details" | "student" | "parent" | "approve" | "reject", data: OpsLinkStudentRequestTableColumn) {
    console.log(type, data);
    if(type === "details") {
      const dialogRef = this.dialog.open(OpsLinkStudentRequestDetailsComponent, {
        maxWidth: '720px',
        width: '720px',
        disableClose: true,
        panelClass: "form-dialog"
      });
      dialogRef.componentInstance.linkStudentRequestCode = data.linkStudentRequestCode;
      dialogRef.componentInstance.initDetails();
    }
    else if(type === "student") {
      const dialogRef = this.dialog.open(OpsStudentFormComponent, {
        maxWidth: '720px',
        width: '720px',
        disableClose: true,
        panelClass: "form-dialog"
      });
      dialogRef.componentInstance.title = "Student Information";
      dialogRef.componentInstance.studentCode = data.studentCode;
      dialogRef.componentInstance.initDetails();
      dialogRef.componentInstance.studentForm.disable();
    }
    else if(type === "parent") {
      const dialogRef = this.dialog.open(OpsParentDetailsComponent, {
        maxWidth: '720px',
        width: '720px',
        disableClose: true,
        panelClass: "form-dialog"
      });
      dialogRef.componentInstance.parentCode = data.requestedByParentCode;
      dialogRef.componentInstance.currentOperatorCode = this.currentOperatorCode;
      dialogRef.componentInstance.initDetails();
    } else if(type === "approve") {
      this.updateStatus(data.linkStudentRequestCode, "APPROVED");
    } else if(type === "reject") {
      this.updateStatus(data.linkStudentRequestCode, "REJECTED");
    }
  }

  updateStatus(linkStudentRequestCode, status: "APPROVED" | "REJECTED") {
    const dialogData = new AlertDialogModel();
    dialogData.title = 'Confirm';
    if(status === "REJECTED") {
      dialogData.message = 'Are you sure you want to reject request?';
    } else if(status === "APPROVED") {
      dialogData.message = 'Are you sure you want to approve request?';
    }
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
        const profile: Operators = this.storageService.getLoginProfile();
        const params = {
          updatedByUserId: profile.user.userId,
        } as any;
        let res;
        if(status === "APPROVED") {
          res = await this.linkStudentRequestService.approve(linkStudentRequestCode, params).toPromise();
          if(res.success) {
            this.snackBar.open('Approved!', 'close', {
              panelClass: ['style-success'],
            });
          }
        } else {
          res = await this.linkStudentRequestService.reject(linkStudentRequestCode, params).toPromise();
          if(res.success) {
            this.snackBar.open('Rejected!', 'close', {
              panelClass: ['style-success'],
            });
          }
        }
        if (res.success) {
          this.getLinkStudentRequestPaginated();
          this.isProcessing = false;
          dialogRef.componentInstance.isProcessing = this.isProcessing;
          await this.ngAfterViewInit();
          dialogRef.close();
          this.dialog.closeAll();
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

