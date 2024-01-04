import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsEmployeesComponent } from './ops-employees.component';

describe('OpsEmployeesComponent', () => {
  let component: OpsEmployeesComponent;
  let fixture: ComponentFixture<OpsEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsEmployeesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpsEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
