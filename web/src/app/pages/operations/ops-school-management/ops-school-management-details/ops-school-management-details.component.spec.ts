import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsSchoolManagementDetailsComponent } from './ops-school-management-details.component';

describe('OpsSchoolManagementDetailsComponent', () => {
  let component: OpsSchoolManagementDetailsComponent;
  let fixture: ComponentFixture<OpsSchoolManagementDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsSchoolManagementDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpsSchoolManagementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
