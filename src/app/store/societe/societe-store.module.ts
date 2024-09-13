import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SocieteEffects } from './societe.effects';
import { societeReducer } from './societe.reducers';

@NgModule({
    imports: [
        StoreModule.forFeature('societe', societeReducer),
        EffectsModule.forFeature([SocieteEffects])
    ]
})
export class SocieteStoreModule {}