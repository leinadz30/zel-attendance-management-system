import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonLinkStudentRequestDetailsComponent } from './common-link-student-request-details.component';

describe('CommonLinkStudentRequestDetailsComponent', () => {
  let component: CommonLinkStudentRequestDetailsComponent;
  let fixture: ComponentFixture<CommonLinkStudentRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonLinkStudentRequestDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonLinkStudentRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
