import { Action, createReducer, on } from '@ngrx/store';

import { IBienState } from './bien.model';
import * as fromBiens from './index';
import { Actions } from '@ngrx/effects';

export const initialBienState: IBienState = {
    biens: [],
    isLoading: false
};

const reducer = createReducer<IBienState>(
    initialBienState,
    on(fromBiens.getBien, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(fromBiens.getBienSuccess, (state, { oneBien }) => {
        return {
            ...state,
            isLoading: false,
            oneBien
        };
    }),

    on(fromBiens.getBiens, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(fromBiens.getBiensSuccess, (state, { biens }) => {
        return {
            ...state,
            isLoading: false,
            biens
        };
    }),
    on(fromBiens.createBien, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromBiens.createBienSuccess, (state, { bien }) => {
        return {
            ...state,
            biens: [...state.biens, bien],
            isLoading: false,
        };
    }),
    on(fromBiens.updateBien, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromBiens.updateBienSuccess, (state, { bien }) => {
        return {
            ...state,
            biens: state.biens.map((b) => b.id === bien.id ? bien : b),
            isLoading: false,
        };
    }),
    on(fromBiens.deleteBien, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromBiens.deleteBienSuccess, (state, { bien }) => {
        return {
            ...state,
            isLoading: false,
            biens: state.biens.filter((b) => b.id !== bien.id)
        };
    })
);

export function bienReducer(state = initialBienState, actions: Action): IBienState {
    return reducer(state, actions);
}
