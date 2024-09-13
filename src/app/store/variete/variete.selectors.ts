import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IVarieteState } from './variete.model';

export const selectVarieteState = createFeatureSelector<IVarieteState>('variete');
export const selectVarietesList = createSelector(selectVarieteState, (state) => state.varietes);
export const selectVarieteIsLoading = createSelector(selectVarieteState, (state) => state.isLoading);


export const selectVarieteById = (itemId: number) => createSelector(selectVarieteState, (state) => state.varietes.find((item) => item.id === itemId));