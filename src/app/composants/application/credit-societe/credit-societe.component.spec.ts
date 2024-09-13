import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditSocieteComponent } from './credit-societe.component';

describe('CreditSocieteComponent', () => {
  let component: CreditSocieteComponent;
  let fixture: ComponentFixture<CreditSocieteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditSocieteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
