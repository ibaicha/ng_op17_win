import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IOpState } from './op.model';

export const selectOpState = createFeatureSelector<IOpState>('op');
export const selectOpsList = createSelector(
  selectOpState,
  (state) => state.ops
);

export const selectOpWithFiltersList = createSelector(
  selectOpState,
  (state) => state.opWithFilters
);

export const selectOpIsLoading = createSelector(
  selectOpState,
  (state) => state.isLoading
);
export const selecCustomCreditSocieteVarieteAnneeSaisonList = createSelector(
  selectOpState,
  (state) => state.opsCustomFromAgences
);

export const selectOpById = (itemId: number) =>
  createSelector(selectOpState, (state) =>
    state.ops.find((item) => item.id === itemId)
  );
