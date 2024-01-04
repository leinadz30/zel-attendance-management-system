import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsChangePasswordComponent } from './ops-change-password.component';

describe('OpsChangePasswordComponent', () => {
  let component: OpsChangePasswordComponent;
  let fixture: ComponentFixture<OpsChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsChangePasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpsChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
