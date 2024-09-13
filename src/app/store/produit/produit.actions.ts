import { createAction, props } from '@ngrx/store';
import { IProduit } from '../../interfaces/filiere.interface';

const prefix = '[Produits]';

export const getProduit = createAction(
    `${prefix} get Produit`,
    props<{
        id: number;
    }>()
);
export const getProduitSuccess = createAction(
    `${getProduit.type} Success`,
    props<{
        oneProduit: IProduit;
    }>()
);

export const getProduits = createAction(
    `${prefix} Get Produits`);
export const getProduitsSuccess = createAction(
    `${getProduits.type} Success`,
    props<{
        produits: IProduit[];
    }>()
);

export const createProduit = createAction(
    `${prefix} Create Produit`,
    props<{
        produit: IProduit;
    }>()
);

export const createProduitSuccess = createAction(
    `${createProduit.type} Success`,
    props<{
        produit: IProduit;
    }>()
);

export const updateProduit = createAction(
    `${prefix} Update Produit`,
    props<{
        produit: IProduit;
    }>()
);

export const updateProduitSuccess = createAction(
    `${updateProduit.type} Success`,
    props<{
        produit: IProduit;
    }>()
);

export const deleteProduit = createAction(
    `${prefix} Delete Produit`,
    props<{
        produit: IProduit;
    }>()
);
export const deleteProduitSuccess = createAction(
    `${deleteProduit.type} Success`,
    props<{
        produit: IProduit;
    }>()
);
