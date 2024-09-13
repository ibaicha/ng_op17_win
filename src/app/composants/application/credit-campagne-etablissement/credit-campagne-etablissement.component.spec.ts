import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCampagneEtablissementComponent } from './credit-campagne-etablissement.component';

describe('CreditCampagneEtablissementComponent', () => {
  let component: CreditCampagneEtablissementComponent;
  let fixture: ComponentFixture<CreditCampagneEtablissementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditCampagneEtablissementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditCampagneEtablissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
