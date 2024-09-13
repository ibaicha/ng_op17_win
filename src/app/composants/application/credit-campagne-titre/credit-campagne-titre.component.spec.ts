import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCampagneTitreComponent } from './credit-campagne-titre.component';

describe('CreditCampagneTitreComponent', () => {
  let component: CreditCampagneTitreComponent;
  let fixture: ComponentFixture<CreditCampagneTitreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditCampagneTitreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditCampagneTitreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
