import { filter } from 'rxjs';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { CommonCoursesTableColumn } from '../utility/table';
import { CoursesService } from 'src/app/services/courses.service';

export class SelectCourseDialogTableColumn extends CommonCoursesTableColumn {
  selected?: boolean;
}

@Component({
  selector: 'app-select-course-dialog',
  templateUrl: './select-course-dialog.component.html',
  styleUrls: ['./select-course-dialog.component.scss']
})
export class SelectCourseDialogComponent {
  displayedColumns = ["selected", "name" ]
  dataSource = new MatTableDataSource<SelectCourseDialogTableColumn>();
  selected: SelectCourseDialogTableColumn;
  doneSelect = new EventEmitter();
  total = 0;
  pageIndex = 0;
  pageSize = 10
  order = { name: "ASC" } as any;
  filterName = "";
  schoolCode;
  @ViewChild('paginator', {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private coursesService: CoursesService,
    private spinner: SpinnerVisibilityService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<SelectCourseDialogComponent>
    ) {
  }

  ngAfterViewInit(): void {
    this.init();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.paginator.page.subscribe((event: PageEvent)=> {
      const { pageIndex, pageSize } = event;
      this.pageIndex = pageIndex;
      this.pageSize = pageSize;
      this.init();
    });
    this.dataSource.sort.sortChange.subscribe((event: MatSort)=> {
      const { active, direction } = event;
      if(active === "name") {
        this.order = { name: direction.toUpperCase()}
      }
      this.init();
    });
  }

  init() {
    const filter: any[] = [
      {
        apiNotation: "school.schoolCode",
        filter: this.schoolCode,
      },
      {
        apiNotation: "name",
        filter: this.filterName,
      },
    ];
    try {
      this.coursesService.getByAdvanceSearch({
        order: this.order,
        columnDef: filter,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }).subscribe(res=> {
        this.dataSource = new MatTableDataSource(res.data.results.map(x=> {
          return {
            courseCode: x.courseCode,
            name:  x.name,
            selected: this.selected?.courseCode === x.courseCode
          }
        }));
        this.total = res.data.total;
        if(this.total === 0) {
          this.selected = null;
        }
      });
    }catch(ex) {
      this.selected = null;
      this.snackBar.open(ex.message, 'close', {panelClass: ['style-error']});
    }
  }

  isSelected(item: SelectCourseDialogTableColumn) {
    return this.dataSource.data.find(x=>x.courseCode === item.courseCode && x.selected) ? true : false;
  }

  selectionChange(currentItem: SelectCourseDialogTableColumn, selected) {
    console.log(currentItem);
    console.log("selected", selected);
    const items = this.dataSource.data;
    if(selected) {
      for(var item of items) {
        item.selected = currentItem.courseCode === item.courseCode;
      }
    }
    else {
      const items = this.dataSource.data;
      for(var item of items) {
        item.selected = false;
      }
    }
    this.dataSource = new MatTableDataSource<SelectCourseDialogTableColumn>(items);
    console.log("selected", this.dataSource.data);
    this.selected = this.dataSource.data.find(x=>x.selected);
  }

  async doneSelection() {
    try {
      if(this.selected && this.selected?.courseCode) {
        this.spinner.show();
        const res = await this.coursesService.getByCode(this.selected.courseCode).toPromise();
        this.spinner.hide();
        if(res.success) {
          this.dialogRef.close(res.data);
        } else {
          const error = Array.isArray(res.message) ? res.message[0] : res.message;
          this.snackBar.open(error, 'close', {panelClass: ['style-error']});
        }
      } else {
        this.dialogRef.close(null);
      }
    } catch(ex) {
      const error = Array.isArray(ex.message) ? ex.message[0] : ex.message;
      this.snackBar.open(error, 'close', {panelClass: ['style-error']});
      this.spinner.hide();
    }
  }
}
