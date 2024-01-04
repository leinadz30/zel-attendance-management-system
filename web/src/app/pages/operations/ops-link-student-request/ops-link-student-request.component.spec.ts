import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsLinkStudentRequestComponent } from './ops-link-student-request.component';

describe('OpsLinkStudentRequestComponent', () => {
  let component: OpsLinkStudentRequestComponent;
  let fixture: ComponentFixture<OpsLinkStudentRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsLinkStudentRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpsLinkStudentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
