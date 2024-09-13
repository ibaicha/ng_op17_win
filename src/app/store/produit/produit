import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { map, switchMap } from 'rxjs/operators';

import * as fromProduits from './index';
import { ProduitService } from '../../services/produit.service';
import { IProduit } from '../../interfaces/filiere.interface';

@Injectable()
export class ProduitEffects {
    constructor(private readonly actions$: Actions, private readonly produitService: ProduitService) {
    }

    getProduits$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromProduits.getProduits.type),
            switchMap(() => this.produitService.getProduits()),
            map((produits: IProduit[]) => fromProduits.getProduitsSuccess({produits}))
        )
    );

    createProduit$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromProduits.createProduit),
            switchMap(({produit}) => this.produitService.create(produit)),
            map((produit: IProduit) => fromProduits.createProduitSuccess({produit}))
        )
    );

    updateProduit$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromProduits.updateProduit),
            switchMap(({produit}) => this.produitService.update(produit)),
            map((produit: IProduit) => fromProduits.updateProduitSuccess({produit}))
        )
    );

    deleteProduit$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromProduits.deleteProduit),
            switchMap(({produit}) => this.produitService.delete(produit)),
            map((produit: IProduit) => fromProduits.deleteProduitSuccess({produit}))
        )
    );
}
