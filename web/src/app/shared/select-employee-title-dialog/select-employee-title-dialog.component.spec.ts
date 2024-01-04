import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectEmployeeTitleDialogComponent } from './select-employee-title-dialog.component';

describe('SelectEmployeeTitleDialogComponent', () => {
  let component: SelectEmployeeTitleDialogComponent;
  let fixture: ComponentFixture<SelectEmployeeTitleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectEmployeeTitleDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectEmployeeTitleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
