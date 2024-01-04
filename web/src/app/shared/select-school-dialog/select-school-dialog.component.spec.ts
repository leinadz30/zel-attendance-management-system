import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSchoolDialogComponent } from './select-school-dialog.component';

describe('SelectSchoolDialogComponent', () => {
  let component: SelectSchoolDialogComponent;
  let fixture: ComponentFixture<SelectSchoolDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectSchoolDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectSchoolDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
