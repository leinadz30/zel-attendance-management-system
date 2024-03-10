import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonSectionsComponent } from './common-sections.component';

describe('CommonSectionsComponent', () => {
  let component: CommonSectionsComponent;
  let fixture: ComponentFixture<CommonSectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonSectionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
