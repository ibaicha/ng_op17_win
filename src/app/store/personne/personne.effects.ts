import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';

import * as fromPersonnes from './index';
import { PersonneService } from '../../services/personne.service';
import { IPersonne } from '../../interfaces/personne.interface';

@Injectable()
export class PersonneEffects {
    constructor(private readonly actions$: Actions, private readonly personneService: PersonneService) {
    }

    getPersonnes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromPersonnes.getPersonnes.type),
            switchMap(() => this.personneService.getPersonnes()),
            map((personnes: IPersonne[]) => fromPersonnes.getPersonnesSuccess({personnes}))
        )
    );

    createPersonne$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromPersonnes.createPersonne),
            switchMap(({personne}) => this.personneService.create(personne)),
            map((personne: IPersonne) => fromPersonnes.createPersonneSuccess({personne}))
        )
    );

    updatePersonne$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromPersonnes.updatePersonne),
            switchMap(({personne}) => this.personneService.update(personne)),
            map((personne: IPersonne) => fromPersonnes.updatePersonneSuccess({personne}))
        )
    );

    deletePersonne$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromPersonnes.deletePersonne),
            switchMap(({personne}) => this.personneService.delete(personne)),
            map((personne: IPersonne) => fromPersonnes.deletePersonneSuccess({personne}))
        )
    );
}
