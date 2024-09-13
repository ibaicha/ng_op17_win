import { Action, createReducer, on } from '@ngrx/store';

import { ITypeSocieteState } from './type-societe.model';
import * as fromTypeSocietes from './index';
import { Actions } from '@ngrx/effects';

export const initialTypeSocieteState: ITypeSocieteState = {
    typeSocietes: [],
    isLoading: false
};

const reducer = createReducer<ITypeSocieteState>(
    initialTypeSocieteState,
    on(fromTypeSocietes.getTypeSociete, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(fromTypeSocietes.getTypeSocieteSuccess, (state, { oneTypeSociete }) => {
        return {
            ...state,
            isLoading: false,
            oneTypeSociete
        };
    }),

    on(fromTypeSocietes.getTypeSocietes, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(fromTypeSocietes.getTypeSocietesSuccess, (state, { typeSocietes }) => {
        return {
            ...state,
            isLoading: false,
            typeSocietes
        };
    }),
    on(fromTypeSocietes.createTypeSociete, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromTypeSocietes.createTypeSocieteSuccess, (state, { typeSociete }) => {
        return {
            ...state,
            typeSocietes: [...state.typeSocietes, typeSociete],
            isLoading: false,
        };
    }),
    on(fromTypeSocietes.updateTypeSociete, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromTypeSocietes.updateTypeSocieteSuccess, (state, { typeSociete }) => {
        return {
            ...state,
            typeSocietes: state.typeSocietes.map((b) => b.id === typeSociete.id ? typeSociete : b),
            isLoading: false,
        };
    }),
    on(fromTypeSocietes.deleteTypeSociete, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromTypeSocietes.deleteTypeSocieteSuccess, (state, { typeSociete }) => {
        return {
            ...state,
            isLoading: false,
            typeSocietes: state.typeSocietes.filter((b) => b.id !== typeSociete.id)
        };
    })
);

export function typeSocieteReducer(state = initialTypeSocieteState, actions: Action): ITypeSocieteState {
    return reducer(state, actions);
}
