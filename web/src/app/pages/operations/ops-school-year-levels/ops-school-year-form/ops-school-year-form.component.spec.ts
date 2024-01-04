import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsSchoolYearLevelFormComponent } from './ops-school-year-form.component';

describe('OpsSchoolYearLevelFormComponent', () => {
  let component: OpsSchoolYearLevelFormComponent;
  let fixture: ComponentFixture<OpsSchoolYearLevelFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsSchoolYearLevelFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpsSchoolYearLevelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
