import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonEmployeeTitleFormComponent } from './common-employee-titles-form.component';

describe('CommonEmployeeTitleFormComponent', () => {
  let component: CommonEmployeeTitleFormComponent;
  let fixture: ComponentFixture<CommonEmployeeTitleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonEmployeeTitleFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonEmployeeTitleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
