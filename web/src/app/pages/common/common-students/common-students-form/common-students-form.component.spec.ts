import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonStudentFormComponent } from './common-students-form.component';

describe('CommonStudentFormComponent', () => {
  let component: CommonStudentFormComponent;
  let fixture: ComponentFixture<CommonStudentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonStudentFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonStudentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
