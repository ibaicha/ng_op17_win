import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';

import * as fromRemboursements from './index';
import { RemboursementService } from '../../services/remboursement.service';
import { IRemboursement } from '../../interfaces/credit.interface';

@Injectable()
export class RemboursementEffects {
    constructor(private readonly actions$: Actions, private readonly remboursementService: RemboursementService) {
    }

    getRemboursements$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromRemboursements.getRemboursements.type),
            switchMap(() => this.remboursementService.getRemboursements()),
            map((remboursements: IRemboursement[]) => fromRemboursements.getRemboursementsSuccess({remboursements}))
        )
    );

    createRemboursement$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromRemboursements.createRemboursement),
            switchMap(({remboursement}) => this.remboursementService.create(remboursement)),
            map((remboursement: IRemboursement) => fromRemboursements.createRemboursementSuccess({remboursement}))
        )
    );

    updateRemboursement$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromRemboursements.updateRemboursement),
            switchMap(({remboursement}) => this.remboursementService.update(remboursement)),
            map((remboursement: IRemboursement) => fromRemboursements.updateRemboursementSuccess({remboursement}))
        )
    );

    deleteRemboursement$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromRemboursements.deleteRemboursement),
            switchMap(({remboursement}) => this.remboursementService.delete(remboursement)),
            map((remboursement: IRemboursement) => fromRemboursements.deleteRemboursementSuccess({remboursement}))
        )
    );
}
