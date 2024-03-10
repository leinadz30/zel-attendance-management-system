import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonStudentParentsDialogComponent } from './common-students-parents-dialog.component';

describe('CommonStudentParentsDialogComponent', () => {
  let component: CommonStudentParentsDialogComponent;
  let fixture: ComponentFixture<CommonStudentParentsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonStudentParentsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonStudentParentsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
