import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IProduitState } from './produit.model';

export const selectProduitState = createFeatureSelector<IProduitState>('produit');
export const selectProduitsList = createSelector(selectProduitState, (state) => state.produits);
export const selectProduitIsLoading = createSelector(selectProduitState, (state) => state.isLoading);


export const selectProduitById = (itemId: number) => createSelector(selectProduitState, (state) => state.produits.find((item) => item.id === itemId));