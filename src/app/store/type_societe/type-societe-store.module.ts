import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { TypeSocieteEffects } from './type-societe.effects';
import { typeSocieteReducer } from './type-societe.reducers';

@NgModule({
    imports: [
        StoreModule.forFeature('typeSociete', typeSocieteReducer),
        EffectsModule.forFeature([TypeSocieteEffects])
    ]
})
export class TypeSocieteStoreModule {}