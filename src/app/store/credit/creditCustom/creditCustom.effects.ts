import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';

import * as fromCreditCustoms from './index';
import { CreditService } from '../../../services/credit.service';
import { ICreditCustom } from '../../../interfaces/credit.interface';

@Injectable()
export class CreditCustomEffects {
    constructor(private readonly actions$: Actions, private readonly creditService: CreditService) {
    }

    getCreditCustoms$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromCreditCustoms.getCreditCustoms.type),
            switchMap(() => this.creditService.getAllCustom()),
            map((creditCustoms: ICreditCustom[]) => fromCreditCustoms.getCreditCustomsSuccess({creditCustoms}))
        )
    );

 
}
