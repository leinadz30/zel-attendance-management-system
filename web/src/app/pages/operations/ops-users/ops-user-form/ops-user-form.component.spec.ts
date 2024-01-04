import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsUserFormComponent } from './ops-user-form.component';

describe('OpsUserFormComponent', () => {
  let component: OpsUserFormComponent;
  let fixture: ComponentFixture<OpsUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsUserFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpsUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
