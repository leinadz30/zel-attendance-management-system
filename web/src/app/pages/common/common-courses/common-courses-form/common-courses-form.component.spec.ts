import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonCourseFormComponent } from './common-courses-form.component';

describe('CommonCourseFormComponent', () => {
  let component: CommonCourseFormComponent;
  let fixture: ComponentFixture<CommonCourseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonCourseFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonCourseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
