import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router, ResolveEnd, ActivatedRouteSnapshot, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { Employees } from 'src/app/model/employees';
import { EmployeeUser } from 'src/app/model/employee-user';
import { Operators } from 'src/app/model/operators';
import { AppConfigService } from 'src/app/services/app-config.service';
import { AuthService } from 'src/app/services/auth.service';
import { RouteService } from 'src/app/services/route.service';
import { StorageService } from 'src/app/services/storage.service';
import { AlertDialogModel } from 'src/app/shared/alert-dialog/alert-dialog-model';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { OneSignal } from 'onesignal-ngx';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
})
export class OrgComponent {
  appName = "";
  title = "";
  loading = false;
  drawerDefaultOpened = false;
  details = false;
  profile: EmployeeUser;
  currentGroup;
  disableGroupAnimation = true;
  constructor(
    private oneSignal: OneSignal,
    private titleService:Title,
    private authService: AuthService,
    private storageService: StorageService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private routeService: RouteService
    ) {
      this.profile = this.storageService.getLoginProfile();
      this.onResize();
      this.routeService.data$.subscribe((res: { title: string; ops: boolean; details: boolean }) => {
        this.title = res.title;
        this.details = res.details;
      });
  }
  async ngOnInit(): Promise<void> {
    await this.oneSignal.init({
      appId: environment.oneSignalAppId,
    });
    this.oneSignal.Notifications.requestPermission()
    console.log("PushSubscription.permission ", this.oneSignal.Notifications?.permission);
    console.log("PushSubscription.token ", this.oneSignal.User?.PushSubscription?.token);
    console.log("PushSubscription.optedIn ", this.oneSignal.User?.PushSubscription?.optedIn);
    console.log("PushSubscription.token ", this.oneSignal.User?.PushSubscription?.token);
    await this.oneSignal.User.PushSubscription.optIn();
    await this.oneSignal.login(this.profile?.employee?.mobileNumber);
    await this.oneSignal.User.addTag("Department", this.profile?.employee?.department?.departmentName);
  }

  onActivate(event) {
    this.onResize();
  }

  expand(group = "") {
    return this.currentGroup?.toLowerCase() === group.toLowerCase();
  }

  signOut() {
    const dialogData = new AlertDialogModel();
    dialogData.title = 'Confirm';
    dialogData.message = 'Are you sure you want to logout?';
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
    dialogRef.componentInstance.conFirm.subscribe(async (confirmed: any) => {
      const profile = this.storageService.getLoginProfile();
      this.storageService.saveLoginProfile(null);
      this.authService.redirectToPage(profile, true)
      dialogRef.close();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    if(window.innerWidth >= 960) {
      this.drawerDefaultOpened = true;
    } else {
      this.drawerDefaultOpened = false;
    }
  }
}
