import { Component } from '@angular/core';
import { ParentsService } from 'src/app/services/parents.service';
import { OpsParentsTableColumn } from 'src/app/shared/utility/table';
import { convertNotationToObject } from 'src/app/shared/utility/utility';
import { OpsParentDetailsComponent } from './ops-parent-details/ops-parent-details.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Schools } from 'src/app/model/schools';
import { AppConfigService } from 'src/app/services/app-config.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.scss'],
  host: {
    class: "page-component"
  }
})
export class ParentsComponent  {
  currentOperatorCode:string;
  error:string;
  dataSource = new MatTableDataSource<OpsParentsTableColumn>();
  columnDefs = [];
  displayedColumns = [];
  isLoading = false;
  isProcessing = false;
  pageIndex = 0;
  pageSize = 10;
  total = 0;
  order: any = { parentCode: "DESC" };

  filter: {
    apiNotation: string;
    filter: any;
    name?: string;
    type: string;
  }[] = [];

  constructor(
    private parentsService: ParentsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public appConfig: AppConfigService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    public router: Router) {
      this.dataSource = new MatTableDataSource([]);
      if(this.route.snapshot.data) {
      }
      this.appConfig.config.tableColumns.parents.forEach(x=> {
        if(x.name === "menu") {
          const menu = [{
            "name": "details",
            "label": "Details"
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
    Promise.all([
      this.getParentsPaginated(),
    ]).then(([parent])=> {});

  }

  filterChange(event: {
    apiNotation: string;
    filter: string;
    name: string;
    type: string;
  }[]) {
    this.filter = event;
    this.getParentsPaginated();
  }

  async pageChange(event: { pageIndex: number, pageSize: number }) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    await this.getParentsPaginated();
  }

  async sortChange(event: { active: string, direction: string }) {
    const { active, direction } = event;
    const { apiNotation } = this.appConfig.config.tableColumns.parents.find(x=>x.name === active);
    this.order = convertNotationToObject(apiNotation, direction.toUpperCase());
    this.getParentsPaginated()
  }

  getParentsPaginated(){
    try{
      this.isLoading = true;
      this.parentsService.getByAdvanceSearch({
        order: this.order,
        columnDef: this.filter,
        pageIndex: this.pageIndex, pageSize: this.pageSize
      })
      .subscribe(async res => {
        if(res.success){
          let data = res.data.results.map((d)=>{
            return {
              parentCode: d.parentCode,
              fullName: d.fullName,
              mobileNumber: d.mobileNumber,
            } as OpsParentsTableColumn
          });
          this.total = res.data.total;
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
    catch(e){
      this.error = Array.isArray(e.message) ? e.message[0] : e.message;
      this.snackBar.open(this.error, 'close', {panelClass: ['style-error']});
    }

  }

  controlMenuItemSelected(type: "details", data: OpsParentsTableColumn) {
    console.log(type, data);
    if(type === "details") {
      const dialogRef = this.dialog.open(OpsParentDetailsComponent, {
        maxWidth: '720px',
        width: '720px',
        disableClose: true,
        panelClass: "form-dialog"
      });
      dialogRef.componentInstance.parentCode = data.parentCode;
      dialogRef.componentInstance.currentOperatorCode = this.currentOperatorCode;
      dialogRef.componentInstance.initDetails();
      dialogRef.afterClosed().subscribe(res=> {
        this.getParentsPaginated();
      });
    }
  }

}
