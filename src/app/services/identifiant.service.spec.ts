import { TestBed } from '@angular/core/testing';

import { IdentifiantService } from './identifiant.service';

describe('IdentifiantService', () => {
  let service: IdentifiantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdentifiantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
