import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Observable, Subscription, debounceTime, distinctUntilChanged, forkJoin, of, map } from 'rxjs';
import { EmployeeUserAccess } from 'src/app/model/employee-user-access';
import { ApiResponse } from 'src/app/model/api-response.model';
import { Users } from 'src/app/model/users';
import { EmployeeUserAccessService } from 'src/app/services/employee-user-access.service';
import { AppConfigService } from 'src/app/services/app-config.service';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { EmployeeUserService } from 'src/app/services/employee-user.service';
import { AlertDialogModel } from 'src/app/shared/alert-dialog/alert-dialog-model';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { MyErrorStateMatcher } from 'src/app/shared/form-validation/error-state.matcher';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { EmployeeUser } from 'src/app/model/employee-user';
import { AccessPagesTableComponent } from 'src/app/shared/access-pages-table/access-pages-table.component';
import { SelectEmployeeUserAccessDialogComponent } from 'src/app/shared/select-employee-user-access-dialog/select-employee-user-access-dialog.component';
import { Schools } from 'src/app/model/schools';
import { SelectEmployeeDialogComponent } from 'src/app/shared/select-employee-dialog/select-employee-dialog.component';
import { Employees } from 'src/app/model/employees';
import { SelectEmployeeTitleDialogComponent } from 'src/app/shared/select-employee-title-dialog/select-employee-title-dialog.component';
import { SelectDepartmentDialogComponent } from 'src/app/shared/select-department-dialog/select-department-dialog.component';
import { EmployeeTitles } from 'src/app/model/employee-titles';
import { Departments } from 'src/app/model/departments';
import { ComminEmployeeUserChangePasswordComponent } from '../common-employee-user-change-password/common-employee-user-change-password.component';

@Component({
  selector: 'app-common-employee-user-details',
  templateUrl: './common-employee-user-details.component.html',
  styleUrls: ['./common-employee-user-details.component.scss'],
  host: {
    class: 'page-component',
  },
})
export class CommonEmployeeUserDetailsComponent implements OnInit {
  currentUserId;
  currentEmployeeCode;
  employeeCode;
  isNew = false;
  // pageAccess: Access = {
  //   view: true,
  //   modify: false,
  // };

  isReadOnly = true;

  error;
  isLoading = true;

  employeeUserForm: FormGroup;
  mediaWatcher: Subscription;
  matcher = new MyErrorStateMatcher();
  isProcessing = false;
  isLoadingRoles = false;
  maxDate = moment(new Date().getFullYear() - 18).format('YYYY-MM-DD');

  @ViewChild('employeeUserAccessTable', { static: true}) employeeUserAccessTable: AccessPagesTableComponent;

  employeeUser: EmployeeUser;
  userProfilePicSource: any;
  userProfilePic;
  userProfilePicLoaded = false;


  selectedSchool: Schools;
  selectedEmployeeUserAccess: EmployeeUserAccess;

  mode: 'OPERATION' | 'ORGANIZATION';

  selectedExisitingEmployee: Employees;
  isNewFormExisiting = false;

  selectedDepartment: Departments;
  selectedEmployeeTitle: EmployeeTitles;
  constructor(
    private employeeUserService: EmployeeUserService,
    private employeeUserAccessService: EmployeeUserAccessService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private appconfig: AppConfigService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private spinner: SpinnerVisibilityService
  ) {
    const { isNew, edit } = this.route.snapshot.data;
    this.isNew = isNew ? isNew : false;
    this.employeeCode = this.route.snapshot.paramMap.get('employeeCode');
    const currentProfile = this.storageService.getLoginProfile();
    this.currentUserId = currentProfile.user?.userId;
    this.currentEmployeeCode = currentProfile.employee?.employeeCode;
    this.isReadOnly = !edit && !isNew;
    if (this.route.snapshot.data) {
      this.mode = this.route.snapshot.data["mode"];
      // this.pageAccess = {
      //   ...this.pageAccess,
      //   ...this.route.snapshot.data['access'],
      // };
    }
    if(isNew) {
      this.selectedSchool = new Schools();
      if(this.mode === "OPERATION") {
        this.selectedSchool.schoolCode = this.route.snapshot.paramMap.get('schoolCode');
        if(!this.selectedSchool?.schoolCode || this.selectedSchool?.schoolCode === '') {
          this.selectedSchool.schoolCode = this.storageService.getOpsRecentSchool();
        }
      } else {
        this.selectedSchool.schoolCode = currentProfile?.employee?.school?.schoolCode;
      }
    }
    if(!isNew && edit && edit !== undefined && this.currentEmployeeCode ===this.employeeCode) {
      this.router.navigate([(this.mode === 'OPERATION' ? '/ops' : '/org') + '/employee-user/' + this.employeeCode]);
    }
  }

  get pageRights() {
    let rights = {};
    // for(var right of this.pageAccess.rights) {
    //   rights[right] = this.pageAccess.modify;
    // }
    return rights;
  }

  get f() {
    return this.employeeUserForm.controls;
  }
  get formIsValid() {
    return this.employeeUserForm.valid;
  }
  get formIsReady() {
    return this.employeeUserForm.valid && this.employeeUserForm.dirty;
  }
  get formData() {
    return this.employeeUserForm.value;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.initDetails();
  }

  async initDetails() {
    try {
      if (this.isNew) {
        this.employeeUserForm = this.formBuilder.group(
          {
            orgEmployeeId: new FormControl(),
            fullName: new FormControl(null, Validators.required),
            mobileNumber: new FormControl(),
            cardNumber: new FormControl(),
            departmentId: new FormControl(null, Validators.required),
            employeeTitleId: new FormControl(null, Validators.required),
            password: [
              '',
              [
                Validators.minLength(6),
                Validators.maxLength(16),
                Validators.required,
              ],
            ],
            confirmPassword: '',
            employeeUserAccessId: new FormControl(null, [Validators.required])
          },
          { validators: this.checkPasswords }
        );
        this.isLoading = false;
      } else {
        this.employeeUserForm = this.formBuilder.group({
          orgEmployeeId: new FormControl(),
          fullName: new FormControl(null, Validators.required),
          mobileNumber: new FormControl(),
          cardNumber: new FormControl(),
          departmentId: new FormControl(null, Validators.required),
          employeeTitleId: new FormControl(null, Validators.required),
          employeeUserAccessId: new FormControl(null, [Validators.required])
        });


        forkJoin([
          this.employeeUserService.getByCode(this.employeeCode).toPromise(),
          this.employeeUserAccessService.getByAdvanceSearch({
          order: {},
          columnDef: [],
          pageIndex: 0,
          pageSize: 10
        })
        ]).subscribe(([employeeUser, employeeUserAccessOptions])=> {
          if (employeeUser.success) {
            this.employeeUser = employeeUser.data;
            this.employeeUserForm.patchValue({
              orgEmployeeId: employeeUser.data?.employee?.orgEmployeeId,
              fullName: employeeUser.data?.employee?.fullName,
              mobileNumber: employeeUser.data?.employee?.mobileNumber,
              cardNumber: employeeUser.data?.employee?.cardNumber,
              departmentId: employeeUser.data?.employee?.department?.departmentId,
              employeeTitleId: employeeUser.data?.employee?.employeePosition?.employeeTitleId,
              employeeUserAccessId: employeeUser.data?.employeeUserAccess?.employeeUserAccessId,
            });
            this.employeeUserForm.updateValueAndValidity();
            this.selectedEmployeeUserAccess = employeeUser.data.employeeUserAccess;
            this.selectedSchool = employeeUser.data.employee?.school;
            this.selectedDepartment = employeeUser.data.employee?.department;
            this.selectedEmployeeTitle = employeeUser.data.employee?.employeePosition;
            if(employeeUser.data.employeeUserAccess?.accessPages) {
              this.employeeUserAccessTable.setDataSource(employeeUser.data.employeeUserAccess?.accessPages);
            }
            if (this.isReadOnly) {
              this.employeeUserForm.disable();
            }

            // if(this.employeeUser.userProfilePic?.file?.url) {
            //   this.employeeUser = this.employeeUser.userProfilePic?.file?.url;
            // }
            this.isLoading = false;
          } else {
            this.isLoading = false;
            this.error = Array.isArray(employeeUser.message) ? employeeUser.message[0] : employeeUser.message;
            this.snackBar.open(this.error, 'close', {
              panelClass: ['style-error'],
            });
          }
        });
      }
    } catch(ex) {
      this.isLoading = false;
      this.error = Array.isArray(ex.message) ? ex.message[0] : ex.message;
      this.snackBar.open(this.error, 'close', {
        panelClass: ['style-error'],
      });
    }
  }

  selectedFromExistingEmployeeChanged(event) {
    console.log(event);
    this.isNewFormExisiting = event?.value === "existing";
    this.selectedExisitingEmployee = null;
    this.selectedDepartment = null;
    this.selectedEmployeeTitle = null;
    this.selectedEmployeeUserAccess = null;
    this.f["orgEmployeeId"].setValue(null);
    this.f["cardNumber"].setValue(null);
    this.f["mobileNumber"].setValue(null);
    this.f["fullName"].setValue(null);
    if(this.isNewFormExisiting) {
      this.f["fullName"].disable();
      this.f["mobileNumber"].disable();
      this.f["cardNumber"].disable();
    } else {
      this.f["fullName"].enable();
      this.f["mobileNumber"].enable();
      this.f["cardNumber"].enable();
    }
  }

  showSelectEmployeeUserAccessDialog() {
    const dialogRef = this.dialog.open(SelectEmployeeUserAccessDialogComponent, {
        disableClose: true,
        panelClass: "select-employee-user-access-dialog"
    });
    dialogRef.componentInstance.schoolCode = this.selectedSchool?.schoolCode;
    dialogRef.componentInstance.selected = {
      employeeUserAccessCode: this.selectedEmployeeUserAccess?.employeeUserAccessCode,
      employeeUserAccessId: this.selectedEmployeeUserAccess?.employeeUserAccessId,
      name: this.selectedEmployeeUserAccess?.name,
      selected: true
    }
    dialogRef.afterClosed().subscribe(async (res:any)=> {
      console.log(res);
      if(res && !res?.cancel) {
        this.selectedEmployeeUserAccess = res;
        if(res && res?.employeeUserAccessId) {
          this.f["employeeUserAccessId"].setValue(this.selectedEmployeeUserAccess?.employeeUserAccessId);
          const access = await this.employeeUserAccessService.getByCode(this.selectedEmployeeUserAccess?.employeeUserAccessCode).toPromise();
          if(access.data && access.data.accessPages) {
            this.employeeUserAccessTable.setDataSource(access.data.accessPages)
          }
        } else {
          this.f["employeeUserAccessId"].setValue(null);
          this.employeeUserAccessTable.setDataSource([])
        }
      }
    })
  }

  showSelectEmployeeTitleDialog() {
    const dialogRef = this.dialog.open(SelectEmployeeTitleDialogComponent, {
        disableClose: true,
        panelClass: "select-employee-title-dialog"
    });
    dialogRef.componentInstance.selected = {
      employeeTitleCode: this.selectedEmployeeTitle?.employeeTitleCode,
      name: this.selectedEmployeeTitle?.name,
      selected: true
    }
    dialogRef.componentInstance.schoolCode = this.selectedSchool?.schoolCode;
    dialogRef.afterClosed().subscribe((res:any)=> {
      console.log(res);
      if(res && !res?.cancel) {
        this.selectedEmployeeTitle = res;
        if(res && res?.employeeTitleId) {
          this.f["employeeTitleId"].setValue(res.employeeTitleId);
        } else {
          this.f["employeeTitleId"].setValue(null);
        }
        this.f["employeeTitleId"].markAllAsTouched();
        this.f["employeeTitleId"].markAsDirty();
      }
    })
  }

  showSelectDepartmentDialog() {
    const dialogRef = this.dialog.open(SelectDepartmentDialogComponent, {
        disableClose: true,
        panelClass: "select-department-dialog"
    });
    dialogRef.componentInstance.selected = {
      departmentCode: this.selectedDepartment?.departmentCode,
      departmentName: this.selectedDepartment?.departmentName,
      selected: true
    }
    dialogRef.componentInstance.schoolCode = this.selectedSchool?.schoolCode;
    dialogRef.componentInstance.type = "EMPLOYEE";
    dialogRef.afterClosed().subscribe((res:any)=> {
      console.log(res);
      if(res && !res?.cancel) {
        this.selectedDepartment = res;
        if(res && res?.departmentId) {
          this.f["departmentId"].setValue(res.departmentId);
        } else {
          this.f["departmentId"].setValue(null);
        }
        this.f["departmentId"].markAllAsTouched();
        this.f["departmentId"].markAsDirty();
      }
    })
  }

  showSelectEmployeeDialog() {
    const dialogRef = this.dialog.open(SelectEmployeeDialogComponent, {
        disableClose: true,
        panelClass: "select-employee-dialog"
    });
    dialogRef.componentInstance.schoolCode = this.selectedSchool?.schoolCode;
    dialogRef.componentInstance.includeEmployeeWithUserAccount = false;
    dialogRef.componentInstance.selected = {
      employeeCode: this.selectedExisitingEmployee?.employeeCode,
      fullName: this.selectedExisitingEmployee?.fullName,
      selected: true
    }
    dialogRef.afterClosed().subscribe(async (res:any)=> {
      console.log(res);
      if(res && !res?.cancel) {
        this.selectedExisitingEmployee = res;
        this.f["orgEmployeeId"].setValue(res?.orgEmployeeId);
        this.f["fullName"].setValue(res?.fullName);
        this.f["mobileNumber"].setValue(res?.mobileNumber);
        this.f["cardNumber"].setValue(res?.cardNumber);

        this.selectedDepartment = res.department;
        this.f["departmentId"].setValue(res.department?.departmentId);
        this.selectedEmployeeTitle = res.employeePosition;
        this.f["employeeTitleId"].setValue(res.employeePosition?.employeeTitleId);
      }
    })
  }

  // onShowImageViewer() {
  //   const dialogRef = this.dialog.open(ImageViewerDialogComponent, {
  //       disableClose: true,
  //       panelClass: "image-viewer-dialog"
  //   });
  //   const img: HTMLImageElement = document.querySelector(".profile-pic img");
  //   dialogRef.componentInstance.imageSource = img?.src;
  //   dialogRef.componentInstance.canChange = false;

  //   dialogRef.componentInstance.changed.subscribe(res=> {
  //     this.userProfilePicLoaded = false;
  //     this.userProfilePicSource = res.base64;
  //     dialogRef.close();

  //     this.userProfilePic = {
  //       fileName: `${moment().format("YYYY-MM-DD-hh-mm-ss")}.png`,
  //       data: res.base64.toString().split(',')[1]
  //     };
  //   })
  // }

  getError(key: string) {
    if (key === 'confirmPassword') {
      this.formData.confirmPassword !== this.formData.password
        ? this.f[key].setErrors({ notMatched: true })
        : this.f[key].setErrors(null);
    }
    return this.f[key].errors;
  }

  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notMatched: true };
  };

  onSubmit() {
    if (this.employeeUserForm.invalid) {
      return;
    }

    const isNew = this.isNew;
    const isNewFormExisiting = this.isNewFormExisiting;

    const dialogData = new AlertDialogModel();
    dialogData.title = 'Confirm';
    dialogData.message = 'Save user?';
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
        this.isProcessing = true;
        let res: ApiResponse<EmployeeUser>;
        if(isNew && !isNewFormExisiting) {
          const params = {
            ...this.formData,
            userName: this.formData?.mobileNumber,
            schoolCode: this.selectedSchool?.schoolCode,
            createdByUserId: this.currentUserId
          };
          res = await this.employeeUserService.create(params).toPromise();
        } else if(isNew && isNewFormExisiting) {
          const params = {
            employeeId: this.selectedExisitingEmployee?.employeeId,
            password: this.formData.password,
            userName: this.selectedExisitingEmployee?.mobileNumber,
            employeeUserAccessId: this.selectedEmployeeUserAccess?.employeeUserAccessId,
            createdByUserId: this.currentUserId
          };
          res = await this.employeeUserService.createFromEmployee(params).toPromise();
        }
        else {
          const params = {
            ...this.formData,
            updatedByUserId: this.currentUserId
          };
          res = await this.employeeUserService.update(this.employeeCode, params).toPromise();
        }

        if (res.success) {
          this.snackBar.open('Saved!', 'close', {
            panelClass: ['style-success'],
          });
          this.router.navigate([(this.mode === 'OPERATION' ? '/ops' : '/org') + '/employee-user/' + res.data.employee?.employeeCode]);
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

  openUpdatePasswordDialog() {
    const dialogRef = this.dialog.open(ComminEmployeeUserChangePasswordComponent, {
      maxWidth: '720px',
      width: '720px',
      disableClose: true,
    });
    dialogRef.componentInstance.employeeCode = this.employeeCode;
  }
  profilePicErrorHandler(event) {
    event.target.src = this.getDeafaultProfilePicture();
  }

  getDeafaultProfilePicture() {
    return '../../../../../assets/img/person.png'
  }
}
