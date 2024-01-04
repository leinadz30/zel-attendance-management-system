import { TestBed, async, inject } from '@angular/core/testing';

import { OrgAuthGuard } from './org-auth.guard';

describe('OrgAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrgAuthGuard]
    });
  });

  it('should ...', inject([OrgAuthGuard], (guard: OrgAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
