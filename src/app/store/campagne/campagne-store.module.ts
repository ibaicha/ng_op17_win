import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CampagneEffects } from './campagne.effects';
import { campagneReducer } from './campagne.reducers';

@NgModule({
    imports: [
        StoreModule.forFeature('campagne', campagneReducer),
        EffectsModule.forFeature([CampagneEffects])
    ]
})
export class CampagneStoreModule {}