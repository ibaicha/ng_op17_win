import { Action, createReducer, on } from '@ngrx/store';

import { IPersonneState } from './personne.model';
import * as fromPersonnes from './index';
import { Actions } from '@ngrx/effects';

export const initialPersonneState: IPersonneState = {
    personnes: [],
    isLoading: false
};

const reducer = createReducer<IPersonneState>(
    initialPersonneState,
    on(fromPersonnes.getPersonne, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(fromPersonnes.getPersonneSuccess, (state, { onePersonne }) => {
        return {
            ...state,
            isLoading: false,
            onePersonne
        };
    }),

    on(fromPersonnes.getPersonnes, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(fromPersonnes.getPersonnesSuccess, (state, { personnes }) => {
        return {
            ...state,
            isLoading: false,
            personnes
        };
    }),
    on(fromPersonnes.createPersonne, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromPersonnes.createPersonneSuccess, (state, { personne }) => {
        return {
            ...state,
            personnes: [...state.personnes, personne],
            isLoading: false,
        };
    }),
    on(fromPersonnes.updatePersonne, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromPersonnes.updatePersonneSuccess, (state, { personne }) => {
        return {
            ...state,
            personnes: state.personnes.map((b) => b.id === personne.id ? personne : b),
            isLoading: false,
        };
    }),
    on(fromPersonnes.deletePersonne, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromPersonnes.deletePersonneSuccess, (state, { personne }) => {
        return {
            ...state,
            isLoading: false,
            personnes: state.personnes.filter((b) => b.id !== personne.id)
        };
    })
);

export function personneReducer(state = initialPersonneState, actions: Action): IPersonneState {
    return reducer(state, actions);
}
