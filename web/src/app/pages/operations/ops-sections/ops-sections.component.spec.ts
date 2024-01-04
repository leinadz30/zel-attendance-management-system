import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsSectionsComponent } from './ops-sections.component';

describe('OpsSectionsComponent', () => {
  let component: OpsSectionsComponent;
  let fixture: ComponentFixture<OpsSectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsSectionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpsSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
