import { StorageService } from './../../../core/storage/storage.service';
import { ParentsService } from './../../../core/services/parents.service';
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { PageLoaderService } from 'src/app/core/ui-service/page-loader.service';
import { Parents } from 'src/app/core/model/parents';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-account-deletion',
  templateUrl: './account-deletion.page.html',
  styleUrls: ['./account-deletion.page.scss'],
})
export class AccountDeletionPage implements OnInit {
  currentUser: Parents;
  modal;
  @ViewChild('swipeButton', { read: ElementRef }) swipeButton!: ElementRef;
  color = 'primary';
  text = 'Swipe to continue';

  swipeInProgress = false;
  colWidth!: number;
  translateX!: number;
  @ViewChild('swipeToContinueModal', { static: false }) swipeToContinueModal: IonModal;

  isSubmitting = false;
  isOpenRequestResultModal = false;
  requestResultModal: { type: 'success' | 'failed' | 'warning'; title: string; desc: string; done?; retry? };
  constructor(private pageLoaderService: PageLoaderService,
    private parentsService: ParentsService,
    private authService: AuthService,
    private storageService: StorageService) {
      this.currentUser = this.storageService.getLoginUser();
    }

  ngOnInit() {
  }

  close() {
    this.modal.dismiss(null, 'cancel');
  }

  onDeleteAccount() {
    this.swipeToContinueModal.present();
  }

  onTouchStart(event: TouchEvent) {
    this.swipeInProgress = true;
  }

  onTouchMove(event: any) {
    if (this.swipeInProgress) {
      const deltaX = event.touches[0].clientX;
      console.log('deltax: ', deltaX);
      this.colWidth = this.swipeButton.nativeElement.parentElement.clientWidth;
      console.log('colWidth: ', this.colWidth);
      this.translateX = Math.min(deltaX, this.colWidth);
      console.log('translatex: ', this.translateX);
      this.swipeButton.nativeElement.style.transform = `translateX(${this.translateX}px)`;
    }
  }

  async onTouchEnd(event: any) {
    console.log(event);
    if(this.translateX === this.colWidth) {
      console.log('swiped');
      this.text = 'Swiped';
      this.color = 'success';
      await this.delay(100);
      await this.deleteAccount();
      // this.text = 'Swipe';
      // this.color = 'primary';
    }
    // this.swipeInProgress = false;
    // this.swipeButton.nativeElement.style.transform = 'translateX(0)';
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async deleteAccount() {
    try {
      await this.pageLoaderService.open('Processing please wait...');
      this.isSubmitting = true;
      this.parentsService.delete(this.currentUser.parentCode).subscribe(
        async (res) => {
          if (res.success) {
            await this.pageLoaderService.close();
            this.isSubmitting = false;
            this.isOpenRequestResultModal = true;
            this.requestResultModal = {
              title: 'Account deleted!',
              desc: 'Account was successfully deleted.',
              type: 'success',
              done: ()=> {
                this.isOpenRequestResultModal = false;
                this.authService.logout();
                this.swipeToContinueModal.dismiss();
                this.close();
              }
            };
          } else {
            this.isSubmitting = false;
            await this.pageLoaderService.close();
            this.swipeToContinueModal.dismiss();
            this.isOpenRequestResultModal = true;
            this.requestResultModal = {
              title: 'Oops!',
              desc: res.message,
              type: 'failed',
              retry: ()=> {
                this.isOpenRequestResultModal = false;
              },
            };
          }
        },
        async (err) => {
          this.isSubmitting = false;
          await this.pageLoaderService.close();
          this.swipeToContinueModal.dismiss();
          this.isOpenRequestResultModal = true;
          this.requestResultModal = {
            title: 'Oops!',
            desc: 'Error: ' + err?.message,
            type: 'failed',
            retry: ()=> {
              this.isOpenRequestResultModal = false;
            },
          };
        }
      );
    } catch (e) {
      this.isSubmitting = false;
      await this.pageLoaderService.close();
      this.swipeToContinueModal.dismiss();
      this.isOpenRequestResultModal = true;
      this.requestResultModal = {
        title: 'Oops!',
        desc: 'Error: ' + e?.message,
        type: 'failed',
        retry: ()=> {
          this.isOpenRequestResultModal = false;
        },
      };
    }
  }

}
