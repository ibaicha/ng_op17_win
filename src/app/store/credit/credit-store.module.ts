import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CreditEffects } from './credit.effects';
import { creditReducer } from './credit.reducers';

@NgModule({
    imports: [
        StoreModule.forFeature('credit', creditReducer),
        EffectsModule.forFeature([CreditEffects])
    ]
})
export class CreditStoreModule {}