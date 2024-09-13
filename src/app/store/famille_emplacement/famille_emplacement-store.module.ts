import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { FamilleEmplacementEffects } from './famille_emplacement.effects';
import { familleEmplacementReducer } from './famille_emplacement.reducers';

@NgModule({
    imports: [
        StoreModule.forFeature('familleEmplacement', familleEmplacementReducer),
        EffectsModule.forFeature([FamilleEmplacementEffects])
    ]
})
export class FamilleEmplacementStoreModule {}