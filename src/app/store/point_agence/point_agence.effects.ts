import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';

import * as fromPointAgences from './index';
import { IPointAgence } from '../../interfaces/point-agence.interface';
import { PointAgenceService } from '../../services/point-agence.service';

@Injectable()
export class PointAgenceEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly pointAgenceService: PointAgenceService
  ) {}

  getPointAgences$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromPointAgences
          .getPointAgences.type
      ),
      switchMap(() =>
        this.pointAgenceService.getpointAgences()
      ),
      map(
        (
          pointAgences: IPointAgence[]
        ) =>
          fromPointAgences.getPointAgencesSuccess(
            { pointAgences }
          )
      )
    )
  );

  createPointAgence$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromPointAgences.createPointAgence
      ),
      switchMap(({ pointAgence }) =>
        this.pointAgenceService.create(
          pointAgence
        )
      ),
      map(
        (
          pointAgence: IPointAgence
        ) =>
          fromPointAgences.createPointAgenceSuccess(
            { pointAgence }
          )
      )
    )
  );

  updatePointAgence$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromPointAgences.updatePointAgence
      ),
      switchMap(({ pointAgence }) =>
        this.pointAgenceService.update(
          pointAgence
        )
      ),
      map(
        (
          pointAgence: IPointAgence
        ) =>
          fromPointAgences.updatePointAgenceSuccess(
            { pointAgence }
          )
      )
    )
  );

  deletePointAgence$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        fromPointAgences.deletePointAgence
      ),
      switchMap(({ pointAgence }) =>
        this.pointAgenceService.delete(
          pointAgence
        )
      ),
      map(
        (
          pointAgence: IPointAgence
        ) =>
          fromPointAgences.deletePointAgenceSuccess(
            { pointAgence }
          )
      )
    )
  );
}
