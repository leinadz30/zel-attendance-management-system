import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonEmployeeUserAccessDetailsComponent } from './common-employee-user-access-details.component';

describe('CommonEmployeeUserAccessDetailsComponent', () => {
  let component: CommonEmployeeUserAccessDetailsComponent;
  let fixture: ComponentFixture<CommonEmployeeUserAccessDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonEmployeeUserAccessDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonEmployeeUserAccessDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
