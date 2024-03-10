import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonStudentsComponent } from './common-students.component';

describe('CommonStudentsComponent', () => {
  let component: CommonStudentsComponent;
  let fixture: ComponentFixture<CommonStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonStudentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
