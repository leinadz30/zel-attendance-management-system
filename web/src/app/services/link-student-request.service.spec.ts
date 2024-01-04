import { TestBed } from '@angular/core/testing';

import { LinkStudentRequestService } from './link-student-request.service';

describe('LinkStudentRequestService', () => {
  let service: LinkStudentRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkStudentRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
