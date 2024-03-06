import { TestBed } from '@angular/core/testing';

import { EmployeeUserAccessService } from './employee-user-access.service';

describe('EmployeeUserAccessService', () => {
  let service: EmployeeUserAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeUserAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
