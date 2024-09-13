import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IPointAgenceState } from './point_agence.model';

export const selectPointAgenceState =
  createFeatureSelector<IPointAgenceState>(
    'pointAgence'
  );
export const selectPointAgencesList =
  createSelector(
    selectPointAgenceState,
    (state) => state.pointAgences
  );
export const selectPointAgenceIsLoading =
  createSelector(
    selectPointAgenceState,
    (state) => state.isLoading
  );

export const selectPointAgenceById = (
  itemId: number
) =>
  createSelector(
    selectPointAgenceState,
    (state) =>
      state.pointAgences.find(
        (item) => item.id === itemId
      )
  );

export const selectPointCustomListFromAgence = (id: number) =>
  createSelector(
    createFeatureSelector<IPointAgenceState>(
      'pointAgence'
    ),
    (state) => {
      if (state && state.pointAgences) {
        return state.pointAgences.filter(
          (valeur) => valeur.agence.id === id
        );
        // return state.pointAgences;
      } else {
        return [];
      }
    }
  );

export const selectPointCustomListFromAgenceFromSociete = (
  id: number
) =>
  createSelector(
    createFeatureSelector<IPointAgenceState>(
      'pointAgence'
    ),
    (state) => {
      if (state && state.pointAgences) {
        return state.pointAgences.filter(
          (valeur) =>
            valeur.agence.societe.id === id
        );
      } else {
        return [];
      }
    }
  );
