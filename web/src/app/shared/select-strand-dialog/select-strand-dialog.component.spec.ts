import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectStrandDialogComponent } from './select-strand-dialog.component';

describe('SelectStrandDialogComponent', () => {
  let component: SelectStrandDialogComponent;
  let fixture: ComponentFixture<SelectStrandDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectStrandDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectStrandDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
