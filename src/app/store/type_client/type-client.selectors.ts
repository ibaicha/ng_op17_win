import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ITypeClientState } from './type-client.model';

export const selectTypeClientState = createFeatureSelector<ITypeClientState>('typeClient');
export const selectTypeClientsList = createSelector(selectTypeClientState, (state) => state.typeClients);
export const selectTypeClientIsLoading = createSelector(selectTypeClientState, (state) => state.isLoading);


export const selectTypeClientById = (itemId: number) => createSelector(selectTypeClientState, (state) => state.typeClients.find((item) => item.id === itemId));