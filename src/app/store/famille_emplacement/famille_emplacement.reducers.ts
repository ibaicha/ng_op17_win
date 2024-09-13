import { Action, createReducer, on } from '@ngrx/store';

import { IFamilleEmplacementState } from './famille_emplacement.model';
import * as fromFamilleEmplacements from './index';
import { Actions } from '@ngrx/effects';

export const initialFamilleEmplacementState: IFamilleEmplacementState = {
    familleEmplacements: [],
    isLoading: false
};

const reducer = createReducer<IFamilleEmplacementState>(
    initialFamilleEmplacementState,
    on(fromFamilleEmplacements.getFamilleEmplacement, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(fromFamilleEmplacements.getFamilleEmplacementSuccess, (state, { oneFamilleEmplacement }) => {
        return {
            ...state,
            isLoading: false,
            oneFamilleEmplacement
        };
    }),

    on(fromFamilleEmplacements.getFamilleEmplacements, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(fromFamilleEmplacements.getFamilleEmplacementsSuccess, (state, { familleEmplacements }) => {
        return {
            ...state,
            isLoading: false,
            familleEmplacements
        };
    }),
    on(fromFamilleEmplacements.createFamilleEmplacement, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromFamilleEmplacements.createFamilleEmplacementSuccess, (state, { familleEmplacement }) => {
        return {
            ...state,
            familleEmplacements: [...state.familleEmplacements, familleEmplacement],
            isLoading: false,
        };
    }),
    on(fromFamilleEmplacements.updateFamilleEmplacement, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromFamilleEmplacements.updateFamilleEmplacementSuccess, (state, { familleEmplacement }) => {
        return {
            ...state,
            familleEmplacements: state.familleEmplacements.map((b) => b.id === familleEmplacement.id ? familleEmplacement : b),
            isLoading: false,
        };
    }),
    on(fromFamilleEmplacements.deleteFamilleEmplacement, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromFamilleEmplacements.deleteFamilleEmplacementSuccess, (state, { familleEmplacement }) => {
        return {
            ...state,
            isLoading: false,
            familleEmplacements: state.familleEmplacements.filter((b) => b.id !== familleEmplacement.id)
        };
    })
);

export function familleEmplacementReducer(state = initialFamilleEmplacementState, actions: Action): IFamilleEmplacementState {
    return reducer(state, actions);
}
