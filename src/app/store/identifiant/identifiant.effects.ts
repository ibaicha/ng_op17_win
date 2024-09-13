import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';

import * as fromIdentifiants from './index';
import { IdentifiantService } from '../../services/identifiant.service';
import { IIdentifiant } from '../../interfaces/identifiant.interface';



@Injectable()
export class IdentifiantEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly identifiantService: IdentifiantService
  ) {}

  getIdentifiants$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromIdentifiants.getIdentifiants.type),
      switchMap(() => this.identifiantService.getIdentifiants()),
      map((identifiants: IIdentifiant[]) =>
        fromIdentifiants.getIdentifiantsSuccess({ identifiants })
      )
    )
  );
  getAllIdentifiantWithFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromIdentifiants.getAllIdentifiantsWithFilters.type),
      switchMap((action) => {
        const { filter } = action; // Destructure parameters from the action payload
        return this.identifiantService.getAllIdentifiantsWithFilters(
          filter
        ); // Pass parameters to your service method
      }),
      map((identifiantWithFilters: IIdentifiant[]) =>
        fromIdentifiants.getAllIdentifiantsWithFiltersSuccess({
          identifiantWithFilters,
        })
      )
    )
  );



  createIdentifiant$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromIdentifiants.createIdentifiant),
      switchMap(({ identifiant }) =>
        this.identifiantService.create(identifiant)
      ),
      map((identifiant: IIdentifiant) =>
        fromIdentifiants.createIdentifiantSuccess({
          identifiant,
        })
      )
    )
  );

  updateIdentifiant$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromIdentifiants.updateIdentifiant),
      switchMap(({ identifiant }) =>
        this.identifiantService.update(identifiant)
      ),
      map((identifiant: IIdentifiant) =>
        fromIdentifiants.updateIdentifiantSuccess({
          identifiant,
        })
      )
    )
  );

  deleteIdentifiant$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromIdentifiants.deleteIdentifiant),
      switchMap(({ identifiant }) =>
        this.identifiantService.delete(identifiant)
      ),
      map((identifiant: IIdentifiant) =>
        fromIdentifiants.deleteIdentifiantSuccess({
          identifiant,
        })
      )
    )
  );
}
