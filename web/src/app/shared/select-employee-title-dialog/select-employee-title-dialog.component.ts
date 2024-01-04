import { filter } from 'rxjs';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { EmployeeTitlesService } from 'src/app/services/employee-titles.service';
import { OpsEmployeeTitlesTableColumn } from '../utility/table';

export class SelectEmployeeTitleDialogTableColumn extends OpsEmployeeTitlesTableColumn {
  selected?: boolean;
}

@Component({
  selector: 'app-select-employee-title-dialog',
  templateUrl: './select-employee-title-dialog.component.html',
  styleUrls: ['./select-employee-title-dialog.component.scss']
})
export class  SelectEmployeeTitleDialogComponent {
  displayedColumns = ["selected", "name" ]
  dataSource = new MatTableDataSource<SelectEmployeeTitleDialogTableColumn>();
  selected: SelectEmployeeTitleDialogTableColumn;
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
    private employeeTitlesService: EmployeeTitlesService,
    private spinner: SpinnerVisibilityService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<SelectEmployeeTitleDialogComponent>
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
      this.employeeTitlesService.getByAdvanceSearch({
        order: this.order,
        columnDef: filter,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }).subscribe(res=> {
        this.dataSource = new MatTableDataSource(res.data.results.map(x=> {
          return {
            employeeTitleCode: x.employeeTitleCode,
            name:  x.name,
            selected: this.selected?.employeeTitleCode === x.employeeTitleCode
          }
        }));
        this.total = res.data.total;
      });
    }catch(ex) {

    }
  }

  isSelected(item: SelectEmployeeTitleDialogTableColumn) {
    return this.dataSource.data.find(x=>x.employeeTitleCode === item.employeeTitleCode && x.selected) ? true : false;
  }

  selectionChange(currentItem: SelectEmployeeTitleDialogTableColumn, selected) {
    console.log(currentItem);
    console.log("selected", selected);
    const items = this.dataSource.data;
    if(selected) {
      for(var item of items) {
        item.selected = currentItem.employeeTitleCode === item.employeeTitleCode;
      }
    }
    else {
      const items = this.dataSource.data;
      for(var item of items) {
        item.selected = false;
      }
    }
    this.dataSource = new MatTableDataSource<SelectEmployeeTitleDialogTableColumn>(items);
    console.log("selected", this.dataSource.data);
    this.selected = this.dataSource.data.find(x=>x.selected);
  }

  async doneSelection() {
    try {
      this.spinner.show();
      const res = await this.employeeTitlesService.getByCode(this.selected.employeeTitleCode).toPromise();
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
