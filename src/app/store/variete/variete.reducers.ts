import { Action, createReducer, on } from '@ngrx/store';

import { IVarieteState } from './variete.model';
import * as fromVarietes from './index';
import { Actions } from '@ngrx/effects';

export const initialVarieteState: IVarieteState = {
    varietes: [],
    isLoading: false
};

const reducer = createReducer<IVarieteState>(
    initialVarieteState,
    on(fromVarietes.getVariete, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(fromVarietes.getVarieteSuccess, (state, { oneVariete }) => {
        return {
            ...state,
            isLoading: false,
            oneVariete
        };
    }),

    on(fromVarietes.getVarietes, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(fromVarietes.getVarietesSuccess, (state, { varietes }) => {
        return {
            ...state,
            isLoading: false,
            varietes
        };
    }),
    on(fromVarietes.createVariete, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromVarietes.createVarieteSuccess, (state, { variete }) => {
        return {
            ...state,
            varietes: [...state.varietes, variete],
            isLoading: false,
        };
    }),
    on(fromVarietes.updateVariete, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromVarietes.updateVarieteSuccess, (state, { variete }) => {
        return {
            ...state,
            varietes: state.varietes.map((b) => b.id === variete.id ? variete : b),
            isLoading: false,
        };
    }),
    on(fromVarietes.deleteVariete, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromVarietes.deleteVarieteSuccess, (state, { variete }) => {
        return {
            ...state,
            isLoading: false,
            varietes: state.varietes.filter((b) => b.id !== variete.id)
        };
    })
);

export function varieteReducer(state = initialVarieteState, actions: Action): IVarieteState {
    return reducer(state, actions);
}
