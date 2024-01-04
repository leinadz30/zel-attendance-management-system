import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDepartmentDialogComponent } from './select-department-dialog.component';

describe('SelectDepartmentDialogComponent', () => {
  let component: SelectDepartmentDialogComponent;
  let fixture: ComponentFixture<SelectDepartmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectDepartmentDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectDepartmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
