import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonStrandsComponent } from './common-strands.component';

describe('CommonStrandsComponent', () => {
  let component: CommonStrandsComponent;
  let fixture: ComponentFixture<CommonStrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonStrandsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonStrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
