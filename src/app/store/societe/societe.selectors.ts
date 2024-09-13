import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ISocieteState } from './societe.model';

export const selectSocieteState = createFeatureSelector<ISocieteState>('societe');
export const selectSocietesList = createSelector(selectSocieteState, (state) => state.societes);
export const selectSocieteIsLoading = createSelector(selectSocieteState, (state) => state.isLoading);


export const selectSocieteById = (itemId: number) => createSelector(selectSocieteState, (state) => state.societes.find((item) => item.id === itemId));