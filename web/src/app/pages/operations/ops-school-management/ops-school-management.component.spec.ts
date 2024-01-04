import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsSchoolManagementComponent } from './ops-school-management.component';

describe('OpsSchoolManagementComponent', () => {
  let component: OpsSchoolManagementComponent;
  let fixture: ComponentFixture<OpsSchoolManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsSchoolManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpsSchoolManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
