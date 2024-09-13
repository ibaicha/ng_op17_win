import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MouvementStockageEffects } from './mouvement_stockage.effects';
import { mouvementStockageReducer } from './mouvement_stockage.reducers';

 

@NgModule({
    imports: [
        StoreModule.forFeature('mouvementStockage', mouvementStockageReducer),
        EffectsModule.forFeature([MouvementStockageEffects])
    ]
})
export class MouvementStockageStoreModule {}