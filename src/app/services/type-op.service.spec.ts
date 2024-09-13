import { TestBed } from '@angular/core/testing';

import { TypeOpService } from './type-op.service';

describe('TypeOpService', () => {
  let service: TypeOpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeOpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
