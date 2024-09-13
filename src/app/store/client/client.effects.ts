import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';

import * as fromClients from './index';
import { ClientService } from '../../services/client.service';
import { IClient } from '../../interfaces/client.interface';

@Injectable()
export class ClientEffects {
    constructor(private readonly actions$: Actions, private readonly clientService: ClientService) {
    }

    getClients$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromClients.getClients.type),
            switchMap(() => this.clientService.getClients()),
            map((clients: IClient[]) => fromClients.getClientsSuccess({clients}))
        )
    );

    createClient$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromClients.createClient),
            switchMap(({client}) => this.clientService.create(client)),
            map((client: IClient) => fromClients.createClientSuccess({client}))
        )
    );

    updateClient$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromClients.updateClient),
            switchMap(({client}) => this.clientService.update(client)),
            map((client: IClient) => fromClients.updateClientSuccess({client}))
        )
    );

    deleteClient$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromClients.deleteClient),
            switchMap(({client}) => this.clientService.delete(client)),
            map((client: IClient) => fromClients.deleteClientSuccess({client}))
        )
    );
}
