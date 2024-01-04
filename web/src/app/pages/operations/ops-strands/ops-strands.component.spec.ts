import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsStrandsComponent } from './ops-strands.component';

describe('OpsStrandsComponent', () => {
  let component: OpsStrandsComponent;
  let fixture: ComponentFixture<OpsStrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsStrandsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpsStrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
