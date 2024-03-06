import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonSchoolYearLevelsComponent } from './common-school-year-levels.component';

describe('CommonSchoolYearLevelsComponent', () => {
  let component: CommonSchoolYearLevelsComponent;
  let fixture: ComponentFixture<CommonSchoolYearLevelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonSchoolYearLevelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonSchoolYearLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
