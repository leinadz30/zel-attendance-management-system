import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsHomeComponent } from './ops-home.component';

describe('OpsHomeComponent', () => {
  let component: OpsHomeComponent;
  let fixture: ComponentFixture<OpsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
