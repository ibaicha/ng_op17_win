import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { BienEffects } from './bien.effects';
import { bienReducer } from './bien.reducers';

@NgModule({
    imports: [
        StoreModule.forFeature('bien', bienReducer),
        EffectsModule.forFeature([BienEffects])
    ]
})
export class BienStoreModule {}