import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsUsersComponent } from './ops-users.component';

describe('OpsUsersComponent', () => {
  let component: OpsUsersComponent;
  let fixture: ComponentFixture<OpsUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpsUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
