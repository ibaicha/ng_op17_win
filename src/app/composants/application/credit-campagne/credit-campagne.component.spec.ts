import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCampagneComponent } from './credit-campagne.component';

describe('CreditCampagneComponent', () => {
  let component: CreditCampagneComponent;
  let fixture: ComponentFixture<CreditCampagneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreditCampagneComponent]
    });
    fixture = TestBed.createComponent(CreditCampagneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
