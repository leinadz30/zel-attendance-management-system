import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonSchoolManagementDetailsComponent } from './common-school-management-details.component';

describe('CommonSchoolManagementDetailsComponent', () => {
  let component: CommonSchoolManagementDetailsComponent;
  let fixture: ComponentFixture<CommonSchoolManagementDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonSchoolManagementDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonSchoolManagementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
