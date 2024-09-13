import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IMouvementIntrantState } from './mouvement_intrant.model';

export const selectMouvementIntrantState =
  createFeatureSelector<IMouvementIntrantState>('mouvementIntrant');
export const selectMouvementIntrantsList = createSelector(
  selectMouvementIntrantState,
  (state) => state.mouvementIntrants
);
export const selectMouvementIntrantIsLoading = createSelector(
  selectMouvementIntrantState,
  (state) => state.isLoading
);

export const selectMouvementIntrantWithFiltersList = createSelector(
  selectMouvementIntrantState,
  (state) => state.mouvementIntrantWithFilters
);

export const selectMouvementIntrantById = (itemId: number) =>
  createSelector(selectMouvementIntrantState, (state) =>
    state.mouvementIntrants.find((item) => item.id === itemId)
  );
