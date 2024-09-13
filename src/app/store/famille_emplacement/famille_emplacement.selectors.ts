import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IFamilleEmplacementState } from './famille_emplacement.model';

export const selectFamilleEmplacementState = createFeatureSelector<IFamilleEmplacementState>('familleEmplacement');
export const selectFamilleEmplacementsList = createSelector(selectFamilleEmplacementState, (state) => state.familleEmplacements);
export const selectFamilleEmplacementIsLoading = createSelector(selectFamilleEmplacementState, (state) => state.isLoading);


export const selectFamilleEmplacementById = (itemId: number) => createSelector(selectFamilleEmplacementState, (state) => state.familleEmplacements.find((item) => item.id === itemId));