import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsEmployeeTitleFormComponent } from './ops-employee-titles-form.component';

describe('OpsEmployeeTitleFormComponent', () => {
  let component: OpsEmployeeTitleFormComponent;
  let fixture: ComponentFixture<OpsEmployeeTitleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsEmployeeTitleFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpsEmployeeTitleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
