import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';

import * as fromTypeSocietes from './index';
import { TypeSocieteService } from '../../services/type-societe.service';
import { ITypeSociete } from '../../interfaces/type-societe.interface';

@Injectable()
export class TypeSocieteEffects {
    constructor(private readonly actions$: Actions, private readonly typeSocieteService: TypeSocieteService) {
    }

    getTypeSocietes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromTypeSocietes.getTypeSocietes.type),
            switchMap(() => this.typeSocieteService.getTypeSocietes()),
            map((typeSocietes: ITypeSociete[]) => fromTypeSocietes.getTypeSocietesSuccess({typeSocietes}))
        )
    );

    createTypeSociete$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromTypeSocietes.createTypeSociete),
            switchMap(({typeSociete}) => this.typeSocieteService.create(typeSociete)),
            map((typeSociete: ITypeSociete) => fromTypeSocietes.createTypeSocieteSuccess({typeSociete}))
        )
    );

    updateTypeSociete$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromTypeSocietes.updateTypeSociete),
            switchMap(({typeSociete}) => this.typeSocieteService.update(typeSociete)),
            map((typeSociete: ITypeSociete) => fromTypeSocietes.updateTypeSocieteSuccess({typeSociete}))
        )
    );

    deleteTypeSociete$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromTypeSocietes.deleteTypeSociete),
            switchMap(({typeSociete}) => this.typeSocieteService.delete(typeSociete)),
            map((typeSociete: ITypeSociete) => fromTypeSocietes.deleteTypeSocieteSuccess({typeSociete}))
        )
    );
}
