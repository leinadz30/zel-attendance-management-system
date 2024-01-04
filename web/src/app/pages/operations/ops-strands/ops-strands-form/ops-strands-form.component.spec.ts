import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsStrandFormComponent } from './ops-strands-form.component';

describe('OpsStrandFormComponent', () => {
  let component: OpsStrandFormComponent;
  let fixture: ComponentFixture<OpsStrandFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsStrandFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpsStrandFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
