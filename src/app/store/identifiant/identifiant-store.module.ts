import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { IdentifiantEffects } from './identifiant.effects';
import { identifiantReducer } from './identifiant.reducers';



@NgModule({
    imports: [
        StoreModule.forFeature('identifiant', identifiantReducer),
        EffectsModule.forFeature([IdentifiantEffects])
    ]
})
export class IdentifiantStoreModule {}
