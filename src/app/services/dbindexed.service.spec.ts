import { TestBed } from '@angular/core/testing';

import { DbindexedService } from './dbindexed.service';

describe('DbindexedService', () => {
  let service: DbindexedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbindexedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
