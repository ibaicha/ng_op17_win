import { Action, createReducer, on } from '@ngrx/store';

import * as fromIdentifiants from './index';
import { Actions } from '@ngrx/effects';
import { IIdentifiantState } from './identifiant.model';

export const initialIdentifiantState: IIdentifiantState = {
  identifiants: [],
  identifiantWithFilters: [],
  isLoading: false,
};

const reducer = createReducer<IIdentifiantState>(
  initialIdentifiantState,
  on(fromIdentifiants.getIdentifiant, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(
    fromIdentifiants.getIdentifiantSuccess,
    (state, { oneIdentifiant }) => {
      return {
        ...state,
        isLoading: false,
        oneIdentifiant,
      };
    }
  ),

  on(fromIdentifiants.getIdentifiants, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(
    fromIdentifiants.getIdentifiantsSuccess,
    (state, { identifiants }) => {
      return {
        ...state,
        isLoading: false,
        identifiants,
      };
    }
  ),

  on(fromIdentifiants.getAllIdentifiantsWithFilters, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(
    fromIdentifiants.getAllIdentifiantsWithFiltersSuccess,
    (state, { identifiantWithFilters }) => {
      return {
        ...state,
        isLoading: false,
        identifiantWithFilters,
      };
    }
  ),

  on(fromIdentifiants.createIdentifiant, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(
    fromIdentifiants.createIdentifiantSuccess,
    (state, { identifiant }) => {
      return {
        ...state,
        identifiants: [...state.identifiants, identifiant],
        isLoading: false,
      };
    }
  ),
  on(fromIdentifiants.updateIdentifiant, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(
    fromIdentifiants.updateIdentifiantSuccess,
    (state, { identifiant }) => {
      return {
        ...state,
        identifiants: state.identifiants.map((b) =>
          b.id === identifiant.id ? identifiant : b
        ),
        isLoading: false,
      };
    }
  ),
  on(fromIdentifiants.deleteIdentifiant, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(
    fromIdentifiants.deleteIdentifiantSuccess,
    (state, { identifiant }) => {
      return {
        ...state,
        isLoading: false,
        identifiants: state.identifiants.filter(
          (b) => b.id !== identifiant.id
        ),
      };
    }
  )
);

export function identifiantReducer(
  state = initialIdentifiantState,
  actions: Action
): IIdentifiantState {
  return reducer(state, actions);
}
