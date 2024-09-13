import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';

import * as fromBiens from './index';
import { BienService } from '../../services/bien.service';
import { IBien } from '../../interfaces/bien.interface';

@Injectable()
export class BienEffects {
    constructor(private readonly actions$: Actions, private readonly bienService: BienService) {
    }

    getBiens$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromBiens.getBiens.type),
            switchMap(() => this.bienService.getBiens()),
            map((biens: IBien[]) => fromBiens.getBiensSuccess({biens}))
        )
    );


    createBien$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromBiens.createBien),
            switchMap(({bien}) => this.bienService.create(bien)),
            map((bien: IBien) => fromBiens.createBienSuccess({bien}))
        )
    );

    updateBien$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromBiens.updateBien),
            switchMap(({bien}) => this.bienService.update(bien)),
            map((bien: IBien) => fromBiens.updateBienSuccess({bien}))
        )
    );

    deleteBien$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromBiens.deleteBien),
            switchMap(({bien}) => this.bienService.delete(bien)),
            map((bien: IBien) => fromBiens.deleteBienSuccess({bien}))
        )
    );
}
