import { Action, createReducer, on } from '@ngrx/store';

import { IRemboursementState } from './remboursement.model';
import * as fromRemboursements from './index';
import { Actions } from '@ngrx/effects';

export const initialRemboursementState: IRemboursementState = {
    remboursements: [],
    isLoading: false
};

const reducer = createReducer<IRemboursementState>(
    initialRemboursementState,
    on(fromRemboursements.getRemboursement, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(fromRemboursements.getRemboursementSuccess, (state, { oneRemboursement }) => {
        return {
            ...state,
            isLoading: false,
            oneRemboursement
        };
    }),

    on(fromRemboursements.getRemboursements, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(fromRemboursements.getRemboursementsSuccess, (state, { remboursements }) => {
        return {
            ...state,
            isLoading: false,
            remboursements
        };
    }),
    on(fromRemboursements.createRemboursement, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromRemboursements.createRemboursementSuccess, (state, { remboursement }) => {
        return {
            ...state,
            remboursements: [...state.remboursements, remboursement],
            isLoading: false,
        };
    }),
    on(fromRemboursements.updateRemboursement, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromRemboursements.updateRemboursementSuccess, (state, { remboursement }) => {
        return {
            ...state,
            remboursements: state.remboursements.map((b) => b.id === remboursement.id ? remboursement : b),
            isLoading: false,
        };
    }),
    on(fromRemboursements.deleteRemboursement, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromRemboursements.deleteRemboursementSuccess, (state, { remboursement }) => {
        return {
            ...state,
            isLoading: false,
            remboursements: state.remboursements.filter((b) => b.id !== remboursement.id)
        };
    })
);

export function remboursementReducer(state = initialRemboursementState, actions: Action): IRemboursementState {
    return reducer(state, actions);
}
