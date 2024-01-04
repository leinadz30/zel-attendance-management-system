import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsDepartmentsComponent } from './ops-departments.component';

describe('OpsDepartmentsComponent', () => {
  let component: OpsDepartmentsComponent;
  let fixture: ComponentFixture<OpsDepartmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsDepartmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpsDepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
