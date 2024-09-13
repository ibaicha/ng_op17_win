import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';

import * as fromAnnees from './index';
import { AnneeService } from '../../services/annee.service';
import { IAnnee } from '../../interfaces/annee.interface';

@Injectable()
export class AnneeEffects {
    constructor(private readonly actions$: Actions, private readonly anneeService: AnneeService) {
    }

    getAnnees$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromAnnees.getAnnees.type),
            switchMap(() => this.anneeService.getAnnees()),
            map((annees: IAnnee[]) => fromAnnees.getAnneesSuccess({annees}))
        )
    );

    createAnnee$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromAnnees.createAnnee),
            switchMap(({annee}) => this.anneeService.create(annee)),
            map((annee: IAnnee) => fromAnnees.createAnneeSuccess({annee}))
        )
    );

    updateAnnee$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromAnnees.updateAnnee),
            switchMap(({annee}) => this.anneeService.update(annee)),
            map((annee: IAnnee) => fromAnnees.updateAnneeSuccess({annee}))
        )
    );

    deleteAnnee$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromAnnees.deleteAnnee),
            switchMap(({annee}) => this.anneeService.delete(annee)),
            map((annee: IAnnee) => fromAnnees.deleteAnneeSuccess({annee}))
        )
    );
}
