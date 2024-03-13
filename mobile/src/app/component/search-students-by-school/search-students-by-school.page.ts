import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController, AlertOptions, ModalController } from '@ionic/angular';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Parents } from 'src/app/core/model/parents';
import { Students } from 'src/app/core/model/students';
import { AnimationService } from 'src/app/core/services/animation.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ParentsService } from 'src/app/core/services/parents.service';
import { StudentsService } from 'src/app/core/services/students.service';
import { StorageService } from 'src/app/core/storage/storage.service';
import { PageLoaderService } from 'src/app/core/ui-service/page-loader.service';

@Component({
  selector: 'app-search-students-by-school',
  templateUrl: './search-students-by-school.page.html',
  styleUrls: ['./search-students-by-school.page.scss'],
})
export class SearchStudentsBySchoolPage implements OnInit {
  modal;
  searchKey = new FormControl(null);
  selectedStudentId = new FormControl(null, [Validators.required]);
  currentUser: Parents;
  selectedStudent: Students;
  schoolCode;
  isSubmitting = false;
  isLoading = false;
  isSelectionLoading = true;
  canFocus = true;


  students: Students[] = [];
  pageIndex = 0;
  pageSize = 10;
  total = 0;
  order: any = { studentCode: 'DESC' };

  constructor(
    private parentsService: ParentsService,
    private studentsService: StudentsService,
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
    if(!this.selectedStudent || !this.selectedStudent?.studentId || this.selectedStudent?.studentId === '') {
      this.isSelectionLoading = false;
    }
    this.loadStudents();
    this.searchKey.valueChanges
    .pipe(
        debounceTime(1000),
        distinctUntilChanged()
    ).subscribe(res=> {
      this.loadStudents();
    });
    if(this.selectedStudent && this.selectedStudent?.studentId && this.selectedStudent?.studentId !== '') {
      this.selectedStudentId.valueChanges
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

  loadStudents() {
    this.isLoading = true;
    this.studentsService.getByAdvanceSearch({
      order: this.order,
      columnDef: [{
        apiNotation: 'fullName',
        filter: this.searchKey.value??''
      } as any, {
        apiNotation: 'school.schoolCode',
        filter: this.schoolCode??''
      } as any],
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    }).subscribe(res=> {
      this.isLoading = false;
      this.students = this.pageIndex > 0 ? [...this.students, ...res.data.results] : res.data.results;
      this.total = res.data.total;
      console.log(this.students);
      if(this.selectedStudent && this.selectedStudent.studentId) {
        this.selectedStudentId.setValue(this.selectedStudent.studentId);
        if(!this.students.some(x=>x.studentId === this.selectedStudent.studentId)) {
          this.students = [ this.selectedStudent, ...this.students];
        }
      }
    });
  }

  loadMore() {
    this.pageIndex = this.pageIndex + 1;
    this.loadStudents();
  }

  select() {
    this.selectedStudent = this.students.find(x=> x.studentId === this.selectedStudentId.value.toString());
    this.modal.dismiss(this.selectedStudent, 'confirm');
  }

  close() {
    this.modal.dismiss(null, 'cancel');
  }

  async presentAlert(options: AlertOptions) {
    const alert = await this.alertController.create(options);
    return await alert.present();
  }
}
