import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchStudentsBySchoolPage } from './search-students-by-school.page';

describe('SearchStudentsBySchoolPage', () => {
  let component: SearchStudentsBySchoolPage;
  let fixture: ComponentFixture<SearchStudentsBySchoolPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchStudentsBySchoolPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchStudentsBySchoolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
