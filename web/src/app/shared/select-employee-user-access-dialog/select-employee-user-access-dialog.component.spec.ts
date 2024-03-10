import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectEmployeeUserAccessDialogComponent } from './select-employee-user-access-dialog.component';

describe('SelectEmployeeUserAccessDialogComponent', () => {
  let component: SelectEmployeeUserAccessDialogComponent;
  let fixture: ComponentFixture<SelectEmployeeUserAccessDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectEmployeeUserAccessDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectEmployeeUserAccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
