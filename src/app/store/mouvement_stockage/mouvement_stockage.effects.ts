import { getAllMouvementStockagesProduitCampagne } from './mouvement_stockage.actions';
import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';

import * as fromMouvementStockages from './index';
import { IMouvementStockage } from '../../interfaces/credit.interface';
import { MouvementStockageService } from '../../services/mouvement-stockage.service';

@Injectable()
export class MouvementStockageEffects {
    constructor(private readonly actions$: Actions, private readonly mouvementStockageService: MouvementStockageService) {
    }

    getMouvementStockages$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromMouvementStockages.getMouvementStockages.type),
            switchMap(() => this.mouvementStockageService.getMouvementStockages()),
            map((mouvementStockages: IMouvementStockage[]) => fromMouvementStockages.getMouvementStockagesSuccess({mouvementStockages}))
        )
    );
    getAllMouvementStockagesProduitCampagne$ = createEffect(() =>
      this.actions$.pipe(
        ofType(fromMouvementStockages.getAllMouvementStockagesProduitCampagne.type),
        switchMap(action => {
          const { produitId, anneeId, saisonId } = action; // Destructure parameters from the action payload
          return this.mouvementStockageService.getAllMouvementStockProduitCampagne(produitId, anneeId, saisonId); // Pass parameters to your service method
        }),
        map((mouvementStockagesProduitCampagne: IMouvementStockage[]) => fromMouvementStockages.getAllMouvementStockagesProduitCampagneSuccess({ mouvementStockagesProduitCampagne }))
      )
    );

    getAllMouvementStockagesOpProduitCampagne$ = createEffect(() =>
      this.actions$.pipe(
        ofType(fromMouvementStockages.getAllMouvementStockagesOpProduitCampagne.type),
        switchMap(action => {
          const {opId, produitId, anneeId, saisonId } = action; // Destructure parameters from the action payload
          return this.mouvementStockageService.getAllMouvementStockOpProduitCampagne(opId, produitId, anneeId, saisonId); // Pass parameters to your service method
        }),
        map((mouvementStockagesOpProduitCampagne: IMouvementStockage[]) => fromMouvementStockages.getAllMouvementStockagesOpProduitCampagneSuccess({ mouvementStockagesOpProduitCampagne }))
      )
    );

    createMouvementStockage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromMouvementStockages.createMouvementStockage),
            switchMap(({mouvementStockage}) => this.mouvementStockageService.create(mouvementStockage)),
            map((mouvementStockage: IMouvementStockage) => fromMouvementStockages.createMouvementStockageSuccess({mouvementStockage}))
        )
    );

    updateMouvementStockage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromMouvementStockages.updateMouvementStockage),
            switchMap(({mouvementStockage}) => this.mouvementStockageService.update(mouvementStockage)),
            map((mouvementStockage: IMouvementStockage) => fromMouvementStockages.updateMouvementStockageSuccess({mouvementStockage}))
        )
    );

    deleteMouvementStockage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromMouvementStockages.deleteMouvementStockage),
            switchMap(({mouvementStockage}) => this.mouvementStockageService.delete(mouvementStockage)),
            map((mouvementStockage: IMouvementStockage) => fromMouvementStockages.deleteMouvementStockageSuccess({mouvementStockage}))
        )
    );
}
