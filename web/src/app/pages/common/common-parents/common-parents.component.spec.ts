import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonParentsComponent } from './common-parents.component';

describe('CommonParentsComponent', () => {
  let component: CommonParentsComponent;
  let fixture: ComponentFixture<CommonParentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonParentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonParentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
