import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { MyStudentsPage } from './my-students.page';

describe('MyStudentsPage', () => {
  let component: MyStudentsPage;
  let fixture: ComponentFixture<MyStudentsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyStudentsPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MyStudentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
