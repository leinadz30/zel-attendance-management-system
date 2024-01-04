import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsCourseFormComponent } from './ops-courses-form.component';

describe('OpsCourseFormComponent', () => {
  let component: OpsCourseFormComponent;
  let fixture: ComponentFixture<OpsCourseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsCourseFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpsCourseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
