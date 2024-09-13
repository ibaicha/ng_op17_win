import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IClientState } from './client.model';

export const selectClientState = createFeatureSelector<IClientState>('client');
export const selectClientsList = createSelector(selectClientState, (state) => state.clients);
export const selectClientIsLoading = createSelector(selectClientState, (state) => state.isLoading);


export const selectClientById = (itemId: number) => createSelector(selectClientState, (state) => state.clients.find((item) => item.id === itemId));