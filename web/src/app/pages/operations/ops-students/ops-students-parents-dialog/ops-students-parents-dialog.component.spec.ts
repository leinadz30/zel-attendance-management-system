import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsStudentParentsDialogComponent } from './ops-students-parents-dialog.component';

describe('OpsStudentParentsDialogComponent', () => {
  let component: OpsStudentParentsDialogComponent;
  let fixture: ComponentFixture<OpsStudentParentsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsStudentParentsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpsStudentParentsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
