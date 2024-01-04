import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsLinkStudentRequestDetailsComponent } from './ops-link-student-request-details.component';

describe('OpsLinkStudentRequestDetailsComponent', () => {
  let component: OpsLinkStudentRequestDetailsComponent;
  let fixture: ComponentFixture<OpsLinkStudentRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsLinkStudentRequestDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpsLinkStudentRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
