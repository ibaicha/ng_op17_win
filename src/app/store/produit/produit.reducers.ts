import { Action, createReducer, on } from '@ngrx/store';

import { IProduitState } from './produit.model';
import * as fromProduits from './index';
import { Actions } from '@ngrx/effects';

export const initialProduitState: IProduitState = {
    produits: [],
    isLoading: false
};

const reducer = createReducer<IProduitState>(
    initialProduitState,
    on(fromProduits.getProduit, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(fromProduits.getProduitSuccess, (state, { oneProduit }) => {
        return {
            ...state,
            isLoading: false,
            oneProduit
        };
    }),

    on(fromProduits.getProduits, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(fromProduits.getProduitsSuccess, (state, { produits }) => {
        return {
            ...state,
            isLoading: false,
            produits
        };
    }),
    on(fromProduits.createProduit, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromProduits.createProduitSuccess, (state, { produit }) => {
        return {
            ...state,
            produits: [...state.produits, produit],
            isLoading: false,
        };
    }),
    on(fromProduits.updateProduit, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromProduits.updateProduitSuccess, (state, { produit }) => {
        return {
            ...state,
            produits: state.produits.map((b) => b.id === produit.id ? produit : b),
            isLoading: false,
        };
    }),
    on(fromProduits.deleteProduit, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromProduits.deleteProduitSuccess, (state, { produit }) => {
        return {
            ...state,
            isLoading: false,
            produits: state.produits.filter((b) => b.id !== produit.id)
        };
    })
);

export function produitReducer(state = initialProduitState, actions: Action): IProduitState {
    return reducer(state, actions);
}
