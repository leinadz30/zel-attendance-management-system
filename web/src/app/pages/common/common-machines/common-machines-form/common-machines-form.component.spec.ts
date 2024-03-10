import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonMachineFormComponent } from './common-machines-form.component';

describe('CommonMachineFormComponent', () => {
  let component: CommonMachineFormComponent;
  let fixture: ComponentFixture<CommonMachineFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonMachineFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonMachineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
