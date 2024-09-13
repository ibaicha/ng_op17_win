import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { pointAgenceReducer } from './point_agence.reducers';
import { PointAgenceEffects } from './point_agence.effects';



@NgModule({
    imports: [
        StoreModule.forFeature('pointAgence', pointAgenceReducer),
        EffectsModule.forFeature([PointAgenceEffects])
    ]
})
export class PointAgenceStoreModule {}
