import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsSchoolYearLevelsComponent } from './ops-school-year-levels.component';

describe('OpsSchoolYearLevelsComponent', () => {
  let component: OpsSchoolYearLevelsComponent;
  let fixture: ComponentFixture<OpsSchoolYearLevelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsSchoolYearLevelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpsSchoolYearLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
