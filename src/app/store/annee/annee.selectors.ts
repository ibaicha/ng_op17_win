import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IAnneeState } from './annee.model';

export const selectAnneeState = createFeatureSelector<IAnneeState>('annee');
export const selectAnneesList = createSelector(selectAnneeState, (state) => state.annees);
export const selectAnneeIsLoading = createSelector(selectAnneeState, (state) => state.isLoading);


export const selectAnneeById = (itemId: number) => createSelector(selectAnneeState, (state) => state.annees.find((item) => item.id === itemId));