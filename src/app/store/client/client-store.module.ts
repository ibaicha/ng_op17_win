import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ClientEffects } from './client.effects';
import { clientReducer } from './client.reducers';

@NgModule({
    imports: [
        StoreModule.forFeature('client', clientReducer),
        EffectsModule.forFeature([ClientEffects])
    ]
})
export class ClientStoreModule {}