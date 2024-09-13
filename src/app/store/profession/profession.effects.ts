import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';

import * as fromProfessions from './index';
import { ProfessionService } from '../../services/profession.service';
import { IProfession } from '../../interfaces/profession.interface';

@Injectable()
export class ProfessionEffects {
    constructor(private readonly actions$: Actions, private readonly professionService: ProfessionService) {
    }

    getProfessions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromProfessions.getProfessions.type),
            switchMap(() => this.professionService.getProfessions()),
            map((professions: IProfession[]) => fromProfessions.getProfessionsSuccess({professions}))
        )
    );

    createProfession$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromProfessions.createProfession),
            switchMap(({profession}) => this.professionService.create(profession)),
            map((profession: IProfession) => fromProfessions.createProfessionSuccess({profession}))
        )
    );

    updateProfession$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromProfessions.updateProfession),
            switchMap(({profession}) => this.professionService.update(profession)),
            map((profession: IProfession) => fromProfessions.updateProfessionSuccess({profession}))
        )
    );

    deleteProfession$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromProfessions.deleteProfession),
            switchMap(({profession}) => this.professionService.delete(profession)),
            map((profession: IProfession) => fromProfessions.deleteProfessionSuccess({profession}))
        )
    );
}
