import { Action, createReducer, on } from '@ngrx/store';

import { ICampagneState } from './campagne.model';
import * as fromCampagnes from './index';
import { Actions } from '@ngrx/effects';

export const initialCampagneState: ICampagneState = {
    campagnes: [],
    isLoading: false
};

const reducer = createReducer<ICampagneState>(
    initialCampagneState,
    on(fromCampagnes.getCampagne, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(fromCampagnes.getCampagneSuccess, (state, { oneCampagne }) => {
        return {
            ...state,
            isLoading: false,
            oneCampagne
        };
    }),

    on(fromCampagnes.getCampagnes, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(fromCampagnes.getCampagnesSuccess, (state, { campagnes }) => {
        return {
            ...state,
            isLoading: false,
            campagnes
        };
    }),
    on(fromCampagnes.createCampagne, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromCampagnes.createCampagneSuccess, (state, { campagne }) => {
        return {
            ...state,
            campagnes: [...state.campagnes, campagne],
            isLoading: false,
        };
    }),
    on(fromCampagnes.updateCampagne, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromCampagnes.updateCampagneSuccess, (state, { campagne }) => {
        return {
            ...state,
            campagnes: state.campagnes.map((b) => b.id === campagne.id ? campagne : b),
            isLoading: false,
        };
    }),
    on(fromCampagnes.deleteCampagne, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromCampagnes.deleteCampagneSuccess, (state, { campagne }) => {
        return {
            ...state,
            isLoading: false,
            campagnes: state.campagnes.filter((b) => b.id !== campagne.id)
        };
    })
);

export function campagneReducer(state = initialCampagneState, actions: Action): ICampagneState {
    return reducer(state, actions);
}
