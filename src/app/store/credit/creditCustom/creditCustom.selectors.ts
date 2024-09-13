import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ICreditCustomState } from './creditCustom.model';

export const selectCreditCustomState = createFeatureSelector<ICreditCustomState>('creditCustom');
export const selectCreditCustomsList = createSelector(selectCreditCustomState, (state) => state.creditCustoms);
export const selectCreditCustomIsLoading = createSelector(selectCreditCustomState, (state) => state.isLoading);


export const selectCreditCustomById = (itemId: number) => createSelector(selectCreditCustomState, (state) => state.creditCustoms.find((item) => item.id === itemId));