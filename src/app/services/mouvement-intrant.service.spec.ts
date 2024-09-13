import { TestBed } from '@angular/core/testing';

import { MouvementIntrantService } from './mouvement-intrant.service';

describe('MouvementIntrantService', () => {
  let service: MouvementIntrantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MouvementIntrantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
