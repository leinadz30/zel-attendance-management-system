import { CommonEmployeeUserDetailsComponent } from './common-employee-user-details.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('CommonEmployeeUserDetailsComponent', () => {
  let component: CommonEmployeeUserDetailsComponent;
  let fixture: ComponentFixture<CommonEmployeeUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonEmployeeUserDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonEmployeeUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
