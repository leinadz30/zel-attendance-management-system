import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSchoolYearLevelDialogComponent } from './select-school-year-level-dialog.component';

describe('SelectSchoolYearLevelDialogComponent', () => {
  let component: SelectSchoolYearLevelDialogComponent;
  let fixture: ComponentFixture<SelectSchoolYearLevelDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectSchoolYearLevelDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectSchoolYearLevelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
