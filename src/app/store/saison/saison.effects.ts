import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';

import * as fromSaisons from './index';
import { SaisonService } from '../../services/saison.service';
import { ISaison } from '../../interfaces/saison.interface';

@Injectable()
export class SaisonEffects {
    constructor(private readonly actions$: Actions, private readonly saisonService: SaisonService) {
    }

    getSaisons$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromSaisons.getSaisons.type),
            switchMap(() => this.saisonService.getSaisons()),
            map((saisons: ISaison[]) => fromSaisons.getSaisonsSuccess({saisons}))
        )
    );

    createSaison$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromSaisons.createSaison),
            switchMap(({saison}) => this.saisonService.create(saison)),
            map((saison: ISaison) => fromSaisons.createSaisonSuccess({saison}))
        )
    );

    updateSaison$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromSaisons.updateSaison),
            switchMap(({saison}) => this.saisonService.update(saison)),
            map((saison: ISaison) => fromSaisons.updateSaisonSuccess({saison}))
        )
    );

    deleteSaison$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromSaisons.deleteSaison),
            switchMap(({saison}) => this.saisonService.delete(saison)),
            map((saison: ISaison) => fromSaisons.deleteSaisonSuccess({saison}))
        )
    );
}
