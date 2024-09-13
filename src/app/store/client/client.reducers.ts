import { Action, createReducer, on } from '@ngrx/store';

import { IClientState } from './client.model';
import * as fromClients from './index';
import { Actions } from '@ngrx/effects';

export const initialClientState: IClientState = {
    clients: [],
    isLoading: false
};

const reducer = createReducer<IClientState>(
    initialClientState,
    on(fromClients.getClient, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(fromClients.getClientSuccess, (state, { oneClient }) => {
        return {
            ...state,
            isLoading: false,
            oneClient
        };
    }),

    on(fromClients.getClients, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(fromClients.getClientsSuccess, (state, { clients }) => {
        return {
            ...state,
            isLoading: false,
            clients
        };
    }),
    on(fromClients.createClient, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromClients.createClientSuccess, (state, { client }) => {
        return {
            ...state,
            clients: [...state.clients, client],
            isLoading: false,
        };
    }),
    on(fromClients.updateClient, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromClients.updateClientSuccess, (state, { client }) => {
        return {
            ...state,
            clients: state.clients.map((b) => b.id === client.id ? client : b),
            isLoading: false,
        };
    }),
    on(fromClients.deleteClient, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromClients.deleteClientSuccess, (state, { client }) => {
        return {
            ...state,
            isLoading: false,
            clients: state.clients.filter((b) => b.id !== client.id)
        };
    })
);

export function clientReducer(state = initialClientState, actions: Action): IClientState {
    return reducer(state, actions);
}
