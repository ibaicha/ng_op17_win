import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CreditCustomEffects } from './creditCustom.effects';
import { creditCustomReducer } from './creditCustom.reducers';

@NgModule({
    imports: [
        StoreModule.forFeature('creditCustom', creditCustomReducer),
        EffectsModule.forFeature([CreditCustomEffects])
    ]
})
export class CreditCustomStoreModule {}