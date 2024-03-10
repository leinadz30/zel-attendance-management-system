import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Departments } from 'src/app/model/departments';
import { Schools } from 'src/app/model/schools';
import { AppConfigService } from 'src/app/services/app-config.service';
import { DepartmentsService } from 'src/app/services/departments.service';
import { SchoolsService } from 'src/app/services/schools.service';
import { StorageService } from 'src/app/services/storage.service';
import { StudentsService } from 'src/app/services/students.service';
import { AlertDialogModel } from 'src/app/shared/alert-dialog/alert-dialog-model';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { SelectDepartmentDialogComponent } from 'src/app/shared/select-department-dialog/select-department-dialog.component';
import { SelectSchoolDialogComponent } from 'src/app/shared/select-school-dialog/select-school-dialog.component';
import { CommonStudentsTableColumn } from 'src/app/shared/utility/table';
import { convertNotationToObject } from 'src/app/shared/utility/utility';
import { Location } from '@angular/common';
import { SelectSchoolYearLevelDialogComponent } from 'src/app/shared/select-school-year-level-dialog/select-school-year-level-dialog.component';
import { SchoolYearLevels } from 'src/app/model/school-year-levels';
import { SchoolYearLevelsService } from 'src/app/services/school-year-levels.service';
import { CommonStudentFormComponent } from './common-students-form/common-students-form.component';
import { CommonStudentParentsDialogComponent } from './common-students-parents-dialog/common-students-parents-dialog.component';
import { SelectCourseDialogComponent } from 'src/app/shared/select-course-dialog/select-course-dialog.component';
import { Courses } from 'src/app/model/courses';
import { Strands } from 'src/app/model/strands';
import { SelectStrandDialogComponent } from 'src/app/shared/select-strand-dialog/select-strand-dialog.component';
import { FormControl, Validators } from '@angular/forms';
import { CoursesService } from 'src/app/services/courses.service';
import { StrandsService } from 'src/app/services/strands.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
@Component({
  selector: 'app-common-students',
  templateUrl: './common-students.component.html',
  styleUrls: ['./common-students.component.scss'],
  host: {
    class: "page-component"
  }
})
export class CommonStudentsComponent  {
  currentUserId:string;
  error:string;
  dataSource = new MatTableDataSource<CommonStudentsTableColumn>();
  columnDefs = [];
  displayedColumns = [];
  isLoading = false;
  isProcessing = false;
  pageIndex = 0;
  pageSize = 10;
  total = 0;
  order: any = { studentCode: "DESC" };

  filter: {
    apiNotation: string;
    filter: any;
    name?: string;
    type: string;
  }[] = [];

  requestingAccess = 0;
  selectedSchool: Schools;
  selectedSchoolYearLevel: SchoolYearLevels;
  selectedCourse: Courses;
  selectedStrand: Strands;

  mode: 'OPERATION' | 'ORGANIZATION';
  constructor(
    private spinner: SpinnerVisibilityService,
    private _location: Location,
    private studentsService: StudentsService,
    private schoolsService: SchoolsService,
    private schoolYearLevelsService: SchoolYearLevelsService,
    private coursesService: CoursesService,
    private strandsService: StrandsService,
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
          this.router.navigate(["/ops/students/find/" +this.selectedSchool?.schoolCode]);
        } else {
          this.router.navigate(["/org/students/find/" +this.selectedSchool?.schoolCode]);
        }
      }
      this.selectedCourse = new Courses();
      this.selectedCourse.courseCode = this.route.snapshot.paramMap.get('courseCode');
      this.selectedStrand = new Strands();
      this.selectedStrand.strandCode = this.route.snapshot.paramMap.get('strandCode');
      this.appConfig.config.tableColumns.students.forEach(x=> {
        if(x.name === "menu") {
          const menu = [{
            "name": "parents",
            "label": "Parents"
          },{
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
    const currentSelectedDepartment = this.selectedSchoolYearLevel?.schoolYearLevelCode ? this.selectedSchoolYearLevel?.schoolYearLevelCode : "";
    const currentSelectedCourse = this.selectedCourse?.courseCode ? this.selectedCourse?.courseCode : "";
    const currentSelectedStrand = this.selectedStrand?.strandCode ? this.selectedStrand?.strandCode : "";
    Promise.all([
      currentSelectedSchool && currentSelectedSchool !== "" ? this.schoolsService.getByCode(currentSelectedSchool).toPromise() : null,
      currentSelectedDepartment && currentSelectedDepartment !== "" ? this.schoolYearLevelsService.getByCode(currentSelectedDepartment).toPromise() : null,
      currentSelectedCourse && currentSelectedCourse !== "" ? this.coursesService.getByCode(currentSelectedCourse).toPromise() : null,
      currentSelectedStrand && currentSelectedStrand !== "" ? this.strandsService.getByCode(currentSelectedStrand).toPromise() : null,
      this.getStudentsPaginated(),
    ]).then(([school, schoolYearLevel, course, strand, student])=> {
      if(school?.success && school?.data && school.data?.schoolName) {
        this.selectedSchool = school.data;
      }
      if(schoolYearLevel?.success && schoolYearLevel?.data && schoolYearLevel.data?.schoolYearLevelCode) {
        this.selectedSchoolYearLevel = schoolYearLevel.data;
      }
      if(course?.success && course?.data && course.data?.courseCode) {
        this.selectedCourse = course.data;
      }
      if(strand?.success && strand?.data && strand.data?.strandCode) {
        this.selectedStrand = strand.data;
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
    this.getStudentsPaginated();
  }

  async pageChange(event: { pageIndex: number, pageSize: number }) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    await this.getStudentsPaginated();
  }

  async sortChange(event: { active: string, direction: string }) {
    const { active, direction } = event;
    const { apiNotation } = this.appConfig.config.tableColumns.students.find(x=>x.name === active);
    this.order = convertNotationToObject(apiNotation, direction.toUpperCase());
    this.getStudentsPaginated()
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
          this._location.go("/ops/students/find/" + res?.schoolCode);
        } else {
          this._location.go("/org/students/find/" + res?.schoolCode);
        }
        this.getStudentsPaginated();
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
      this.selectedCourse = null;
      this.selectedStrand = null;
      if(this.mode === "OPERATION") {
        this._location.go("/ops/students/find/" + this.selectedSchool?.schoolCode + (this.selectedSchoolYearLevel?.schoolYearLevelCode ? "/sylvl/" + this.selectedSchoolYearLevel?.schoolYearLevelCode : ""));
      } else {
        this._location.go("/org/students/find/" + this.selectedSchool?.schoolCode + (this.selectedSchoolYearLevel?.schoolYearLevelCode ? "/sylvl/" + this.selectedSchoolYearLevel?.schoolYearLevelCode : ""));
      }
      this.getStudentsPaginated();
    })
  }

  showSelectCourseDialog() {
    const dialogRef = this.dialog.open(SelectCourseDialogComponent, {
        disableClose: true,
        panelClass: "select-course-dialog"
    });
    dialogRef.componentInstance.selected = {
      courseCode: this.selectedCourse?.courseCode,
      name: this.selectedCourse?.name,
      selected: true
    }
    dialogRef.componentInstance.schoolCode = this.selectedSchool?.schoolCode;
    dialogRef.afterClosed().subscribe((res:Courses)=> {
      console.log(res);
      this.selectedCourse = res;
      if(this.mode === "OPERATION") {
        this._location.go("/ops/students/find/" + this.selectedSchool?.schoolCode + "/sylvl/" + this.selectedSchoolYearLevel?.schoolYearLevelCode + (this.selectedCourse?.courseCode ? "/course/" + this.selectedCourse?.courseCode : ""));
      } else {
        this._location.go("/org/students/find/" + this.selectedSchool?.schoolCode + "/sylvl/" + this.selectedSchoolYearLevel?.schoolYearLevelCode + (this.selectedCourse?.courseCode ? "/course/" + this.selectedCourse?.courseCode : ""));
      }
      this.getStudentsPaginated();
    })
  }

  showSelectStrandDialog() {
    const dialogRef = this.dialog.open(SelectStrandDialogComponent, {
        disableClose: true,
        panelClass: "select-strand-dialog"
    });
    dialogRef.componentInstance.selected = {
      strandCode: this.selectedStrand?.strandCode,
      name: this.selectedStrand?.name,
      selected: true
    }
    dialogRef.componentInstance.schoolCode = this.selectedSchool?.schoolCode;
    dialogRef.afterClosed().subscribe((res:Strands)=> {
      console.log(res);
      this.selectedStrand = res;
      if(this.mode === "OPERATION") {
        this._location.go("/ops/students/find/" + this.selectedSchool?.schoolCode + "/sylvl/" + this.selectedSchoolYearLevel?.schoolYearLevelCode + (this.selectedStrand?.strandCode ? "/strand/" + this.selectedStrand?.strandCode : ""));
      } else {
        this._location.go("/org/students/find/" + this.selectedSchool?.schoolCode + "/sylvl/" + this.selectedSchoolYearLevel?.schoolYearLevelCode + (this.selectedStrand?.strandCode ? "/strand/" + this.selectedStrand?.strandCode : ""));
      }
      this.getStudentsPaginated();
    })
  }

  getStudentsPaginated(){
    try{
      // if(!this.selectedSchool?.schoolCode || this.selectedSchool?.schoolCode === "" ||
      // !this.selectedSchoolYearLevel?.schoolYearLevelCode || this.selectedSchoolYearLevel?.schoolYearLevelCode === ""||
      // (this.selectedSchoolYearLevel?.educationalStage === "COLLEGE" && !this.selectedCourse?.courseCode || this.selectedCourse?.courseCode === "")||
      // (this.selectedSchoolYearLevel?.educationalStage === "SENIOR" && !this.selectedStrand?.strandCode || this.selectedStrand?.strandCode === "")) {
      //   this.dataSource = new MatTableDataSource([]);
      //   this.total = 0;
      //   this.pageSize = 10;
      //   return;
      // }
      const filter = this.filter.filter(x=> ![
        "school.schoolCode",
        "schoolYearLevel.schoolYearLevelCode",
        "studentCourse.course.courseCode",
        "studentStrand.strand.strandCode"].some(a => a.toString().toLowerCase() === x.apiNotation.toString().toLowerCase()));
      this.filter = [];
      this.filter.push({
        apiNotation: "school.schoolCode",
        filter: this.selectedSchool?.schoolCode,
        type: "precise"
      });
      this.filter.push({
        apiNotation: "schoolYearLevel.schoolYearLevelCode",
        filter: this.selectedSchoolYearLevel?.schoolYearLevelCode,
        type: "precise"
      });
      if(this.selectedSchoolYearLevel?.educationalStage === "COLLEGE") {
        this.filter.push({
          apiNotation: "studentCourse.course.courseCode",
          filter: this.selectedCourse?.courseCode,
          type: "precise"
        });
      }
      if(this.selectedSchoolYearLevel?.educationalStage === "SENIOR") {
        this.filter.push({
          apiNotation: "studentStrand.strand.strandCode",
          filter: this.selectedStrand?.strandCode,
          type: "precise"
        });
      }
      this.isLoading = true;
      this.spinner.show();
      this.studentsService.getByAdvanceSearch({
        order: this.order,
        columnDef: [...this.filter, ...filter],
        pageIndex: this.pageIndex, pageSize: this.pageSize
      })
      .subscribe(async res => {
        if(res.success){
          let data = res.data.results.map((d)=>{
            return {
              studentCode: d.studentCode,
              fullName: d.fullName,
              orgStudentId: d.orgStudentId,
              cardNumber: d.cardNumber,
              mobileNumber: d.mobileNumber,
              schoolYearLevel: d.schoolYearLevel?.name,
              studentSection: d.studentSection?.section?.sectionName,
              department: d.department?.departmentName,
            } as CommonStudentsTableColumn
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

  controlMenuItemSelected(type: "parents" | "edit" | "delete", data: CommonStudentsTableColumn) {
    console.log(type, data);
    if(type === "parents") {
      const dialogRef = this.dialog.open(CommonStudentParentsDialogComponent, {
        maxWidth: '720px',
        width: '720px',
        disableClose: true,
        panelClass: "form-dialog"
      });
      dialogRef.componentInstance.studentCode = data.studentCode;
      dialogRef.componentInstance.init();
    }
    else if(type === "edit") {
      const dialogRef = this.dialog.open(CommonStudentFormComponent, {
        maxWidth: '720px',
        width: '720px',
        disableClose: true,
        panelClass: "form-dialog"
      });
      dialogRef.componentInstance.title = "Update Student";
      dialogRef.componentInstance.school = this.selectedSchool;
      dialogRef.componentInstance.studentCode = data.studentCode;
      dialogRef.componentInstance.schoolYearLevel = this.selectedSchoolYearLevel && this.selectedSchoolYearLevel?.schoolYearLevelCode ? this.selectedSchoolYearLevel : null;
      dialogRef.componentInstance.currentUserId = this.currentUserId;
      dialogRef.componentInstance.initDetails();
      dialogRef.afterClosed().subscribe(res=> {
        if(res) {
          this.getStudentsPaginated();
        }
      });
    } else if(type === "delete") {
      this.onDelete(data.studentCode);
    }
  }

  newStudentDialog() {
    const dialogRef = this.dialog.open(CommonStudentFormComponent, {
      maxWidth: '720px',
      width: '720px',
      disableClose: true,
      panelClass: "form-dialog"
    });
    dialogRef.componentInstance.title = "New Student";
    dialogRef.componentInstance.isNew = true;
    dialogRef.componentInstance.school = this.selectedSchool;
    dialogRef.componentInstance.schoolYearLevel = this.selectedSchoolYearLevel && this.selectedSchoolYearLevel?.schoolYearLevelCode ? this.selectedSchoolYearLevel : null;
    dialogRef.componentInstance.currentUserId = this.currentUserId;
    dialogRef.afterOpened().subscribe(()=> {
      if(this.selectedSchoolYearLevel?.schoolYearLevelId && this.selectedSchoolYearLevel?.schoolYearLevelId !== "") {
        dialogRef.componentInstance.f["schoolYearLevelId"].setValue(this.selectedSchoolYearLevel.schoolYearLevelId);
        dialogRef.componentInstance.f["schoolYearLevelId"].markAllAsTouched();
        dialogRef.componentInstance.f["schoolYearLevelId"].markAsDirty();
        if(this.selectedSchoolYearLevel.educationalStage === "COLLEGE") {
          dialogRef.componentInstance.f["courseId"] = new FormControl(null, [Validators.required]);
          dialogRef.componentInstance.f["strandId"] = new FormControl(null);
        } else if(this.selectedSchoolYearLevel.educationalStage === "SENIOR") {
          dialogRef.componentInstance.f["strandId"] = new FormControl(null, [Validators.required]);
          dialogRef.componentInstance.f["courseId"] = new FormControl(null);
        } else {
          dialogRef.componentInstance.f["courseId"] = new FormControl(null);
          dialogRef.componentInstance.f["strandId"] = new FormControl(null);
        }
      } else {
        dialogRef.componentInstance.f["courseId"] = new FormControl(null);
        dialogRef.componentInstance.f["strandId"] = new FormControl(null);
      }
    });
    dialogRef.afterClosed().subscribe(res=> {
      if(res) {
        this.getStudentsPaginated();
      }
    });
  }

  onDelete(studentCode: string) {
    const dialogData = new AlertDialogModel();
    dialogData.title = 'Confirm';
    dialogData.message = 'Delete student?';
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
        let res = await this.studentsService.delete(studentCode).toPromise();
        if (res.success) {
          this.snackBar.open('Student deleted!', 'close', {
            panelClass: ['style-success'],
          });
          this.isProcessing = false;
          dialogRef.componentInstance.isProcessing = this.isProcessing;
          dialogRef.close();
          this.getStudentsPaginated();
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
