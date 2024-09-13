import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';

import * as fromSocietes from './index';
import { SocieteService } from '../../services/societe.service';
import { ISociete } from '../../interfaces/societe.interface';

@Injectable()
export class SocieteEffects {
    constructor(private readonly actions$: Actions, private readonly societeService: SocieteService) {
    }

    getSocietes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromSocietes.getSocietes.type),
            switchMap(() => this.societeService.getSocietes()),
            map((societes: ISociete[]) => fromSocietes.getSocietesSuccess({societes}))
        )
    );

    createSociete$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromSocietes.createSociete),
            switchMap(({societe}) => this.societeService.create(societe)),
            map((societe: ISociete) => fromSocietes.createSocieteSuccess({societe}))
        )
    );

    updateSociete$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromSocietes.updateSociete),
            switchMap(({societe}) => this.societeService.update(societe)),
            map((societe: ISociete) => fromSocietes.updateSocieteSuccess({societe}))
        )
    );

    deleteSociete$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromSocietes.deleteSociete),
            switchMap(({societe}) => this.societeService.delete(societe)),
            map((societe: ISociete) => fromSocietes.deleteSocieteSuccess({societe}))
        )
    );
}
