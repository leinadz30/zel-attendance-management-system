import { filter } from 'rxjs';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { EmployeesService } from 'src/app/services/employees.service';
import { CommonEmployeesTableColumn } from '../utility/table';

export class SelectEmployeeDialogTableColumn extends CommonEmployeesTableColumn {
  selected?: boolean;
}

@Component({
  selector: 'app-select-employee-dialog',
  templateUrl: './select-employee-dialog.component.html',
  styleUrls: ['./select-employee-dialog.component.scss']
})
export class SelectEmployeeDialogComponent {
  title;
  displayedColumns = ["selected", "fullName" ]
  dataSource = new MatTableDataSource<SelectEmployeeDialogTableColumn>();
  selected: SelectEmployeeDialogTableColumn;
  doneSelect = new EventEmitter();
  total = 0;
  pageIndex = 0;
  pageSize = 10
  order = { fullName: "ASC" } as any;
  filterFullName = "";
  schoolCode;
  departmentCode;
  includeEmployeeWithUserAccount = true;
  @ViewChild('paginator', {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private employeesService: EmployeesService,
    private spinner: SpinnerVisibilityService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<SelectEmployeeDialogComponent>
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
      if(active === "fullName") {
        this.order = { fullName: direction.toUpperCase()}
      }
      this.init();
    });
  }

  init() {
    let filter: any[] = [
      {
        apiNotation: "school.schoolCode",
        filter: this.schoolCode
      },
      {
        apiNotation: "fullName",
        filter: this.filterFullName,
      },
    ];
    if(this.departmentCode && this.departmentCode !== '') {
      filter = [...filter,
        {
          apiNotation: "department.departmentCode",
          filter: this.departmentCode
        }]
    }
    if(!this.includeEmployeeWithUserAccount) {
      filter = [...filter,
        {
          apiNotation: "employeeUser.active",
          type: "null"
        }]
    }
    try {
      this.employeesService.getByAdvanceSearch({
        order: this.order,
        columnDef: filter,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }).subscribe(res=> {
        this.dataSource = new MatTableDataSource(res.data.results.map(x=> {
          return {
            employeeCode: x.employeeCode,
            fullName: x.fullName,
            selected: this.selected?.employeeCode === x.employeeCode
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

  isSelected(item: SelectEmployeeDialogTableColumn) {
    return this.dataSource.data.find(x=>x.employeeCode === item.employeeCode && x.selected) ? true : false;
  }

  selectionChange(currentItem: SelectEmployeeDialogTableColumn, selected) {
    console.log(currentItem);
    console.log("selected", selected);
    const items = this.dataSource.data;
    if(selected) {
      for(var item of items) {
        item.selected = currentItem.employeeCode === item.employeeCode;
      }
    }
    else {
      const items = this.dataSource.data;
      for(var item of items) {
        item.selected = false;
      }
    }
    this.dataSource = new MatTableDataSource<SelectEmployeeDialogTableColumn>(items);
    console.log("selected", this.dataSource.data);
    this.selected = this.dataSource.data.find(x=>x.selected);
  }

  async doneSelection() {
    try {
      this.spinner.show();
      const res = await this.employeesService.getByCode(this.selected.employeeCode).toPromise();
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
