import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsMachineFormComponent } from './ops-machines-form.component';

describe('OpsMachineFormComponent', () => {
  let component: OpsMachineFormComponent;
  let fixture: ComponentFixture<OpsMachineFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsMachineFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpsMachineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
