import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsParentDetailsComponent } from './ops-parent-details.component';

describe('OpsParentDetailsComponent', () => {
  let component: OpsParentDetailsComponent;
  let fixture: ComponentFixture<OpsParentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsParentDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpsParentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
