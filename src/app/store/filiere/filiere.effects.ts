import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';

import * as fromFilieres from './index';
import { FiliereService } from '../../services/filiere.service';
import { IFiliere } from '../../interfaces/filiere.interface';

@Injectable()
export class FiliereEffects {
    constructor(private readonly actions$: Actions, private readonly filiereService: FiliereService) {
    }

    getFilieres$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromFilieres.getFilieres.type),
            switchMap(() => this.filiereService.getFilieres()),
            map((filieres: IFiliere[]) => fromFilieres.getFilieresSuccess({filieres}))
        )
    );

    createFiliere$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromFilieres.createFiliere),
            switchMap(({filiere}) => this.filiereService.create(filiere)),
            map((filiere: IFiliere) => fromFilieres.createFiliereSuccess({filiere}))
        )
    );

    updateFiliere$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromFilieres.updateFiliere),
            switchMap(({filiere}) => this.filiereService.update(filiere)),
            map((filiere: IFiliere) => fromFilieres.updateFiliereSuccess({filiere}))
        )
    );

    deleteFiliere$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromFilieres.deleteFiliere),
            switchMap(({filiere}) => this.filiereService.delete(filiere)),
            map((filiere: IFiliere) => fromFilieres.deleteFiliereSuccess({filiere}))
        )
    );
}
