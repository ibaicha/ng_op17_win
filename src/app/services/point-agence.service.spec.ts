import { TestBed } from '@angular/core/testing';

import { PointAgenceService } from './point-agence.service';

describe('PointAgenceService', () => {
  let service: PointAgenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PointAgenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
