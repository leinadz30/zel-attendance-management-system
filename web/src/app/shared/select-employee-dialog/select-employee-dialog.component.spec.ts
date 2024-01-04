import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectEmployeeDialogComponent } from './select-employee-dialog.component';

describe('SelectEmployeeDialogComponent', () => {
  let component: SelectEmployeeDialogComponent;
  let fixture: ComponentFixture<SelectEmployeeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectEmployeeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectEmployeeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
