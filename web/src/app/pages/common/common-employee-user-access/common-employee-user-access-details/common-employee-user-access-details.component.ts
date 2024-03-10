import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmployeeUser } from 'src/app/model/employee-user';
import { AccessPages, EmployeeUserAccess } from 'src/app/model/employee-user-access';
import { AppConfigService } from 'src/app/services/app-config.service';
import { StorageService } from 'src/app/services/storage.service';
import { AlertDialogModel } from 'src/app/shared/alert-dialog/alert-dialog-model';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { MyErrorStateMatcher } from 'src/app/shared/form-validation/error-state.matcher';
import { CommonEmployeeUserAccessFormComponent } from '../common-employee-user-access-form/common-employee-user-access-form.component';
import { MatTableDataSource } from '@angular/material/table';
import { AccessPagesTableComponent } from 'src/app/shared/access-pages-table/access-pages-table.component';
import { EmployeeUserAccessService } from 'src/app/services/employee-user-access.service';

@Component({
  selector: 'app-common-employee-user-access-details',
  templateUrl: './common-employee-user-access-details.component.html',
  styleUrls: ['./common-employee-user-access-details.component.scss'],
  host: {
    class: "page-component"
  }
})
export class CommonEmployeeUserAccessDetailsComponent {
  currentUserId:string;
  code;
  isNew = false;
  // pageAccess: Access = {
  //   view: true,
  //   modify: false,
  // };

  isReadOnly = true;

  error;
  isLoading = false;

  mediaWatcher: Subscription;
  matcher = new MyErrorStateMatcher();
  isProcessing = false;
  isLoadingRoles = false;
  mode: 'OPERATION' | 'ORGANIZATION';

  @ViewChild('employeeUserAccessForm', { static: true}) employeeUserAccessForm: CommonEmployeeUserAccessFormComponent;
  @ViewChild('accessPagesTable', { static: true}) accessPagesTable: AccessPagesTableComponent;

  constructor(
    private employeeUserAccessService: EmployeeUserAccessService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private appconfig: AppConfigService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) {
    const currentProfile = this.storageService.getLoginProfile();
    this.currentUserId = currentProfile?.user?.userId;
    const { isNew, edit } = this.route.snapshot.data;
    this.isNew = isNew;
    this.code = this.route.snapshot.paramMap.get('employeeUserAccessCode');
    this.isReadOnly = !edit && !isNew;
    if (this.route.snapshot.data) {
      this.mode = this.route.snapshot.data["mode"];
      // this.pageAccess = {
      //   ...this.pageAccess,
      //   ...this.route.snapshot.data['access'],
      // };
    }
  }

  get pageRights() {
    let rights = {};
    // for(var right of this.pageAccess.rights) {
    //   rights[right] = this.pageAccess.modify;
    // }
    return rights;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.initDetails();
  }

  accessGridChange(event) {
    this.employeeUserAccessForm.form.controls["accessPages"].setValue(event);
    this.employeeUserAccessForm.form.markAllAsTouched();
    this.employeeUserAccessForm.form.markAsDirty();
  }

  initDetails() {
    this.employeeUserAccessService.getByCode(this.code).subscribe(res=> {
      if (res.success) {
        this.employeeUserAccessForm.setFormValue(res.data);
        if(res.data.accessPages) {
          this.accessPagesTable.setDataSource(res.data.accessPages);
        }

        if (this.isReadOnly) {
          this.employeeUserAccessForm.form.disable();
        }
      } else {
        this.error = Array.isArray(res.message) ? res.message[0] : res.message;
        this.snackBar.open(this.error, 'close', {
          panelClass: ['style-error'],
        });
      }
    });
  }

  onDelete() {
    const dialogData = new AlertDialogModel();
    dialogData.title = 'Confirm';
    dialogData.message = 'Delete User group?';
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
        let res = await this.employeeUserAccessService.delete(this.code).toPromise();
        if (res.success) {
          this.snackBar.open('Saved!', 'close', {
            panelClass: ['style-success'],
          });
          this.router.navigate(['/user-group/']);
          this.isProcessing = false;
          dialogRef.componentInstance.isProcessing = this.isProcessing;
          dialogRef.close();
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

  onUpdate(formData) {
    formData = {
      ...formData,
      accessPages: this.accessPagesTable.accessPagesData,
      updatedByUserId: this.currentUserId,
    }
    const dialogData = new AlertDialogModel();
    dialogData.title = 'Confirm';
    dialogData.message = 'Update User group?';
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
        let res = await this.employeeUserAccessService.update(this.code, formData).toPromise();
        if (res.success) {
          this.snackBar.open('Saved!', 'close', {
            panelClass: ['style-success'],
          });
          this.router.navigate([(this.mode === 'OPERATION' ? '/ops' : '/org') + '/employee-user-access/' + res.data.employeeUserAccessCode]);
          this.isProcessing = false;
          dialogRef.componentInstance.isProcessing = this.isProcessing;
          dialogRef.close();
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
