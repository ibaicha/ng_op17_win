import { Action, createReducer, on } from '@ngrx/store';

import { IProfessionState } from './profession.model';
import * as fromProfessions from './index';
import { Actions } from '@ngrx/effects';

export const initialProfessionState: IProfessionState = {
    professions: [],
    isLoading: false
};

const reducer = createReducer<IProfessionState>(
    initialProfessionState,
    on(fromProfessions.getProfession, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(fromProfessions.getProfessionSuccess, (state, { oneProfession }) => {
        return {
            ...state,
            isLoading: false,
            oneProfession
        };
    }),

    on(fromProfessions.getProfessions, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(fromProfessions.getProfessionsSuccess, (state, { professions }) => {
        return {
            ...state,
            isLoading: false,
            professions
        };
    }),
    on(fromProfessions.createProfession, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromProfessions.createProfessionSuccess, (state, { profession }) => {
        return {
            ...state,
            professions: [...state.professions, profession],
            isLoading: false,
        };
    }),
    on(fromProfessions.updateProfession, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromProfessions.updateProfessionSuccess, (state, { profession }) => {
        return {
            ...state,
            professions: state.professions.map((b) => b.id === profession.id ? profession : b),
            isLoading: false,
        };
    }),
    on(fromProfessions.deleteProfession, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromProfessions.deleteProfessionSuccess, (state, { profession }) => {
        return {
            ...state,
            isLoading: false,
            professions: state.professions.filter((b) => b.id !== profession.id)
        };
    })
);

export function professionReducer(state = initialProfessionState, actions: Action): IProfessionState {
    return reducer(state, actions);
}
