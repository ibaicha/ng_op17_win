import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ProfessionEffects } from './profession.effects';
import { professionReducer } from './profession.reducers';

@NgModule({
    imports: [
        StoreModule.forFeature('profession', professionReducer),
        EffectsModule.forFeature([ProfessionEffects])
    ]
})
export class ProfessionStoreModule {}