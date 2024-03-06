import { filter } from 'rxjs';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { SchoolsService } from 'src/app/services/schools.service';
import { CommonSchoolsTableColumn } from '../utility/table';
import { StorageService } from 'src/app/services/storage.service';

export class SelectSchoolDialogTableColumn extends CommonSchoolsTableColumn {
  selected?: boolean;
}

@Component({
  selector: 'app-select-school-dialog',
  templateUrl: './select-school-dialog.component.html',
  styleUrls: ['./select-school-dialog.component.scss']
})
export class SelectSchoolDialogComponent {
  displayedColumns = ["selected", "orgSchoolCode", "schoolName" ]
  dataSource = new MatTableDataSource<SelectSchoolDialogTableColumn>();
  selected: SelectSchoolDialogTableColumn;
  doneSelect = new EventEmitter();
  total = 0;
  pageIndex = 0;
  pageSize = 10
  order = { orgSchoolCode: "ASC" } as any;
  filterOrgSchoolCode = "";
  filterSchoolName = "";
  @ViewChild('paginator', {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private schoolsService: SchoolsService,
    private spinner: SpinnerVisibilityService,
    private snackBar: MatSnackBar,
    private storageService: StorageService,
    public dialogRef: MatDialogRef<SelectSchoolDialogComponent>
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
      if(active === "orgSchoolCode") {
        this.order = { orgSchoolCode: direction.toUpperCase()}
      } else if(active === "schoolName") {
        this.order = { schoolName: direction.toUpperCase()}
      }
      this.init();
    });
  }

  init() {
    const filter: any[] = [
      {
        apiNotation: "orgSchoolCode",
        filter: this.filterOrgSchoolCode,
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
            schoolCode: x.schoolCode,
            orgSchoolCode: x.orgSchoolCode,
            schoolName:  x.schoolName,
            schoolAddress:  x.schoolAddress,
            schoolEmail:  x.schoolEmail,
            schoolContactNumber:  x.schoolContactNumber,
            selected: this.selected?.schoolCode === x.schoolCode
          }
        }));
        this.total = res.data.total;
        if(this.total === 0) {
          this.selected = null;
          this.storageService.saveOpsRecentSchool(null);
        }
      });
    }catch(ex) {
      this.selected = null;
      this.snackBar.open(ex.message, 'close', {panelClass: ['style-error']});
    }
  }

  isSelected(item: SelectSchoolDialogTableColumn) {
    return this.dataSource.data.find(x=>x.schoolCode === item.schoolCode && x.selected) ? true : false;
  }

  selectionChange(currentItem: SelectSchoolDialogTableColumn, selected) {
    console.log(currentItem);
    console.log("selected", selected);
    const items = this.dataSource.data;
    if(selected) {
      for(var item of items) {
        item.selected = currentItem.schoolCode === item.schoolCode;
      }
    }
    else {
      const items = this.dataSource.data;
      for(var item of items) {
        item.selected = false;
      }
    }
    this.dataSource = new MatTableDataSource<SelectSchoolDialogTableColumn>(items);
    console.log("selected", this.dataSource.data);
    this.selected = this.dataSource.data.find(x=>x.selected);
  }

  async doneSelection() {
    try {
      this.spinner.show();
      const res = await this.schoolsService.getByCode(this.selected.schoolCode).toPromise();
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
