import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MouvementIntrantEffects } from './mouvement_intrant.effects';
import { mouvementIntrantReducer } from './mouvement_intrant.reducers';



@NgModule({
    imports: [
        StoreModule.forFeature('mouvementIntrant', mouvementIntrantReducer),
        EffectsModule.forFeature([MouvementIntrantEffects])
    ]
})
export class MouvementIntrantStoreModule {}
