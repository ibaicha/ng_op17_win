import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { FiliereEffects } from './filiere.effects';
import { filiereReducer } from './filiere.reducers';

@NgModule({
    imports: [
        StoreModule.forFeature('filiere', filiereReducer),
        EffectsModule.forFeature([FiliereEffects])
    ]
})
export class FiliereStoreModule {}