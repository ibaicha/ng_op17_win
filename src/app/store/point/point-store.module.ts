import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { PointEffects } from './point.effects';
import { pointReducer } from './point.reducers';

@NgModule({
    imports: [
        StoreModule.forFeature('point', pointReducer),
        EffectsModule.forFeature([PointEffects])
    ]
})
export class PointStoreModule {}
