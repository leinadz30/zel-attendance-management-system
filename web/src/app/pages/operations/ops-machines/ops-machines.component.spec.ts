import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsMachinesComponent } from './ops-machines.component';

describe('OpsMachinesComponent', () => {
  let component: OpsMachinesComponent;
  let fixture: ComponentFixture<OpsMachinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsMachinesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpsMachinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
