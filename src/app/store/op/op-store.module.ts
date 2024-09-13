import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { OpEffects } from './op.effects';
import { opReducer } from './op.reducers';

@NgModule({
    imports: [
        StoreModule.forFeature('op', opReducer),
        EffectsModule.forFeature([OpEffects])
    ]
})
export class OpStoreModule {}