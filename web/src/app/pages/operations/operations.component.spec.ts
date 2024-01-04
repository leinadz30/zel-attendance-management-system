import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsComponent } from './operations.component';

describe('OpsComponent', () => {
  let component: OpsComponent;
  let fixture: ComponentFixture<OpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
