import { getAllOpsCustomFromAgenceSuccess } from './op.actions';
import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';

import * as fromOps from './index';
import { OpService } from '../../services/op.service';
import { IOp, IOpCustom } from '../../interfaces/op.interface';

@Injectable()
export class OpEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly opService: OpService
  ) {}

  getOps$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOps.getOps.type),
      switchMap(() => this.opService.getOpsCustom()),
      map((ops: IOp[]) => fromOps.getOpsSuccess({ ops }))
    )
  );

  /////////////////////////////////////////

getAllOpWithFilters$ = createEffect(() =>
  this.actions$.pipe(
    ofType(fromOps.getAllOpWithFilters.type),
    switchMap((action) => {
      const { filter } = action; // Destructure parameters from the action payload
      return this.opService.getAllOpWithFilters(
        filter
      ); // Pass parameters to your service method
    }),
    map((opWithFilters: IOpCustom[]) =>
      fromOps.getAllOpWithFiltersSuccess({
        opWithFilters,
      })
    )
  )
);

  /////////////////////////////////////////

  getAllOpsCustomFromAgence$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOps.getAllOpsCustomFromAgence.type),
      switchMap((action) => {
        const { agenceId } = action; // Destructure parameters from the action payload
        return this.opService.getAllOpsCustomFromAgence(agenceId); // Pass parameters to your service method
      }),
      map((opsCustomFromAgences: IOp[]) =>
        fromOps.getAllOpsCustomFromAgenceSuccess({
          opsCustomFromAgences,
        })
      )
    )
  );

  createOp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOps.createOp),
      switchMap(({ op }) => this.opService.create(op)),
      map((op: IOp) => fromOps.createOpSuccess({ op }))
    )
  );

  updateOp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOps.updateOp),
      switchMap(({ op }) => this.opService.update(op)),
      map((op: IOp) => fromOps.updateOpSuccess({ op }))
    )
  );

  deleteOp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromOps.deleteOp),
      switchMap(({ op }) => this.opService.delete(op)),
      map((op: IOp) => fromOps.deleteOpSuccess({ op }))
    )
  );
}
