import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsCoursesComponent } from './ops-courses.component';

describe('OpsCoursesComponent', () => {
  let component: OpsCoursesComponent;
  let fixture: ComponentFixture<OpsCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsCoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpsCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
