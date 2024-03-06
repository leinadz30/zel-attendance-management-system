import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonCoursesComponent } from './common-courses.component';

describe('CommonCoursesComponent', () => {
  let component: CommonCoursesComponent;
  let fixture: ComponentFixture<CommonCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonCoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
