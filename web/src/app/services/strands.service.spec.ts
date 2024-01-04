import { TestBed } from '@angular/core/testing';

import { StrandsService } from './strands.service';

describe('StrandsService', () => {
  let service: StrandsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StrandsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
