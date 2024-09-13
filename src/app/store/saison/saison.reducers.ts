import { Action, createReducer, on } from '@ngrx/store';

import { ISaisonState } from './saison.model';
import * as fromSaisons from './index';
import { Actions } from '@ngrx/effects';

export const initialSaisonState: ISaisonState = {
    saisons: [],
    isLoading: false
};

const reducer = createReducer<ISaisonState>(
    initialSaisonState,
    on(fromSaisons.getSaison, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(fromSaisons.getSaisonSuccess, (state, { oneSaison }) => {
        return {
            ...state,
            isLoading: false,
            oneSaison
        };
    }),

    on(fromSaisons.getSaisons, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(fromSaisons.getSaisonsSuccess, (state, { saisons }) => {
        return {
            ...state,
            isLoading: false,
            saisons
        };
    }),
    on(fromSaisons.createSaison, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromSaisons.createSaisonSuccess, (state, { saison }) => {
        return {
            ...state,
            saisons: [...state.saisons, saison],
            isLoading: false,
        };
    }),
    on(fromSaisons.updateSaison, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromSaisons.updateSaisonSuccess, (state, { saison }) => {
        return {
            ...state,
            saisons: state.saisons.map((b) => b.id === saison.id ? saison : b),
            isLoading: false,
        };
    }),
    on(fromSaisons.deleteSaison, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromSaisons.deleteSaisonSuccess, (state, { saison }) => {
        return {
            ...state,
            isLoading: false,
            saisons: state.saisons.filter((b) => b.id !== saison.id)
        };
    })
);

export function saisonReducer(state = initialSaisonState, actions: Action): ISaisonState {
    return reducer(state, actions);
}
