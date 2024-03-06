import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonDepartmentsComponent } from './common-departments.component';

describe('CommonDepartmentsComponent', () => {
  let component: CommonDepartmentsComponent;
  let fixture: ComponentFixture<CommonDepartmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonDepartmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonDepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
