import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonEmployeeFormComponent } from './common-employees-form.component';

describe('CommonEmployeeFormComponent', () => {
  let component: CommonEmployeeFormComponent;
  let fixture: ComponentFixture<CommonEmployeeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonEmployeeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonEmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
