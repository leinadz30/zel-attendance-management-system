import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Schools } from 'src/app/model/schools';
import { AppConfigService } from 'src/app/services/app-config.service';
import { SchoolYearLevelsService } from 'src/app/services/school-year-levels.service';
import { SchoolsService } from 'src/app/services/schools.service';
import { StorageService } from 'src/app/services/storage.service';
import { SelectSchoolDialogComponent } from 'src/app/shared/select-school-dialog/select-school-dialog.component';
import { OpsSchoolYearLevelsTableColumn } from 'src/app/shared/utility/table';
import { convertNotationToObject } from 'src/app/shared/utility/utility';
import { Location } from '@angular/common';
import { AlertDialogModel } from 'src/app/shared/alert-dialog/alert-dialog-model';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { OpsSchoolYearLevelFormComponent } from './ops-school-year-form/ops-school-year-form.component';

@Component({
  selector: 'app-ops-school-year-levels',
  templateUrl: './ops-school-year-levels.component.html',
  styleUrls: ['./ops-school-year-levels.component.scss'],
  host: {
    class: "page-component"
  }
})
export class OpsSchoolYearLevelsComponent {
  currentOperatorCode:string;
  error:string;
  dataSource = new MatTableDataSource<OpsSchoolYearLevelsTableColumn>();
  columnDefs = [];
  displayedColumns = [];
  isLoading = false;
  isProcessing = false;
  pageIndex = 0;
  pageSize = 10;
  total = 0;
  order: any = { schoolYearLevelCode: "DESC" };

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
    private schoolYearLevelsService: SchoolYearLevelsService,
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
      this.appConfig.config.tableColumns.schoolYearLevels.forEach(x=> {
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
    Promise.all([
      currentSelectedSchool && currentSelectedSchool !== "" ? this.schoolsService.getByCode(currentSelectedSchool).toPromise() : null,
      this.getSchoolYearLevelsPaginated(),
    ]).then(([school, schoolYearLevel])=> {
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
    this.getSchoolYearLevelsPaginated();
  }

  async pageChange(event: { pageIndex: number, pageSize: number }) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    await this.getSchoolYearLevelsPaginated();
  }

  async sortChange(event: { active: string, direction: string }) {
    const { active, direction } = event;
    const { apiNotation } = this.appConfig.config.tableColumns.schoolYearLevels.find(x=>x.name === active);
    this.order = convertNotationToObject(apiNotation, direction.toUpperCase());
    this.getSchoolYearLevelsPaginated()
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
        this._location.go("/ops/school-year-levels/find/" + res?.schoolCode);
        this.getSchoolYearLevelsPaginated();
      }
    })
  }

  getSchoolYearLevelsPaginated(){
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
        this.schoolYearLevelsService.getByAdvanceSearch({
          order: this.order,
          columnDef: this.filter,
          pageIndex: this.pageIndex, pageSize: this.pageSize
        })
        .subscribe(async res => {
          if(res.success){
            let data = res.data.results.map((d)=>{
              return {
                schoolYearLevelCode: d.schoolYearLevelCode,
                educationalStage: d.educationalStage,
                name: d.name,
              } as OpsSchoolYearLevelsTableColumn
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

  controlMenuItemSelected(type: "edit" | "delete", data: OpsSchoolYearLevelsTableColumn) {
    console.log(type, data);
    if(type === "edit") {
      const dialogRef = this.dialog.open(OpsSchoolYearLevelFormComponent, {
        maxWidth: '720px',
        width: '720px',
        disableClose: true,
        panelClass: "form-dialog"
      });
      dialogRef.componentInstance.schoolYearLevelCode = data.schoolYearLevelCode;
      dialogRef.componentInstance.currentOperatorCode = this.currentOperatorCode;
      dialogRef.componentInstance.initDetails();
      dialogRef.afterClosed().subscribe(res=> {
        this.getSchoolYearLevelsPaginated();
      });
    } else if(type === "delete") {
      this.onDelete(data.schoolYearLevelCode);
    }
  }

  newSchoolYearLevelDialog() {
    const dialogRef = this.dialog.open(OpsSchoolYearLevelFormComponent, {
      maxWidth: '720px',
      width: '720px',
      disableClose: true,
      panelClass: "form-dialog"
    });
    dialogRef.componentInstance.isNew = true;
    dialogRef.componentInstance.schoolId = this.selectedSchool?.schoolId;
    dialogRef.componentInstance.currentOperatorCode = this.currentOperatorCode;
    dialogRef.afterClosed().subscribe(res=> {
      this.getSchoolYearLevelsPaginated();
    });
  }

  onDelete(schoolYearLevelCode: string) {
    const dialogData = new AlertDialogModel();
    dialogData.title = 'Confirm';
    dialogData.message = 'Delete schoolYearLevel?';
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
        let res = await this.schoolYearLevelsService.delete(schoolYearLevelCode).toPromise();
        if (res.success) {
          this.snackBar.open('SchoolYearLevel deleted!', 'close', {
            panelClass: ['style-success'],
          });
          this.isProcessing = false;
          dialogRef.componentInstance.isProcessing = this.isProcessing;
          dialogRef.close();
          this.getSchoolYearLevelsPaginated();
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
