import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';

import * as fromCampagnes from './index';
import { CampagneService } from '../../services/campagne.service';
import { ICampagne } from '../../interfaces/campagne.interface';

@Injectable()
export class CampagneEffects {
    constructor(private readonly actions$: Actions, private readonly campagneService: CampagneService) {
    }

    getCampagnes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromCampagnes.getCampagnes.type),
            switchMap(() => this.campagneService.getCampagnes()),
            map((campagnes: ICampagne[]) => fromCampagnes.getCampagnesSuccess({campagnes}))
        )
    );

    createCampagne$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromCampagnes.createCampagne),
            switchMap(({campagne}) => this.campagneService.create(campagne)),
            map((campagne: ICampagne) => fromCampagnes.createCampagneSuccess({campagne}))
        )
    );

    updateCampagne$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromCampagnes.updateCampagne),
            switchMap(({campagne}) => this.campagneService.update(campagne)),
            map((campagne: ICampagne) => fromCampagnes.updateCampagneSuccess({campagne}))
        )
    );

    deleteCampagne$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromCampagnes.deleteCampagne),
            switchMap(({campagne}) => this.campagneService.delete(campagne)),
            map((campagne: ICampagne) => fromCampagnes.deleteCampagneSuccess({campagne}))
        )
    );
}
