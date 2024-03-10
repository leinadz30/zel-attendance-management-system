/* eslint-disable @typescript-eslint/member-ordering */
import { AfterContentInit, AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Parents } from 'src/app/core/model/parents';
import { Schools } from 'src/app/core/model/schools';
import { Students } from 'src/app/core/model/students';
import { AnimationService } from 'src/app/core/services/animation.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ParentsService } from 'src/app/core/services/parents.service';
import { SchoolsService } from 'src/app/core/services/schools.service';
import { StorageService } from 'src/app/core/storage/storage.service';
import { PageLoaderService } from 'src/app/core/ui-service/page-loader.service';

@Component({
  selector: 'app-search-school',
  templateUrl: './search-school.page.html',
  styleUrls: ['./search-school.page.scss'],
})
export class SearchSchoolPage implements OnInit {
  modal;
  searchKey = new FormControl(null);
  selectedSchoolId = new FormControl(null, [Validators.required]);
  currentUser: Parents;
  selectedSchool: Schools;
  activeAditionalBackdrop = false;
  isSubmitting = false;
  isLoading = false;
  isSelectionLoading = true;
  canFocus = true;


  schools: Schools[] = [];
  pageIndex = 0;
  pageSize = 10;
  total = 0;
  order: any = { schoolCode: 'DESC' };

  constructor(
    private parentsService: ParentsService,
    private schoolsService: SchoolsService,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private pageLoaderService: PageLoaderService,
    private authService: AuthService,
    private modalCtrl: ModalController,
    private animationService: AnimationService,
    private storageService: StorageService) {
    this.currentUser = this.storageService.getLoginUser();
  }


  get isAuthenticated() {
    const currentUser = this.storageService.getLoginUser();
    return currentUser &&
    currentUser?.parentCode &&
    currentUser?.user &&
    currentUser?.user?.userId;
  }

  ngOnInit() {
    if(!this.selectedSchool || !this.selectedSchool?.schoolId || this.selectedSchool?.schoolId === '') {
      this.isSelectionLoading = false;
    }
    this.loadSchools();
    this.searchKey.valueChanges
    .pipe(
        debounceTime(1000),
        distinctUntilChanged()
    ).subscribe(res=> {
      this.loadSchools();
    });
    if(this.selectedSchool && this.selectedSchool?.schoolId && this.selectedSchool?.schoolId !== '') {
      this.selectedSchoolId.valueChanges
      .pipe(
          debounceTime(100),
          distinctUntilChanged()
      ).subscribe(res=> {
        if(this.canFocus && document.querySelector('ion-item.item-radio-checked')){
          document.querySelector('ion-item.item-radio-checked').scrollIntoView(false);
          this.isSelectionLoading = false;
          this.canFocus = false;
        }
      });
    }
  }

  loadSchools() {
    this.isLoading = true;
    this.schoolsService.getByAdvanceSearch({
      order: this.order,
      columnDef: [{
        apiNotation: 'schoolName',
        filter: this.searchKey.value??''
      } as any],
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    }).subscribe(res=> {
      this.isLoading = false;
      this.schools = this.pageIndex > 0 ? [...this.schools, ...res.data.results] : res.data.results;
      this.total = res.data.total;
      console.log(this.schools);
      if(this.selectedSchool && this.selectedSchool.schoolId) {
        this.selectedSchoolId.setValue(this.selectedSchool.schoolId);
        if(!this.schools.some(x=>x.schoolId === this.selectedSchool.schoolId)) {
          this.schools = [ this.selectedSchool, ...this.schools];
        }
      }
    });
  }

  loadMore() {
    this.pageIndex = this.pageIndex + 1;
    this.loadSchools();
  }

  select() {
    this.selectedSchool = this.schools.find(x=> x.schoolId === this.selectedSchoolId.value.toString());
    this.modal.dismiss(this.selectedSchool, 'confirm');
  }

  close() {
    this.modal.dismiss(null, 'cancel');
  }

  async presentAlert(options: any) {
    const alert = await this.alertController.create(options);
    return await alert.present();
  }
}
