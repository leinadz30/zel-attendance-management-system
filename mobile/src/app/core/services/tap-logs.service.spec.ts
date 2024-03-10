import { TestBed } from '@angular/core/testing';

import { TapLogsService } from './tap-logs.service';

describe('TapLogsService', () => {
  let service: TapLogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TapLogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
