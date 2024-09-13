import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ProduitEffects } from './produit.effects';
import { produitReducer } from './produit.reducers';

@NgModule({
    imports: [
        StoreModule.forFeature('produit', produitReducer),
        EffectsModule.forFeature([ProduitEffects])
    ]
})
export class ProduitStoreModule {}