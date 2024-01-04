import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgComponent } from './organization.component';

describe('OrgComponent', () => {
  let component: OrgComponent;
  let fixture: ComponentFixture<OrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
