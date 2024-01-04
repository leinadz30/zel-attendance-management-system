import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfigService } from 'src/app/services/app-config.service';
import { OperatorsService } from 'src/app/services/operatros.service';
import { StorageService } from 'src/app/services/storage.service';
import { OpsUsersTableColumn } from 'src/app/shared/utility/table';
import { convertNotationToObject } from 'src/app/shared/utility/utility';
import { OpsUserFormComponent } from './ops-user-form/ops-user-form.component';
import { OpsChangePasswordComponent } from './change-password/ops-change-password.component';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { AlertDialogModel } from 'src/app/shared/alert-dialog/alert-dialog-model';

@Component({
  selector: 'app-ops-users',
  templateUrl: './ops-users.component.html',
  styleUrls: ['./ops-users.component.scss'],
  host: {
    class: "page-component"
  }
})
export class OpsUsersComponent {
  currentOperatorCode:string;
  error:string;
  dataSource = new MatTableDataSource<OpsUsersTableColumn>();
  columnDefs = [];
  displayedColumns = [];
  isLoading = false;
  isProcessing = false;
  pageIndex = 0;
  pageSize = 10;
  total = 0;
  order: any = { operatorId: "DESC" };

  filter: {
    apiNotation: string;
    filter: any;
    name?: string;
    type: string;
  }[] = [];

  viewRequest = false;
  requestingAccess = 0;
  constructor(
    private operatorsService: OperatorsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public appConfig: AppConfigService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    public router: Router) {
      this.dataSource = new MatTableDataSource([]);
      if(this.route.snapshot.data) {
        this.viewRequest = this.route.snapshot.data["viewRequest"];
      }
      this.appConfig.config.tableColumns.operators.forEach(x=> {
        if(x.name === "menu") {
          const menu = [{
            "name": "edit",
            "label": "Edit"
          },{
            "name": "delete",
            "label": "Delete"
          },{
            "name": "change-password",
            "label": "Chagne Password"
          }];
          if(this.viewRequest) {
            menu.push({
              "name": "approval",
              "label": "Approve"
            })
          };
          x["controlsMenu"] = menu;
        }
        this.columnDefs.push(x)
      });
    }

  ngOnInit(): void {
    const profile = this.storageService.getLoginProfile();
    this.currentOperatorCode = profile["operatorCode"];
  }

  ngAfterViewInit() {
    this.getUsersPaginated();

  }

  filterChange(event: {
    apiNotation: string;
    filter: string;
    name: string;
    type: string;
  }[]) {
    this.filter = event;
    this.getUsersPaginated();
  }

  async pageChange(event: { pageIndex: number, pageSize: number }) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    await this.getUsersPaginated();
  }

  async sortChange(event: { active: string, direction: string }) {
    const { active, direction } = event;
    const { apiNotation } = this.appConfig.config.tableColumns.operators.find(x=>x.name === active);
    this.order = convertNotationToObject(apiNotation, direction.toUpperCase());
    this.getUsersPaginated()
  }

  getUsersPaginated(){
    try{
      let findIndex = this.filter.findIndex(x=>x.apiNotation === "accessGranted");
      if(findIndex >= 0) {
        this.filter[findIndex] = {
          apiNotation: "accessGranted",
          filter: this.viewRequest ? "no" : "yes",
          type: "option-yes-no"
        };
      } else {
        this.filter.push({
          apiNotation: "accessGranted",
          filter: this.viewRequest ? "no" : "yes",
          type: "option-yes-no"
        });
      }
      findIndex = this.filter.findIndex(x=>x.apiNotation === "operatorCode");
      if(findIndex >= 0) {
        this.filter[findIndex] = {
          apiNotation: "operatorCode",
          filter: this.currentOperatorCode,
          type: "not"
        };
      } else {
        this.filter.push({
          apiNotation: "operatorCode",
          filter: this.currentOperatorCode,
          type: "not"
        });
      }
      this.isLoading = true;
      this.operatorsService.getByAdvanceSearch({
        order: this.order,
        columnDef: this.filter,
        pageIndex: this.pageIndex, pageSize: this.pageSize
      })
      .subscribe(async res => {
        if(res.success){
          let data = res.data.results.map((d)=>{
            return {
              operatorCode: d.operatorCode,
              name: d.name,
              userName: d.user.userName,
              accessGranted: d.accessGranted,
            } as OpsUsersTableColumn
          });
          this.total = res.data.total;
          this.requestingAccess = res.data.requestingAccess;
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

  controlMenuItemSelected(type: "edit" | "delete" | "change-password" | "approval", data: OpsUsersTableColumn) {
    console.log(type, data);
    if(type === "edit") {
      const dialogRef = this.dialog.open(OpsUserFormComponent, {
        maxWidth: '720px',
        width: '720px',
        disableClose: true,
      });
      dialogRef.componentInstance.operatorCode = data.operatorCode;
      dialogRef.componentInstance.initDetails();
      dialogRef.afterClosed().subscribe(res=> {
        this.getUsersPaginated();
      });
    } else if(type === "delete") {
      this.onDelete(data.operatorCode);
    } else if(type === "approval") {
      this.onApprove(data.operatorCode);
    } else if(type === "change-password") {
      const dialogRef = this.dialog.open(OpsChangePasswordComponent, {
        maxWidth: '720px',
        width: '720px',
        disableClose: true,
      });
      dialogRef.componentInstance.operatorCode = data.operatorCode;
    }
  }

  newOperatorDialog() {
    const dialogRef = this.dialog.open(OpsUserFormComponent, {
      maxWidth: '720px',
      width: '720px',
      disableClose: true,
    });
    dialogRef.componentInstance.isNew = true;
    dialogRef.afterClosed().subscribe(res=> {
      this.getUsersPaginated();
    });
  }

  onDelete(operatorCode: string) {
    if(this.currentOperatorCode === operatorCode) {
      this.snackBar.open('You are not allowed to delete this operator user!', 'close', {
        panelClass: ['style-success'],
      });
      return;
    }
    const dialogData = new AlertDialogModel();
    dialogData.title = 'Confirm';
    dialogData.message = 'Delete Operator User?';
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
        let res = await this.operatorsService.delete(operatorCode).toPromise();
        if (res.success) {
          this.snackBar.open('Operator User deleted!', 'close', {
            panelClass: ['style-success'],
          });
          this.isProcessing = false;
          dialogRef.componentInstance.isProcessing = this.isProcessing;
          dialogRef.close();
          this.getUsersPaginated();
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

  onApprove(operatorCode: string) {
    const dialogData = new AlertDialogModel();
    dialogData.title = 'Confirm';
    dialogData.message = 'Approve Operator User request?';
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
        let res = await this.operatorsService.approveAccessRequest(operatorCode).toPromise();
        if (res.success) {
          this.snackBar.open('Operator User request approved!', 'close', {
            panelClass: ['style-success'],
          });
          this.isProcessing = false;
          dialogRef.componentInstance.isProcessing = this.isProcessing;
          dialogRef.close();
          this.getUsersPaginated();
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
