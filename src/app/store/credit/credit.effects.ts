
import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';

import * as fromCredits from './index';
import { CreditService } from '../../services/credit.service';
import { ICredit, ICreditCustom, IExploitationCredit } from '../../interfaces/credit.interface';

@Injectable()
export class CreditEffects {
    constructor(private readonly actions$: Actions, private readonly creditService: CreditService) {
    }

getCredits$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromCredits.getCredits.type),
            switchMap(() => this.creditService.getCredits()),
            map((credits: ICredit[]) => fromCredits.getCreditsSuccess({credits}))
        )
    );


getCreditsCustom$ = createEffect(() =>
    this.actions$.pipe(
        ofType(fromCredits.getCreditsCustom.type),
        switchMap(() => this.creditService.getAllCustom()),
        map((creditsCustom: ICreditCustom[]) => fromCredits.getCreditsCustomSuccess({creditsCustom}))
    )
);

getAllCustomCreditAgenceVarieteAnneeSaison$ = createEffect(() =>
  this.actions$.pipe(
    ofType(fromCredits.getAllCustomCreditAgenceVarieteAnneeSaison.type),
    switchMap(action => {
      const {agenceSocieteId, produitId, anneeId, saisonId } = action; // Destructure parameters from the action payload
      return this.creditService.getAllCustomCreditAgenceVarieteAnneeSaison(agenceSocieteId, produitId, anneeId, saisonId); // Pass parameters to your service method
    }),
    map((customCreditAgenceVarieteAnneeSaison: ICreditCustom[]) => fromCredits.getAllCustomCreditAgenceVarieteAnneeSaisonSuccess({ customCreditAgenceVarieteAnneeSaison }))
  )
);
getAllCustomCreditSocieteVarieteAnneeSaison$ = createEffect(() =>
  this.actions$.pipe(
    ofType(fromCredits.getAllCustomCreditSocieteVarieteAnneeSaison.type),
    switchMap(action => {
      const {etablissementId, produitId, anneeId, saisonId } = action; // Destructure parameters from the action payload
      return this.creditService.getAllCustomCreditSocieteVarieteAnneeSaison(etablissementId, produitId, anneeId, saisonId); // Pass parameters to your service method
    }),
    map((customCreditSocieteVarieteAnneeSaison: ICreditCustom[]) => fromCredits.getAllCustomCreditSocieteVarieteAnneeSaisonSuccess({ customCreditSocieteVarieteAnneeSaison }))
  )
);

getAllCreditWithFilters$ = createEffect(() =>
  this.actions$.pipe(
    ofType(fromCredits.getAllCreditWithFilters.type),
    switchMap((action) => {
      const { filter } = action; // Destructure parameters from the action payload
      return this.creditService.getAllCreditsWithFilters(
        filter
      ); // Pass parameters to your service method
    }),
    map((creditWithFilters: ICreditCustom[]) =>
      fromCredits.getAllCreditWithFiltersSuccess({
        creditWithFilters,
      })
    )
  )
);

 



    createCredit$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromCredits.createCredit),
            switchMap((action) => this.creditService.create(action.body)),
            map((res: any) => fromCredits.createCreditSuccess({credit: res}))
        )
    );

    updateCredit$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromCredits.updateCredit),
            switchMap((action) => this.creditService.update(action.body)),
            map((res: any) => fromCredits.updateCreditSuccess({credit: res}))
        )
    );


    createExploitationCredit$ = createEffect(() =>
    this.actions$.pipe(
        ofType(fromCredits.createExploitationCredit),
        switchMap((action) => this.creditService.createExploitationCredit(action.body)),
        map((res: any) => fromCredits.createExploitationCreditSuccess({exploitationCredit: res}))
    )
);



    deleteCredit$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromCredits.deleteCredit),
            switchMap((action) => this.creditService.delete(action.body)),
            map((res: any) => fromCredits.deleteCreditSuccess({credit: res}))
        )
    );
}
