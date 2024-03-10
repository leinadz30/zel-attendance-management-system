import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonDepartmentFormComponent } from './common-departments-form.component';

describe('CommonDepartmentFormComponent', () => {
  let component: CommonDepartmentFormComponent;
  let fixture: ComponentFixture<CommonDepartmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonDepartmentFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonDepartmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
