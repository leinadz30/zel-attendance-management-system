import { filter } from 'rxjs';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { CommonSectionsTableColumn } from '../utility/table';
import { SectionsService } from 'src/app/services/sections.service';

export class SelectSectionDialogTableColumn extends CommonSectionsTableColumn {
  selected?: boolean;
}

@Component({
  selector: 'app-select-section-dialog',
  templateUrl: './select-section-dialog.component.html',
  styleUrls: ['./select-section-dialog.component.scss']
})
export class SelectSectionDialogComponent {
  displayedColumns = ["selected", "sectionName" ]
  dataSource = new MatTableDataSource<SelectSectionDialogTableColumn>();
  selected: SelectSectionDialogTableColumn;
  doneSelect = new EventEmitter();
  total = 0;
  pageIndex = 0;
  pageSize = 10
  order = { sectionName: "ASC" } as any;
  filterSectionName = "";
  schoolCode;
  schoolYearLevelCode;
  @ViewChild('paginator', {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private sectionsService: SectionsService,
    private spinner: SpinnerVisibilityService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<SelectSectionDialogComponent>
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
      if(active === "sectionName") {
        this.order = { sectionName: direction.toUpperCase()}
      }
      this.init();
    });
  }

  init() {
    const filter: any[] = [
      {
        apiNotation: "school.schoolCode",
        filter: this.schoolCode
      },
      {
        apiNotation: "schoolYearLevel.schoolYearLevelCode",
        filter: this.schoolYearLevelCode
      },
      {
        apiNotation: "sectionName",
        filter: this.filterSectionName,
      },
    ];
    try {
      this.sectionsService.getByAdvanceSearch({
        order: this.order,
        columnDef: filter,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }).subscribe(res=> {
        this.dataSource = new MatTableDataSource(res.data.results.map(x=> {
          return {
            sectionCode: x.sectionCode,
            sectionName:  x.sectionName,
            selected: this.selected?.sectionCode === x.sectionCode
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

  isSelected(item: SelectSectionDialogTableColumn) {
    return this.dataSource.data.find(x=>x.sectionCode === item.sectionCode && x.selected) ? true : false;
  }

  selectionChange(currentItem: SelectSectionDialogTableColumn, selected) {
    console.log(currentItem);
    console.log("selected", selected);
    const items = this.dataSource.data;
    if(selected) {
      for(var item of items) {
        item.selected = currentItem.sectionCode === item.sectionCode;
      }
    }
    else {
      const items = this.dataSource.data;
      for(var item of items) {
        item.selected = false;
      }
    }
    this.dataSource = new MatTableDataSource<SelectSectionDialogTableColumn>(items);
    console.log("selected", this.dataSource.data);
    this.selected = this.dataSource.data.find(x=>x.selected);
  }

  async doneSelection() {
    try {
      if(this.selected && this.selected?.sectionCode) {
        this.spinner.show();
        const res = await this.sectionsService.getByCode(this.selected.sectionCode).toPromise();
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
