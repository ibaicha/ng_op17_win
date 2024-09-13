import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { TypeClientEffects } from './type-client.effects';
import { typeClientReducer } from './type-client.reducers';

@NgModule({
    imports: [
        StoreModule.forFeature('typeClient', typeClientReducer),
        EffectsModule.forFeature([TypeClientEffects])
    ]
})
export class typeClientStoreModule {}