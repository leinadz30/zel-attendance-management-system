import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonEmployeeTitleComponent } from './common-employee-titles.component';

describe('CommonEmployeeTitleComponent', () => {
  let component: CommonEmployeeTitleComponent;
  let fixture: ComponentFixture<CommonEmployeeTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonEmployeeTitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonEmployeeTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
