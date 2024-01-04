import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsStudentFormComponent } from './ops-students-form.component';

describe('OpsStudentFormComponent', () => {
  let component: OpsStudentFormComponent;
  let fixture: ComponentFixture<OpsStudentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsStudentFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpsStudentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
