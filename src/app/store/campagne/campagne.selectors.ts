import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ICampagneState } from './campagne.model';

export const selectCampagneState = createFeatureSelector<ICampagneState>('campagne');
export const selectCampagnesList = createSelector(selectCampagneState, (state) => state.campagnes);
export const selectCampagneIsLoading = createSelector(selectCampagneState, (state) => state.isLoading);


export const selectCampagneById = (itemId: number) => createSelector(selectCampagneState, (state) => state.campagnes.find((item) => item.id === itemId));