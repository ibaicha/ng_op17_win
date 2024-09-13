import { Action, createReducer, on } from '@ngrx/store';

import { IFiliereState } from './filiere.model';
import * as fromFilieres from './index';
import { Actions } from '@ngrx/effects';

export const initialFiliereState: IFiliereState = {
    filieres: [],
    isLoading: false
};

const reducer = createReducer<IFiliereState>(
    initialFiliereState,
    on(fromFilieres.getFiliere, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(fromFilieres.getFiliereSuccess, (state, { oneFiliere }) => {
        return {
            ...state,
            isLoading: false,
            oneFiliere
        };
    }),

    on(fromFilieres.getFilieres, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(fromFilieres.getFilieresSuccess, (state, { filieres }) => {
        return {
            ...state,
            isLoading: false,
            filieres
        };
    }),
    on(fromFilieres.createFiliere, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromFilieres.createFiliereSuccess, (state, { filiere }) => {
        return {
            ...state,
            filieres: [...state.filieres, filiere],
            isLoading: false,
        };
    }),
    on(fromFilieres.updateFiliere, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromFilieres.updateFiliereSuccess, (state, { filiere }) => {
        return {
            ...state,
            filieres: state.filieres.map((b) => b.id === filiere.id ? filiere : b),
            isLoading: false,
        };
    }),
    on(fromFilieres.deleteFiliere, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromFilieres.deleteFiliereSuccess, (state, { filiere }) => {
        return {
            ...state,
            isLoading: false,
            filieres: state.filieres.filter((b) => b.id !== filiere.id)
        };
    })
);

export function filiereReducer(state = initialFiliereState, actions: Action): IFiliereState {
    return reducer(state, actions);
}
