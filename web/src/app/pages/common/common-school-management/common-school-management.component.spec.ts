import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonSchoolManagementComponent } from './common-school-management.component';

describe('CommonSchoolManagementComponent', () => {
  let component: CommonSchoolManagementComponent;
  let fixture: ComponentFixture<CommonSchoolManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonSchoolManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonSchoolManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
