import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';

import * as fromTypeClients from './index';
import { TypeClientService } from '../../services/type-client.service';
import { ITypeClient } from '../../interfaces/type-client.interface';

@Injectable()
export class TypeClientEffects {
    constructor(private readonly actions$: Actions, private readonly typeClientService: TypeClientService) {
    }

    getTypeClients$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromTypeClients.getTypeClients.type),
            switchMap(() => this.typeClientService.getTypeClients()),
            map((typeClients: ITypeClient[]) => fromTypeClients.getTypeClientsSuccess({typeClients}))
        )
    );

    createTypeClient$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromTypeClients.createTypeClient),
            switchMap(({typeClient}) => this.typeClientService.create(typeClient)),
            map((typeClient: ITypeClient) => fromTypeClients.createTypeClientSuccess({typeClient}))
        )
    );

    updateTypeClient$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromTypeClients.updateTypeClient),
            switchMap(({typeClient}) => this.typeClientService.update(typeClient)),
            map((typeClient: ITypeClient) => fromTypeClients.updateTypeClientSuccess({typeClient}))
        )
    );

    deleteTypeClient$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromTypeClients.deleteTypeClient),
            switchMap(({typeClient}) => this.typeClientService.delete(typeClient)),
            map((typeClient: ITypeClient) => fromTypeClients.deleteTypeClientSuccess({typeClient}))
        )
    );
}
