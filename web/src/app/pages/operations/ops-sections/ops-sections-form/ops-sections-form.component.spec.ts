import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsSectionFormComponent } from './ops-sections-form.component';

describe('OpsSectionFormComponent', () => {
  let component: OpsSectionFormComponent;
  let fixture: ComponentFixture<OpsSectionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsSectionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpsSectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
