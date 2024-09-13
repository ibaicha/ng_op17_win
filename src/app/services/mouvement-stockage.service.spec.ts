import { TestBed } from '@angular/core/testing';
import { MouvementStockageService } from './mouvement-stockage.service';

 

describe('MouvementStockageService', () => {
  let service: MouvementStockageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MouvementStockageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
