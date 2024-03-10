import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonSchoolYearLevelFormComponent } from './common-school-year-form.component';

describe('CommonSchoolYearLevelFormComponent', () => {
  let component: CommonSchoolYearLevelFormComponent;
  let fixture: ComponentFixture<CommonSchoolYearLevelFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonSchoolYearLevelFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonSchoolYearLevelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
