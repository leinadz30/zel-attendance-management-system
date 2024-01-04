import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsEmployeeTitleComponent } from './ops-employee-titles.component';

describe('OpsEmployeeTitleComponent', () => {
  let component: OpsEmployeeTitleComponent;
  let fixture: ComponentFixture<OpsEmployeeTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsEmployeeTitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpsEmployeeTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
