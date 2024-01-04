import { filter } from 'rxjs';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { SchoolYearLevelsService } from 'src/app/services/school-year-levels.service';
import { OpsSchoolYearLevelsTableColumn } from '../utility/table';

export class SelectSchoolYearLevelDialogTableColumn extends OpsSchoolYearLevelsTableColumn {
  selected?: boolean;
}

@Component({
  selector: 'app-select-school-year-level-dialog',
  templateUrl: './select-school-year-level-dialog.component.html',
  styleUrls: ['./select-school-year-level-dialog.component.scss']
})
export class SelectSchoolYearLevelDialogComponent {
  displayedColumns = ["selected", "name" ]
  dataSource = new MatTableDataSource<SelectSchoolYearLevelDialogTableColumn>();
  selected: SelectSchoolYearLevelDialogTableColumn;
  doneSelect = new EventEmitter();
  total = 0;
  pageIndex = 0;
  pageSize = 10
  order = { schoolYearLevelCode: "ASC" } as any;
  filterName = "";
  schoolCode;
  @ViewChild('paginator', {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private schoolsService: SchoolYearLevelsService,
    private spinner: SpinnerVisibilityService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<SelectSchoolYearLevelDialogComponent>
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
      this.schoolsService.getByAdvanceSearch({
        order: this.order,
        columnDef: filter,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }).subscribe(res=> {
        this.dataSource = new MatTableDataSource(res.data.results.map(x=> {
          return {
            schoolYearLevelCode: x.schoolYearLevelCode,
            name:  x.name,
            selected: this.selected?.schoolYearLevelCode === x.schoolYearLevelCode
          }
        }));
        this.total = res.data.total;
      });
    }catch(ex) {

    }
  }

  isSelected(item: SelectSchoolYearLevelDialogTableColumn) {
    return this.dataSource.data.find(x=>x.schoolYearLevelCode === item.schoolYearLevelCode && x.selected) ? true : false;
  }

  selectionChange(currentItem: SelectSchoolYearLevelDialogTableColumn, selected) {
    console.log(currentItem);
    console.log("selected", selected);
    const items = this.dataSource.data;
    if(selected) {
      for(var item of items) {
        item.selected = currentItem.schoolYearLevelCode === item.schoolYearLevelCode;
      }
    }
    else {
      const items = this.dataSource.data;
      for(var item of items) {
        item.selected = false;
      }
    }
    this.dataSource = new MatTableDataSource<SelectSchoolYearLevelDialogTableColumn>(items);
    console.log("selected", this.dataSource.data);
    this.selected = this.dataSource.data.find(x=>x.selected);
  }

  async doneSelection() {
    try {
      this.spinner.show();
      const res = await this.schoolsService.getByCode(this.selected.schoolYearLevelCode).toPromise();
      this.spinner.hide();
      if(res.success) {
        this.dialogRef.close(res.data);
      } else {
        const error = Array.isArray(res.message) ? res.message[0] : res.message;
        this.snackBar.open(error, 'close', {panelClass: ['style-error']});
      }
    } catch(ex) {
      const error = Array.isArray(ex.message) ? ex.message[0] : ex.message;
      this.snackBar.open(error, 'close', {panelClass: ['style-error']});
      this.spinner.hide();
    }
  }
}
