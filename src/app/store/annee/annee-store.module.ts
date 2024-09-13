import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AnneeEffects } from './annee.effects';
import { anneeReducer } from './annee.reducers';

@NgModule({
    imports: [
        StoreModule.forFeature('annee', anneeReducer),
        EffectsModule.forFeature([AnneeEffects])
    ]
})
export class AnneeStoreModule {}