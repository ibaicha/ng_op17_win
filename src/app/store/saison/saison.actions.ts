import { createAction, props } from '@ngrx/store';
import { ISaison } from '../../interfaces/saison.interface';

const prefix = '[Saisons]';

export const getSaison = createAction(
    `${prefix} get Saison`,
    props<{
        id: number;
    }>()
);
export const getSaisonSuccess = createAction(
    `${getSaison.type} Success`,
    props<{
        oneSaison: ISaison;
    }>()
);

export const getSaisons = createAction(
    `${prefix} Get Saisons`);
export const getSaisonsSuccess = createAction(
    `${getSaisons.type} Success`,
    props<{
        saisons: ISaison[];
    }>()
);

export const createSaison = createAction(
    `${prefix} Create Saison`,
    props<{
        saison: ISaison;
    }>()
);

export const createSaisonSuccess = createAction(
    `${createSaison.type} Success`,
    props<{
        saison: ISaison;
    }>()
);

export const updateSaison = createAction(
    `${prefix} Update Saison`,
    props<{
        saison: ISaison;
    }>()
);

export const updateSaisonSuccess = createAction(
    `${updateSaison.type} Success`,
    props<{
        saison: ISaison;
    }>()
);

export const deleteSaison = createAction(
    `${prefix} Delete Saison`,
    props<{
        saison: ISaison;
    }>()
);
export const deleteSaisonSuccess = createAction(
    `${deleteSaison.type} Success`,
    props<{
        saison: ISaison;
    }>()
);
