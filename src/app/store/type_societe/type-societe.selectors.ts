import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ITypeSocieteState } from './type-societe.model';

export const selectTypeSocieteState = createFeatureSelector<ITypeSocieteState>('typeSociete');
export const selectTypeSocietesList = createSelector(selectTypeSocieteState, (state) => state.typeSocietes);
export const selectTypeSocieteIsLoading = createSelector(selectTypeSocieteState, (state) => state.isLoading);


export const selectTypeSocieteById = (itemId: number) => createSelector(selectTypeSocieteState, (state) => state.typeSocietes.find((item) => item.id === itemId));