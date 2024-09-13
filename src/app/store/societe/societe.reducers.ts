import { Action, createReducer, on } from '@ngrx/store';

import { ISocieteState } from './societe.model';
import * as fromSocietes from './index';
import { Actions } from '@ngrx/effects';

export const initialSocieteState: ISocieteState = {
    societes: [],
    isLoading: false
};

const reducer = createReducer<ISocieteState>(
    initialSocieteState,
    on(fromSocietes.getSociete, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(fromSocietes.getSocieteSuccess, (state, { oneSociete }) => {
        return {
            ...state,
            isLoading: false,
            oneSociete
        };
    }),

    on(fromSocietes.getSocietes, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(fromSocietes.getSocietesSuccess, (state, { societes }) => {
        return {
            ...state,
            isLoading: false,
            societes
        };
    }),
    on(fromSocietes.createSociete, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromSocietes.createSocieteSuccess, (state, { societe }) => {
        return {
            ...state,
            societes: [...state.societes, societe],
            isLoading: false,
        };
    }),
    on(fromSocietes.updateSociete, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromSocietes.updateSocieteSuccess, (state, { societe }) => {
        return {
            ...state,
            societes: state.societes.map((b) => b.id === societe.id ? societe : b),
            isLoading: false,
        };
    }),
    on(fromSocietes.deleteSociete, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromSocietes.deleteSocieteSuccess, (state, { societe }) => {
        return {
            ...state,
            isLoading: false,
            societes: state.societes.filter((b) => b.id !== societe.id)
        };
    })
);

export function societeReducer(state = initialSocieteState, actions: Action): ISocieteState {
    return reducer(state, actions);
}
