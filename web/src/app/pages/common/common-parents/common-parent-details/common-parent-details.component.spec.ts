import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonParentDetailsComponent } from './common-parent-details.component';

describe('CommonParentDetailsComponent', () => {
  let component: CommonParentDetailsComponent;
  let fixture: ComponentFixture<CommonParentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonParentDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonParentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
