import { TestBed, async, inject } from '@angular/core/testing';

import { OpsAuthGuard } from './ops-auth.guard';

describe('OpsAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpsAuthGuard]
    });
  });

  it('should ...', inject([OpsAuthGuard], (guard: OpsAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
