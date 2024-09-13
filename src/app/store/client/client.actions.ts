import { createAction, props } from '@ngrx/store';
import { IClient } from '../../interfaces/client.interface';

const prefix = '[Clients]';

export const getClient = createAction(
    `${prefix} get Client`,
    props<{
        id: number;
    }>()
);
export const getClientSuccess = createAction(
    `${getClient.type} Success`,
    props<{
        oneClient: IClient;
    }>()
);

export const getClients = createAction(
    `${prefix} Get Clients`);
export const getClientsSuccess = createAction(
    `${getClients.type} Success`,
    props<{
        clients: IClient[];
    }>()
);

export const createClient = createAction(
    `${prefix} Create Client`,
    props<{
        client: IClient;
    }>()
);

export const createClientSuccess = createAction(
    `${createClient.type} Success`,
    props<{
        client: IClient;
    }>()
);

export const updateClient = createAction(
    `${prefix} Update Client`,
    props<{
        client: IClient;
    }>()
);

export const updateClientSuccess = createAction(
    `${updateClient.type} Success`,
    props<{
        client: IClient;
    }>()
);

export const deleteClient = createAction(
    `${prefix} Delete Client`,
    props<{
        client: IClient;
    }>()
);
export const deleteClientSuccess = createAction(
    `${deleteClient.type} Success`,
    props<{
        client: IClient;
    }>()
);
