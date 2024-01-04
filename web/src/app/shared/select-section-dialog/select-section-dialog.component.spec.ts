import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSectionDialogTableColumn } from './select-section-dialog.component';

describe('SelectSectionDialogTableColumn', () => {
  let component: SelectSectionDialogTableColumn;
  let fixture: ComponentFixture<SelectSectionDialogTableColumn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectSectionDialogTableColumn ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectSectionDialogTableColumn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
