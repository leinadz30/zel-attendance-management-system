import { TestBed } from '@angular/core/testing';

import { SchoolYearLevelsService } from './school-year-levels.service';

describe('SchoolYearLevelsService', () => {
  let service: SchoolYearLevelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolYearLevelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
