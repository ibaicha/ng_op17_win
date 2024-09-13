import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IBienState } from './bien.model';
import { IClient } from '../../interfaces/client.interface';
import { IBien } from '../../interfaces/bien.interface';

export const selectBienState = createFeatureSelector<IBienState>('bien');
export const selectBiensList = createSelector(selectBienState, (state) => state.biens);
export const selectBienIsLoading = createSelector(selectBienState, (state) => state.isLoading);


export const selectBienById = (itemId: number) => createSelector(selectBienState, (state) => state.biens.find((item) => item.id === itemId));
export const selectBiensOnClient = (client: IClient) => createSelector(selectBienState, (state) => state.biens.filter((item) => item.clientId === client.id));

//export const selectBiensOnClient = (client: IClient) =>createSelector(selectBiensList, (biens: IBien[]) =>biens.filter((bien) => bien.clientId === client.id));