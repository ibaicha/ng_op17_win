import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IPointState } from './point.model';

export const selectPointState =
  createFeatureSelector<IPointState>('point');
export const selectPointsList = createSelector(
  selectPointState,
  (state) => state.points
);
export const selectPointIsLoading = createSelector(
  selectPointState,
  (state) => state.isLoading
);

export const selectPointById = (itemId: number) =>
  createSelector(selectPointState, (state) =>
    state.points.find((item) => item.id === itemId)
  );
