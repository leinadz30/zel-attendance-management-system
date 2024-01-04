import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsDepartmentFormComponent } from './ops-departments-form.component';

describe('OpsDepartmentFormComponent', () => {
  let component: OpsDepartmentFormComponent;
  let fixture: ComponentFixture<OpsDepartmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsDepartmentFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpsDepartmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
