import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { PersonneEffects } from './personne.effects';
import { personneReducer } from './personne.reducers';

@NgModule({
    imports: [
        StoreModule.forFeature('personne', personneReducer),
        EffectsModule.forFeature([PersonneEffects])
    ]
})
export class PersonneStoreModule {}