import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { RemboursementEffects } from './remboursement.effects';
import { remboursementReducer } from './remboursement.reducers';

@NgModule({
    imports: [
        StoreModule.forFeature('remboursement', remboursementReducer),
        EffectsModule.forFeature([RemboursementEffects])
    ]
})
export class RemboursementStoreModule {}