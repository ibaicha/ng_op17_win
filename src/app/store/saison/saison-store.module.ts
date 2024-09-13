import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SaisonEffects } from './saison.effects';
import { saisonReducer } from './saison.reducers';

@NgModule({
    imports: [
        StoreModule.forFeature('saison', saisonReducer),
        EffectsModule.forFeature([SaisonEffects])
    ]
})
export class SaisonStoreModule {}