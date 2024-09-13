import { Action, createReducer, on } from '@ngrx/store';

import { IAnneeState } from './annee.model';
import * as fromAnnees from './index';
import { Actions } from '@ngrx/effects';

export const initialAnneeState: IAnneeState = {
    annees: [],
    isLoading: false
};

const reducer = createReducer<IAnneeState>(
    initialAnneeState,
    on(fromAnnees.getAnnee, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(fromAnnees.getAnneeSuccess, (state, { oneAnnee }) => {
        return {
            ...state,
            isLoading: false,
            oneAnnee
        };
    }),

    on(fromAnnees.getAnnees, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(fromAnnees.getAnneesSuccess, (state, { annees }) => {
        return {
            ...state,
            isLoading: false,
            annees
        };
    }),
    on(fromAnnees.createAnnee, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromAnnees.createAnneeSuccess, (state, { annee }) => {
        return {
            ...state,
            annees: [...state.annees, annee],
            isLoading: false,
        };
    }),
    on(fromAnnees.updateAnnee, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromAnnees.updateAnneeSuccess, (state, { annee }) => {
        return {
            ...state,
            annees: state.annees.map((b) => b.id === annee.id ? annee : b),
            isLoading: false,
        };
    }),
    on(fromAnnees.deleteAnnee, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromAnnees.deleteAnneeSuccess, (state, { annee }) => {
        return {
            ...state,
            isLoading: false,
            annees: state.annees.filter((b) => b.id !== annee.id)
        };
    })
);

export function anneeReducer(state = initialAnneeState, actions: Action): IAnneeState {
    return reducer(state, actions);
}
