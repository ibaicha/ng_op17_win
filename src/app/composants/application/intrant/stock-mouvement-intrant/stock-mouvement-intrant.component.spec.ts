import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockMouvementIntrantComponent } from './stock-mouvement-intrant.component';

describe('StockMouvementIntrantComponent', () => {
  let component: StockMouvementIntrantComponent;
  let fixture: ComponentFixture<StockMouvementIntrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockMouvementIntrantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockMouvementIntrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
