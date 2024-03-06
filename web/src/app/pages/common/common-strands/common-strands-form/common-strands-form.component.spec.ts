import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonStrandFormComponent } from './common-strands-form.component';

describe('CommonStrandFormComponent', () => {
  let component: CommonStrandFormComponent;
  let fixture: ComponentFixture<CommonStrandFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonStrandFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonStrandFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
