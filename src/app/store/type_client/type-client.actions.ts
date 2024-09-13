import { createAction, props } from '@ngrx/store';
import { ITypeClient } from '../../interfaces/type-client.interface';

const prefix = '[TypeClients]';

export const getTypeClient = createAction(
    `${prefix} get TypeClient`,
    props<{
        id: number;
    }>()
);
export const getTypeClientSuccess = createAction(
    `${getTypeClient.type} Success`,
    props<{
        oneTypeClient: ITypeClient;
    }>()
);

export const getTypeClients = createAction(
    `${prefix} Get TypeClients`);
export const getTypeClientsSuccess = createAction(
    `${getTypeClients.type} Success`,
    props<{
        typeClients: ITypeClient[];
    }>()
);

export const createTypeClient = createAction(
    `${prefix} Create TypeClient`,
    props<{
        typeClient: ITypeClient;
    }>()
);

export const createTypeClientSuccess = createAction(
    `${createTypeClient.type} Success`,
    props<{
        typeClient: ITypeClient;
    }>()
);

export const updateTypeClient = createAction(
    `${prefix} Update TypeClient`,
    props<{
        typeClient: ITypeClient;
    }>()
);

export const updateTypeClientSuccess = createAction(
    `${updateTypeClient.type} Success`,
    props<{
        typeClient: ITypeClient;
    }>()
);

export const deleteTypeClient = createAction(
    `${prefix} Delete TypeClient`,
    props<{
        typeClient: ITypeClient;
    }>()
);
export const deleteTypeClientSuccess = createAction(
    `${deleteTypeClient.type} Success`,
    props<{
        typeClient: ITypeClient;
    }>()
);
