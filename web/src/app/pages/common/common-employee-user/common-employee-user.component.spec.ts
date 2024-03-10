import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonEmployeeUserComponent } from './common-employee-user.component';

describe('CommonEmployeeUserComponent', () => {
  let component: CommonEmployeeUserComponent;
  let fixture: ComponentFixture<CommonEmployeeUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonEmployeeUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonEmployeeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
