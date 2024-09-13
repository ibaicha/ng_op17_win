import { Action, createReducer, on } from '@ngrx/store';

import { IPointAgenceState } from './point_agence.model';
import * as fromPointAgences from './index';
import { Actions } from '@ngrx/effects';

export const initialPointAgenceState: IPointAgenceState =
  {
    pointAgences: [],
    isLoading: false,
  };

const reducer = createReducer<IPointAgenceState>(
  initialPointAgenceState,
  on(
    fromPointAgences.getPointAgence,
    (state) => {
      return {
        ...state,
        isLoading: true,
      };
    }
  ),
  on(
    fromPointAgences.getPointAgenceSuccess,
    (state, { onePointAgence }) => {
      return {
        ...state,
        isLoading: false,
        onePointAgence,
      };
    }
  ),

  on(
    fromPointAgences.getPointAgences,
    (state) => {
      return {
        ...state,
        isLoading: true,
      };
    }
  ),
  on(
    fromPointAgences.getPointAgencesSuccess,
    (state, { pointAgences }) => {
      return {
        ...state,
        isLoading: false,
        pointAgences,
      };
    }
  ),
  on(
    fromPointAgences.createPointAgence,
    (state) => {
      return {
        ...state,
        isLoading: true,
      };
    }
  ),
  on(
    fromPointAgences.createPointAgenceSuccess,
    (state, { pointAgence }) => {
      return {
        ...state,
        pointAgences: [
          ...state.pointAgences,
          pointAgence,
        ],
        isLoading: false,
      };
    }
  ),
  on(
    fromPointAgences.updatePointAgence,
    (state) => {
      return {
        ...state,
        isLoading: true,
      };
    }
  ),
  on(
    fromPointAgences.updatePointAgenceSuccess,
    (state, { pointAgence }) => {
      return {
        ...state,
        pointAgences:
          state.pointAgences.map((b) =>
            b.id === pointAgence.id
              ? pointAgence
              : b
          ),
        isLoading: false,
      };
    }
  ),
  on(
    fromPointAgences.deletePointAgence,
    (state) => {
      return {
        ...state,
        isLoading: true,
      };
    }
  ),
  on(
    fromPointAgences.deletePointAgenceSuccess,
    (state, { pointAgence }) => {
      return {
        ...state,
        isLoading: false,
        pointAgences:
          state.pointAgences.filter(
            (b) => b.id !== pointAgence.id
          ),
      };
    }
  )
);

export function pointAgenceReducer(
  state = initialPointAgenceState,
  actions: Action
): IPointAgenceState {
  return reducer(state, actions);
}
