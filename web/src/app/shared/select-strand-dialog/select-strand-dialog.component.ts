import { filter } from 'rxjs';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { CommonStrandsTableColumn } from '../utility/table';
import { StrandsService } from 'src/app/services/strands.service';

export class SelectStrandDialogTableColumn extends CommonStrandsTableColumn {
  selected?: boolean;
}

@Component({
  selector: 'app-select-strand-dialog',
  templateUrl: './select-strand-dialog.component.html',
  styleUrls: ['./select-strand-dialog.component.scss']
})
export class SelectStrandDialogComponent {
  displayedColumns = ["selected", "name" ]
  dataSource = new MatTableDataSource<SelectStrandDialogTableColumn>();
  selected: SelectStrandDialogTableColumn;
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
    private strandsService: StrandsService,
    private spinner: SpinnerVisibilityService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<SelectStrandDialogComponent>
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
      this.strandsService.getByAdvanceSearch({
        order: this.order,
        columnDef: filter,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }).subscribe(res=> {
        this.dataSource = new MatTableDataSource(res.data.results.map(x=> {
          return {
            strandCode: x.strandCode,
            name:  x.name,
            selected: this.selected?.strandCode === x.strandCode
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

  isSelected(item: SelectStrandDialogTableColumn) {
    return this.dataSource.data.find(x=>x.strandCode === item.strandCode && x.selected) ? true : false;
  }

  selectionChange(currentItem: SelectStrandDialogTableColumn, selected) {
    console.log(currentItem);
    console.log("selected", selected);
    const items = this.dataSource.data;
    if(selected) {
      for(var item of items) {
        item.selected = currentItem.strandCode === item.strandCode;
      }
    }
    else {
      const items = this.dataSource.data;
      for(var item of items) {
        item.selected = false;
      }
    }
    this.dataSource = new MatTableDataSource<SelectStrandDialogTableColumn>(items);
    console.log("selected", this.dataSource.data);
    this.selected = this.dataSource.data.find(x=>x.selected);
  }

  async doneSelection() {
    try {
      if(this.selected && this.selected?.strandCode) {
        this.spinner.show();
        const res = await this.strandsService.getByCode(this.selected.strandCode).toPromise();
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
