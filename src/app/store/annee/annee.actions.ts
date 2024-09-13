import { createAction, props } from '@ngrx/store';
import { IAnnee } from '../../interfaces/annee.interface';

const prefix = '[Annees]';

export const getAnnee = createAction(
    `${prefix} get Annee`,
    props<{
        id: number;
    }>()
);
export const getAnneeSuccess = createAction(
    `${getAnnee.type} Success`,
    props<{
        oneAnnee: IAnnee;
    }>()
);

export const getAnnees = createAction(
    `${prefix} Get Annees`);
export const getAnneesSuccess = createAction(
    `${getAnnees.type} Success`,
    props<{
        annees: IAnnee[];
    }>()
);

export const createAnnee = createAction(
    `${prefix} Create Annee`,
    props<{
        annee: IAnnee;
    }>()
);

export const createAnneeSuccess = createAction(
    `${createAnnee.type} Success`,
    props<{
        annee: IAnnee;
    }>()
);

export const updateAnnee = createAction(
    `${prefix} Update Annee`,
    props<{
        annee: IAnnee;
    }>()
);

export const updateAnneeSuccess = createAction(
    `${updateAnnee.type} Success`,
    props<{
        annee: IAnnee;
    }>()
);

export const deleteAnnee = createAction(
    `${prefix} Delete Annee`,
    props<{
        annee: IAnnee;
    }>()
);
export const deleteAnneeSuccess = createAction(
    `${deleteAnnee.type} Success`,
    props<{
        annee: IAnnee;
    }>()
);
