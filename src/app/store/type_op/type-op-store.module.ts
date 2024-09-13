import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { TypeOpEffects } from './type-op.effects';
import { typeOpReducer } from './type-op.reducers';

@NgModule({
    imports: [
        StoreModule.forFeature('typeOp', typeOpReducer),
        EffectsModule.forFeature([TypeOpEffects])
    ]
})
export class TypeOpStoreModule {}