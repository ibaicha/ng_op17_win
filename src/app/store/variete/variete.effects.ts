import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';

import * as fromVarietes from './index';
import { VarieteService } from '../../services/variete.service';
import { IVariete } from '../../interfaces/filiere.interface';

@Injectable()
export class VarieteEffects {
    constructor(private readonly actions$: Actions, private readonly varieteService: VarieteService) {
    }

    getVarietes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromVarietes.getVarietes.type),
            switchMap(() => this.varieteService.getVarietes()),
            map((varietes: IVariete[]) => fromVarietes.getVarietesSuccess({varietes}))
        )
    );

    createVariete$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromVarietes.createVariete),
            switchMap(({variete}) => this.varieteService.create(variete)),
            map((variete: IVariete) => fromVarietes.createVarieteSuccess({variete}))
        )
    );

    updateVariete$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromVarietes.updateVariete),
            switchMap(({variete}) => this.varieteService.update(variete)),
            map((variete: IVariete) => fromVarietes.updateVarieteSuccess({variete}))
        )
    );

    deleteVariete$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromVarietes.deleteVariete),
            switchMap(({variete}) => this.varieteService.delete(variete)),
            map((variete: IVariete) => fromVarietes.deleteVarieteSuccess({variete}))
        )
    );
}
