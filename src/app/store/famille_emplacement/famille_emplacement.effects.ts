import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';

import * as fromFamilleEmplacements from './index';
import { FamilleEmplacementService } from '../../services/famille-emplacement.service';
import { IFamilleEmplacement } from '../../interfaces/filiere.interface';

@Injectable()
export class FamilleEmplacementEffects {
    constructor(private readonly actions$: Actions, private readonly familleEmplacementService: FamilleEmplacementService) {
    }

    getFamilleEmplacements$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromFamilleEmplacements.getFamilleEmplacements.type),
            switchMap(() => this.familleEmplacementService.getFamilleEmplacements()),
            map((familleEmplacements: IFamilleEmplacement[]) => fromFamilleEmplacements.getFamilleEmplacementsSuccess({familleEmplacements}))
        )
    );

    createFamilleEmplacement$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromFamilleEmplacements.createFamilleEmplacement),
            switchMap(({familleEmplacement}) => this.familleEmplacementService.create(familleEmplacement)),
            map((familleEmplacement: IFamilleEmplacement) => fromFamilleEmplacements.createFamilleEmplacementSuccess({familleEmplacement}))
        )
    );

    updateFamilleEmplacement$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromFamilleEmplacements.updateFamilleEmplacement),
            switchMap(({familleEmplacement}) => this.familleEmplacementService.update(familleEmplacement)),
            map((familleEmplacement: IFamilleEmplacement) => fromFamilleEmplacements.updateFamilleEmplacementSuccess({familleEmplacement}))
        )
    );

    deleteFamilleEmplacement$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromFamilleEmplacements.deleteFamilleEmplacement),
            switchMap(({familleEmplacement}) => this.familleEmplacementService.delete(familleEmplacement)),
            map((familleEmplacement: IFamilleEmplacement) => fromFamilleEmplacements.deleteFamilleEmplacementSuccess({familleEmplacement}))
        )
    );
}
