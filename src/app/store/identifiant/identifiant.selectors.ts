import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IIdentifiantState } from './identifiant.model';

export const selectIdentifiantState =
  createFeatureSelector<IIdentifiantState>('identifiant');
export const selectIdentifiantsList = createSelector(
  selectIdentifiantState,
  (state) => state.identifiants
);
export const selectIdentifiantIsLoading = createSelector(
  selectIdentifiantState,
  (state) => state.isLoading
);

export const selectIdentifiantWithFiltersList = createSelector(
  selectIdentifiantState,
  (state) => state.identifiantWithFilters
);
