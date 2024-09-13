import { Action, createReducer, on } from '@ngrx/store';

import { ITypeClientState } from './type-client.model';
import * as fromTypeClients from './index';
import { Actions } from '@ngrx/effects';

export const initialTypeClientState: ITypeClientState = {
    typeClients: [],
    isLoading: false
};

const reducer = createReducer<ITypeClientState>(
    initialTypeClientState,
    on(fromTypeClients.getTypeClient, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(fromTypeClients.getTypeClientSuccess, (state, { oneTypeClient }) => {
        return {
            ...state,
            isLoading: false,
            oneTypeClient
        };
    }),

    on(fromTypeClients.getTypeClients, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(fromTypeClients.getTypeClientsSuccess, (state, { typeClients }) => {
        return {
            ...state,
            isLoading: false,
            typeClients
        };
    }),
    on(fromTypeClients.createTypeClient, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromTypeClients.createTypeClientSuccess, (state, { typeClient }) => {
        return {
            ...state,
            typeClients: [...state.typeClients, typeClient],
            isLoading: false,
        };
    }),
    on(fromTypeClients.updateTypeClient, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromTypeClients.updateTypeClientSuccess, (state, { typeClient }) => {
        return {
            ...state,
            typeClients: state.typeClients.map((b) => b.id === typeClient.id ? typeClient : b),
            isLoading: false,
        };
    }),
    on(fromTypeClients.deleteTypeClient, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromTypeClients.deleteTypeClientSuccess, (state, { typeClient }) => {
        return {
            ...state,
            isLoading: false,
            typeClients: state.typeClients.filter((b) => b.id !== typeClient.id)
        };
    })
);

export function typeClientReducer(state = initialTypeClientState, actions: Action): ITypeClientState {
    return reducer(state, actions);
}
