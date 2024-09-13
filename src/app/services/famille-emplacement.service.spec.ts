import { TestBed } from '@angular/core/testing';

import { FamilleEmplacementService } from './famille-emplacement.service';

describe('FamilleEmplacementService', () => {
  let service: FamilleEmplacementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamilleEmplacementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
