/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, AlertController, ActionSheetController, IonModal, IonRefresher } from '@ionic/angular';
import { NotificationService } from 'src/app/core/services/notification.service';
import { StorageService } from 'src/app/core/storage/storage.service';
import { PageLoaderService } from 'src/app/core/ui-service/page-loader.service';

// English.
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { forkJoin } from 'rxjs';
import * as moment from 'moment';
import { AuthService } from 'src/app/core/services/auth.service';
import { TimelinePage } from '../timeline/timeline.page';
import { AnimationService } from 'src/app/core/services/animation.service';
import { Parents } from 'src/app/core/model/parents';
import { Notifications } from 'src/app/core/model/notifications';
import { MyLinkStudentRequestsPage } from '../my-link-student-requests/my-link-student-requests.page';
import { LinkStudentRequest } from 'src/app/core/model/link-student-request';
import { LinkStudentRequestService } from 'src/app/core/services/link-student-request.service';
import { PusherService } from 'src/app/core/services/pusher.service';
import { TapLogs } from 'src/app/core/model/tap-logs';
import { TapLogsService } from 'src/app/core/services/tap-logs.service';

export class NotificationsView extends Notifications {
  icon: 'notifications' | 'checkmark-circle' | 'close-circle' | 'megaphone' | 'person' | 'enter' | 'log-out';
  iconColor: 'primary' | 'secondary' | 'warning' | 'danger' | 'tertiary';
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class NotificationPage implements OnInit, AfterViewInit {
  currentUser: Parents;
  data: NotificationsView[] = [];
  pageIndex = 0;
  pageSize = 10;
  total = 0;
  isLoading = false;
  error: any;
  limit = 10;
  totalItems = 0;
  totalUnreadNotification = 0;
  request: LinkStudentRequest;
  tapLog: TapLogs;
  @ViewChild('requestInfoModal', { static: false }) requestInfoModal: IonModal;
  @ViewChild('studentTimeInfoModal', { static: false }) studentTimeInfoModal: IonModal;
  @ViewChild(IonRefresher)ionRefresher: IonRefresher;
  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private pageLoaderService: PageLoaderService,
    private alertController: AlertController,
    private notificationService: NotificationService,
    private linkStudentRequestService: LinkStudentRequestService,
    private tapLogsService: TapLogsService,
    private authService: AuthService,
    private animationService: AnimationService,
    private storageService: StorageService,
    private actionSheetCtrl: ActionSheetController,
    private pusherService: PusherService) {
      this.currentUser = this.storageService.getLoginUser();
      this.initNotification(this.currentUser.user?.userId);
      // TimeAgo.addDefaultLocale(en);
    }

  ngOnInit() {
    const channel = this.pusherService.init(this.currentUser.user.userId);
    channel.bind('notifAdded', (res: any) => {
      this.doRefresh();
    });
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    // this.studentTimeInfoModal.present();
  }

  get isAuthenticated() {
    const currentUser = this.storageService.getLoginUser();
    return currentUser &&
    currentUser?.parentCode &&
    currentUser?.user &&
    currentUser?.user?.userId;
  }

  async initNotification(userId: string){
    this.isLoading = true;
    const result = await forkJoin([
      this.notificationService.getByAdvanceSearch({
        order: { notificationId: "DESC" },
        columnDef: [{
          apiNotation: "forUser.userId",
          filter: userId,
          type: "precise"
        } as any],
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }),
      this.notificationService.getUnreadByUser(userId),
    ]).toPromise();
    // do things
    const newNotif = result[0].data.results.map(x=> {
      const n = x as NotificationsView;
      if(n.type === 'LINK_STUDENT' && n.title.toLowerCase().includes('approved')) {
        n.icon = 'checkmark-circle';
        n.iconColor = 'primary';
      } else if(n.type === 'LINK_STUDENT' && n.title.toLowerCase().includes('rejected')) {
        n.icon = 'close-circle';
        n.iconColor = 'danger';
      } else if(n.type === 'STUDENT_LOGIN_LOGOUT' && n.description.toLowerCase().includes('arrived')) {
        n.icon = 'enter';
        n.iconColor = 'secondary';
      } else if(n.type === 'STUDENT_LOGIN_LOGOUT' && n.description.toLowerCase().includes('left')) {
        n.icon = 'log-out';
      } else {
        n.icon = 'notifications';
        n.iconColor = 'primary';
      }
      return x as NotificationsView;
    });
    this.data = [ ...this.data, ...newNotif ];
    this.totalItems = result[0].data.total;
    this.totalUnreadNotification = result[1].data;
    this.storageService.saveTotalUnreadNotif(this.totalUnreadNotification);
    this.isLoading = false;
    if(this.ionRefresher) {
      this.ionRefresher.complete();
    }
  }

  async getTimeAgo(date: Date) {
    if(!this.isLoading) {
      const timeAgo = new TimeAgo('en-US');
      return timeAgo.format(date);
    } else {
      return null;
    }
  }
  async onNotificationClick(notif: Notifications) {
    if(!this.isAuthenticated) {
      this.authService.logout();
    }

    if(notif.type === "LINK_STUDENT") {
      await this.pageLoaderService.open('Loading please wait...');
      const res = await this.linkStudentRequestService.getByCode(notif.referenceId).toPromise();
      this.request = res.data;
      this.pageLoaderService.close();
      this.requestInfoModal.present();
      this.requestInfoModal.onWillDismiss().then(()=> {
        if(!this.data.filter(x=>x.notificationId === notif.notificationId)[0].isRead) {
          this.markNotifAsRead(notif);
        }
      });
    } else if(notif.type === "ANNOUNCEMENT") {
    } else {
      //for student log in/log out
      await this.pageLoaderService.open('Loading please wait...');
      const res = await this.tapLogsService.getById(notif.referenceId).toPromise();
      this.tapLog = res.data;
      this.pageLoaderService.close();
      this.studentTimeInfoModal.present();
      this.studentTimeInfoModal.onWillDismiss().then(()=> {
        if(!this.data.filter(x=>x.notificationId === notif.notificationId)[0].isRead) {
          this.markNotifAsRead(notif);
        }
      });
    }
  }

  async getTotalUnreadNotif(userId: string){
    try {
      this.isLoading = true;
      this.notificationService.getUnreadByUser(userId).subscribe((res)=> {
        if(res.success){
          console.log(res.data);
          this.totalUnreadNotification = res.data.total;
          this.storageService.saveTotalUnreadNotif(this.totalUnreadNotification);
          this.isLoading = false;
          if(this.ionRefresher) {
            this.ionRefresher.complete();
          }
        } else {
          this.isLoading = false;
          this.error = Array.isArray(res.message)
            ? res.message[0]
            : res.message;
          this.presentAlert(this.error);
        }
      },
      async (err) => {
        this.isLoading = false;
        this.error = Array.isArray(err.message)
          ? err.message[0]
          : err.message;
        this.presentAlert(this.error);
      });
    } catch (e) {
      this.isLoading = false;
      this.error = Array.isArray(e.message) ? e.message[0] : e.message;
      this.presentAlert(this.error);
    }
  }

  async loadMore() {
    this.pageIndex = this.pageIndex + 1;
    await this.initNotification(this.currentUser.user?.userId);
  }

  async doRefresh(){
    try {
      if(this.isLoading) {
        return;
      }
      this.data = [];
      this.pageIndex = 0;
      this.pageSize = 10;
      await this.initNotification(this.currentUser.user?.userId);
    } catch(ex) {
      if(this.ionRefresher) {
        this.ionRefresher.complete();
      }
    }
 }

  async presentAlert(options: any) {
    const alert = await this.alertController.create(options);
    await alert.present();
  }

  async markNotifAsRead(notifDetails: { notificationId: string }) {
    try{
      this.notificationService.marAsRead(notifDetails.notificationId)
        .subscribe(async res => {
          if (res.success) {
            this.data.filter(x=>x.notificationId === notifDetails.notificationId)[0].isRead = true;
            this.storageService.saveTotalUnreadNotif(res.data.total);
          } else {
            await this.presentAlert({
              header: 'Try again!',
              message: Array.isArray(res.message) ? res.message[0] : res.message,
              buttons: ['OK']
            });
          }
        }, async (err) => {
          await this.presentAlert({
            header: 'Try again!',
            message: Array.isArray(err.message) ? err.message[0] : err.message,
            buttons: ['OK']
          });
        });
    } catch (e){
      await this.presentAlert({
        header: 'Try again!',
        message: Array.isArray(e.message) ? e.message[0] : e.message,
        buttons: ['OK']
      });
    }
  }


  ionViewWillEnter(){
    console.log('visited');
    if(window.history.state && window.history.state.open && window.history.state.open){
      const details = window.history.state.open as any;
      // this.openDetails(details);
    }
  }

  close() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
}
