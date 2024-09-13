import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MouvementIntrantComponent } from './mouvement-intrant.component';

describe('MouvementIntrantComponent', () => {
  let component: MouvementIntrantComponent;
  let fixture: ComponentFixture<MouvementIntrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MouvementIntrantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MouvementIntrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
