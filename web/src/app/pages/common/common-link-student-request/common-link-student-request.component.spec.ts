import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonLinkStudentRequestComponent } from './common-link-student-request.component';

describe('CommonLinkStudentRequestComponent', () => {
  let component: CommonLinkStudentRequestComponent;
  let fixture: ComponentFixture<CommonLinkStudentRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonLinkStudentRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonLinkStudentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
