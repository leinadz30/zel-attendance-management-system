import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsStudentsComponent } from './ops-students.component';

describe('OpsStudentsComponent', () => {
  let component: OpsStudentsComponent;
  let fixture: ComponentFixture<OpsStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsStudentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpsStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
