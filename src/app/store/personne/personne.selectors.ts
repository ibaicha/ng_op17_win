import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IPersonneState } from './personne.model';

export const selectPersonneState = createFeatureSelector<IPersonneState>('personne');
export const selectPersonnesList = createSelector(selectPersonneState, (state) => state.personnes);
export const selectPersonneIsLoading = createSelector(selectPersonneState, (state) => state.isLoading);


export const selectPersonneById = (itemId: number) => createSelector(selectPersonneState, (state) => state.personnes.find((item) => item.id === itemId));