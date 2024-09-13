import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';

import * as fromMouvementIntrants from './index';

import { MouvementIntrantService } from '../../services/mouvement-intrant.service';
import { IMouvementIntrant } from '../../interfaces/mouvement-intrant.interface';

@Injectable()
export class MouvementIntrantEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly mouvementIntrantService: MouvementIntrantService
  ) {}

  getMouvementIntrants$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromMouvementIntrants.getMouvementIntrants.type),
      switchMap(() => this.mouvementIntrantService.getMouvementIntrants()),
      map((mouvementIntrants: IMouvementIntrant[]) =>
        fromMouvementIntrants.getMouvementIntrantsSuccess({ mouvementIntrants })
      )
    )
  );
  getAllMouvementIntrantWithFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromMouvementIntrants.getAllMouvementIntrantWithFilters.type),
      switchMap((action) => {
        const { filter } = action; // Destructure parameters from the action payload
        return this.mouvementIntrantService.getAllMouvementIntrantWithFilters(
          filter
        ); // Pass parameters to your service method
      }),
      map((mouvementIntrantWithFilters: IMouvementIntrant[]) =>
        fromMouvementIntrants.getAllMouvementIntrantWithFiltersSuccess({
          mouvementIntrantWithFilters,
        })
      )
    )
  );



  createMouvementIntrant$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromMouvementIntrants.createMouvementIntrant),
      switchMap(({ mouvementIntrant }) =>
        this.mouvementIntrantService.create(mouvementIntrant)
      ),
      map((mouvementIntrant: IMouvementIntrant) =>
        fromMouvementIntrants.createMouvementIntrantSuccess({
          mouvementIntrant,
        })
      )
    )
  );

  updateMouvementIntrant$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromMouvementIntrants.updateMouvementIntrant),
      switchMap(({ mouvementIntrant }) =>
        this.mouvementIntrantService.update(mouvementIntrant)
      ),
      map((mouvementIntrant: IMouvementIntrant) =>
        fromMouvementIntrants.updateMouvementIntrantSuccess({
          mouvementIntrant,
        })
      )
    )
  );

  deleteMouvementIntrant$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromMouvementIntrants.deleteMouvementIntrant),
      switchMap(({ mouvementIntrant }) =>
        this.mouvementIntrantService.delete(mouvementIntrant)
      ),
      map((mouvementIntrant: IMouvementIntrant) =>
        fromMouvementIntrants.deleteMouvementIntrantSuccess({
          mouvementIntrant,
        })
      )
    )
  );
}
