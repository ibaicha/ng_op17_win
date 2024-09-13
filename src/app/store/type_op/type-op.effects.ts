import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';

import * as fromTypeOps from './index';
import { TypeOpService } from '../../services/type-op.service';
import { ITypeOp } from '../../interfaces/type-op.interface';
 

@Injectable()
export class TypeOpEffects {
    constructor(private readonly actions$: Actions, private readonly typeOpService: TypeOpService) {
    }

    getTypeOps$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromTypeOps.getTypeOps.type),
            switchMap(() => this.typeOpService.getTypeOps()),
            map((typeOps: ITypeOp[]) => fromTypeOps.getTypeOpsSuccess({typeOps}))
        )
    );

    createTypeOp$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromTypeOps.createTypeOp),
            switchMap(({typeOp}) => this.typeOpService.create(typeOp)),
            map((typeOp: ITypeOp) => fromTypeOps.createTypeOpSuccess({typeOp}))
        )
    );

    updateTypeOp$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromTypeOps.updateTypeOp),
            switchMap(({typeOp}) => this.typeOpService.update(typeOp)),
            map((typeOp: ITypeOp) => fromTypeOps.updateTypeOpSuccess({typeOp}))
        )
    );

    deleteTypeOp$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromTypeOps.deleteTypeOp),
            switchMap(({typeOp}) => this.typeOpService.delete(typeOp)),
            map((typeOp: ITypeOp) => fromTypeOps.deleteTypeOpSuccess({typeOp}))
        )
    );
}
