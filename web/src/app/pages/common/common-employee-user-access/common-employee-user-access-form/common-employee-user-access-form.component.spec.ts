import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonEmployeeUserAccessFormComponent } from './common-employee-user-access-form.component';

describe('CommonEmployeeUserAccessFormComponent', () => {
  let component: CommonEmployeeUserAccessFormComponent;
  let fixture: ComponentFixture<CommonEmployeeUserAccessFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonEmployeeUserAccessFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonEmployeeUserAccessFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
