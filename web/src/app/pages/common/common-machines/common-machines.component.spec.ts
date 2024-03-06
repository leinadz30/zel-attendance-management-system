import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonMachinesComponent } from './common-machines.component';

describe('CommonMachinesComponent', () => {
  let component: CommonMachinesComponent;
  let fixture: ComponentFixture<CommonMachinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonMachinesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonMachinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
