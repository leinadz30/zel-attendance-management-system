import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonSectionFormComponent } from './common-sections-form.component';

describe('CommonSectionFormComponent', () => {
  let component: CommonSectionFormComponent;
  let fixture: ComponentFixture<CommonSectionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonSectionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonSectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
