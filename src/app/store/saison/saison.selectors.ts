import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ISaisonState } from './saison.model';

export const selectSaisonState = createFeatureSelector<ISaisonState>('saison');
export const selectSaisonsList = createSelector(selectSaisonState, (state) => state.saisons);
export const selectSaisonIsLoading = createSelector(selectSaisonState, (state) => state.isLoading);


export const selectSaisonById = (itemId: number) => createSelector(selectSaisonState, (state) => state.saisons.find((item) => item.id === itemId));