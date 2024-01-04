import { TestBed } from '@angular/core/testing';

import { EmployeeTitlesService } from './employee-titles.service';

describe('EmployeeTitlesService', () => {
  let service: EmployeeTitlesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeTitlesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
