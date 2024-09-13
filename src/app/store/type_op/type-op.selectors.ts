import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ITypeOpState } from './type-op.model';

export const selectTypeOpState = createFeatureSelector<ITypeOpState>('typeOp');
export const selectTypeOpsList = createSelector(selectTypeOpState, (state) => state.typeOps);
export const selectTypeOpIsLoading = createSelector(selectTypeOpState, (state) => state.isLoading);


export const selectTypeOpById = (itemId: number) => createSelector(selectTypeOpState, (state) => state.typeOps.find((item) => item.id === itemId));