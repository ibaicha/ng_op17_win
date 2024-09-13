import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointMouvementIntrantComponent } from './point-mouvement-intrant.component';

describe('PointMouvementIntrantComponent', () => {
  let component: PointMouvementIntrantComponent;
  let fixture: ComponentFixture<PointMouvementIntrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PointMouvementIntrantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PointMouvementIntrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
