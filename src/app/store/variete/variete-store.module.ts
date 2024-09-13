import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { VarieteEffects } from './variete.effects';
import { varieteReducer } from './variete.reducers';

@NgModule({
    imports: [
        StoreModule.forFeature('variete', varieteReducer),
        EffectsModule.forFeature([VarieteEffects])
    ]
})
export class VarieteStoreModule {}