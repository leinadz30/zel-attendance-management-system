import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonEmployeesComponent } from './common-employees.component';

describe('CommonEmployeesComponent', () => {
  let component: CommonEmployeesComponent;
  let fixture: ComponentFixture<CommonEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonEmployeesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
