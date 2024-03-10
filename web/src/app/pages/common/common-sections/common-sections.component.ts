import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Schools } from 'src/app/model/schools';
import { AppConfigService } from 'src/app/services/app-config.service';
import { SchoolsService } from 'src/app/services/schools.service';
import { SectionsService } from 'src/app/services/sections.service';
import { StorageService } from 'src/app/services/storage.service';
import { AlertDialogModel } from 'src/app/shared/alert-dialog/alert-dialog-model';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { SelectSchoolDialogComponent } from 'src/app/shared/select-school-dialog/select-school-dialog.component';
import { CommonSectionsTableColumn } from 'src/app/shared/utility/table';
import { convertNotationToObject } from 'src/app/shared/utility/utility';
import { Location } from '@angular/common';
import { SchoolYearLevels } from 'src/app/model/school-year-levels';
import { SelectSchoolYearLevelDialogComponent } from 'src/app/shared/select-school-year-level-dialog/select-school-year-level-dialog.component';
import { CommonSectionFormComponent } from './common-sections-form/common-sections-form.component';
import { SchoolYearLevelsService } from 'src/app/services/school-year-levels.service';
import { SpinnerVisibilityService } from 'ng-http-loader';

@Component({
  selector: 'app-common-sections',
  templateUrl: './common-sections.component.html',
  styleUrls: ['./common-sections.component.scss'],
  host: {
    class: "page-component"
  }
})
export class CommonSectionsComponent {
  currentUserId:string;
  error:string;
  dataSource = new MatTableDataSource<CommonSectionsTableColumn>();
  columnDefs = [];
  displayedColumns = [];
  isLoading = false;
  isProcessing = false;
  pageIndex = 0;
  pageSize = 10;
  total = 0;
  order: any = { sectionCode: "DESC" };

  filter: {
    apiNotation: string;
    filter: any;
    name?: string;
    type: string;
  }[] = [];

  requestingAccess = 0;
  selectedSchool: Schools;
  selectedSchoolYearLevel: SchoolYearLevels;
  mode: 'OPERATION' | 'ORGANIZATION';

  constructor(
    private spinner: SpinnerVisibilityService,
    private _location: Location,
    private sectionsService: SectionsService,
    private schoolsService: SchoolsService,
    private schoolYearLevel: SchoolYearLevelsService,
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
      this.selectedSchoolYearLevel = new SchoolYearLevels();
      if(this.mode === "OPERATION") {
        this.selectedSchool.schoolCode = this.route.snapshot.paramMap.get('schoolCode');
        if(!this.selectedSchool?.schoolCode || this.selectedSchool?.schoolCode === '') {
          this.selectedSchool.schoolCode = this.storageService.getOpsRecentSchool();
        }
      } else {
        this.selectedSchool.schoolCode = currentProfile?.employee?.school?.schoolCode;
      }
      this.selectedSchoolYearLevel.schoolYearLevelCode = this.route.snapshot.paramMap.get('schoolYearLevelCode');
      if(this.selectedSchool?.schoolCode && this.selectedSchool?.schoolCode !== "" && (!this.selectedSchoolYearLevel?.schoolYearLevelCode || this.selectedSchoolYearLevel?.schoolYearLevelCode === '')) {
        if(this.mode === "OPERATION") {
          this.router.navigate(["/ops/sections/find/" +this.selectedSchool?.schoolCode]);
        } else {
          this.router.navigate(["/org/sections/"]);
        }
      }
      this.appConfig.config.tableColumns.sections.forEach(x=> {
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
    const currentSelectedSchoolYearLevel = this.selectedSchoolYearLevel?.schoolYearLevelCode ? this.selectedSchoolYearLevel?.schoolYearLevelCode : "";
    Promise.all([
      currentSelectedSchool && currentSelectedSchool !== "" ? this.schoolsService.getByCode(currentSelectedSchool).toPromise() : null,
      currentSelectedSchoolYearLevel && currentSelectedSchoolYearLevel !== "" ? this.schoolYearLevel.getByCode(currentSelectedSchoolYearLevel).toPromise() : null,
      this.getSectionsPaginated(),
    ]).then(([school, schoolYearLevel, section])=> {
      if(school?.success && school?.data && school.data?.schoolName) {
        this.selectedSchool = school.data;
      }
      if(schoolYearLevel?.success && schoolYearLevel?.data && schoolYearLevel.data?.name) {
        this.selectedSchoolYearLevel = schoolYearLevel.data;
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
    this.getSectionsPaginated();
  }

  async pageChange(event: { pageIndex: number, pageSize: number }) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    await this.getSectionsPaginated();
  }

  async sortChange(event: { active: string, direction: string }) {
    const { active, direction } = event;
    const { apiNotation } = this.appConfig.config.tableColumns.sections.find(x=>x.name === active);
    this.order = convertNotationToObject(apiNotation, direction.toUpperCase());
    this.getSectionsPaginated()
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
        this._location.go("/ops/sections/find/" + res?.schoolCode);
        this.getSectionsPaginated();
      }
    })
  }

  showSelectSchoolYearLevelDialog() {
    const dialogRef = this.dialog.open(SelectSchoolYearLevelDialogComponent, {
        disableClose: true,
        panelClass: "select-school-year-level-dialog"
    });
    dialogRef.componentInstance.selected = {
      schoolYearLevelCode: this.selectedSchoolYearLevel?.schoolYearLevelCode,
      name: this.selectedSchoolYearLevel?.name,
      selected: true
    }
    dialogRef.componentInstance.schoolCode = this.selectedSchool?.schoolCode;
    dialogRef.afterClosed().subscribe((res:SchoolYearLevels)=> {
      console.log(res);
      this.selectedSchoolYearLevel = res;
      this._location.go("/ops/sections/find/" + this.selectedSchool?.schoolCode + (this.selectedSchoolYearLevel?.schoolYearLevelCode ? "/sylvl/" + this.selectedSchoolYearLevel?.schoolYearLevelCode : ""));
      this.getSectionsPaginated();
    })
  }

  getSectionsPaginated(){
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
      findIndex = this.filter.findIndex(x=>x.apiNotation === "schoolYearLevel.schoolYearLevelCode");
      if(findIndex >= 0) {
        this.filter[findIndex] = {
          apiNotation: "schoolYearLevel.schoolYearLevelCode",
          filter: this.selectedSchoolYearLevel?.schoolYearLevelCode,
          type: "precise"
        };
      } else {
        this.filter.push({
          apiNotation: "schoolYearLevel.schoolYearLevelCode",
          filter: this.selectedSchoolYearLevel?.schoolYearLevelCode,
          type: "precise"
        });
      }
      this.isLoading = true;
      this.spinner.show();
      this.sectionsService.getByAdvanceSearch({
        order: this.order,
        columnDef: this.filter,
        pageIndex: this.pageIndex, pageSize: this.pageSize
      })
      .subscribe(async res => {
        if(res.success){
          let data = res.data.results.map((d)=>{
            return {
              sectionCode: d.sectionCode,
              sectionName: d.sectionName,
              schoolYearLevel: d.schoolYearLevel?.name,
              department: d.department?.departmentName,
              adviserEmployee: d.adviserEmployee?.fullName,
            } as CommonSectionsTableColumn
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

  controlMenuItemSelected(type: "edit" | "delete", data: CommonSectionsTableColumn) {
    console.log(type, data);
    if(type === "edit") {
      const dialogRef = this.dialog.open(CommonSectionFormComponent, {
        maxWidth: '720px',
        width: '720px',
        disableClose: true,
        panelClass: "form-dialog"
      });
      dialogRef.componentInstance.school = this.selectedSchool;
      dialogRef.componentInstance.sectionCode = data.sectionCode;
      dialogRef.componentInstance.currentUserId = this.currentUserId;
      dialogRef.componentInstance.schoolYearLevel = this.selectedSchoolYearLevel && this.selectedSchoolYearLevel?.schoolYearLevelCode ? this.selectedSchoolYearLevel : null;
      dialogRef.componentInstance.initDetails();
      dialogRef.afterClosed().subscribe(res=> {
        if(res) {
          this.getSectionsPaginated();
        }
      });
    } else if(type === "delete") {
      this.onDelete(data.sectionCode);
    }
  }

  newSectionDialog() {
    const dialogRef = this.dialog.open(CommonSectionFormComponent, {
      maxWidth: '720px',
      width: '720px',
      disableClose: true,
      panelClass: "form-dialog"
    });
    dialogRef.componentInstance.isNew = true;
    dialogRef.componentInstance.school = this.selectedSchool;
    dialogRef.componentInstance.schoolYearLevel = this.selectedSchoolYearLevel && this.selectedSchoolYearLevel?.schoolYearLevelCode ? this.selectedSchoolYearLevel : null;
    dialogRef.componentInstance.currentUserId = this.currentUserId;
    dialogRef.afterOpened().subscribe(()=> {
      if(this.selectedSchoolYearLevel?.schoolYearLevelCode && this.selectedSchoolYearLevel?.schoolYearLevelCode !== "") {
        dialogRef.componentInstance.f["schoolYearLevelId"].setValue(this.selectedSchoolYearLevel.schoolYearLevelId);
        dialogRef.componentInstance.f["schoolYearLevelId"].markAllAsTouched();
        dialogRef.componentInstance.f["schoolYearLevelId"].markAsDirty();
      }
    });
    dialogRef.afterClosed().subscribe(res=> {
      if(res) {
        this.getSectionsPaginated();
      }
    });
  }

  onDelete(sectionCode: string) {
    const dialogData = new AlertDialogModel();
    dialogData.title = 'Confirm';
    dialogData.message = 'Delete section?';
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
        let res = await this.sectionsService.delete(sectionCode).toPromise();
        if (res.success) {
          this.snackBar.open('Section deleted!', 'close', {
            panelClass: ['style-success'],
          });
          this.isProcessing = false;
          dialogRef.componentInstance.isProcessing = this.isProcessing;
          dialogRef.close();
          this.getSectionsPaginated();
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
