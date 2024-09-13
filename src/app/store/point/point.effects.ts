import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';

import * as fromPoints from './index';
import { PointService } from '../../services/point.service';
import { IPoint } from '../../interfaces/pays.interface';


@Injectable()
export class PointEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly pointService: PointService
  ) {}

  getPoints$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPoints.getPoints.type),
      switchMap(() => this.pointService.getPoints()),
      map((points: IPoint[]) =>
        fromPoints.getPointsSuccess({ points })
      )
    )
  );

  createPoint$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPoints.createPoint),
      switchMap(({ point }) =>
        this.pointService.create(point)
      ),
      map((point: IPoint) =>
        fromPoints.createPointSuccess({ point })
      )
    )
  );

  updatePoint$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPoints.updatePoint),
      switchMap(({ point }) =>
        this.pointService.update(point)
      ),
      map((point: IPoint) =>
        fromPoints.updatePointSuccess({ point })
      )
    )
  );

  deletePoint$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPoints.deletePoint),
      switchMap(({ point }) =>
        this.pointService.delete(point)
      ),
      map((point: IPoint) =>
        fromPoints.deletePointSuccess({ point })
      )
    )
  );
}
