import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IProfessionState } from './profession.model';

export const selectProfessionState = createFeatureSelector<IProfessionState>('profession');
export const selectProfessionsList = createSelector(selectProfessionState, (state) => state.professions);
export const selectProfessionIsLoading = createSelector(selectProfessionState, (state) => state.isLoading);


export const selectProfessionById = (itemId: number) => createSelector(selectProfessionState, (state) => state.professions.find((item) => item.id === itemId));