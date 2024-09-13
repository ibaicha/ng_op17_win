import { createAction, props } from '@ngrx/store';
import { IFiliere } from '../../interfaces/filiere.interface';

const prefix = '[Filieres]';

export const getFiliere = createAction(
    `${prefix} get Filiere`,
    props<{
        id: number;
    }>()
);
export const getFiliereSuccess = createAction(
    `${getFiliere.type} Success`,
    props<{
        oneFiliere: IFiliere;
    }>()
);

export const getFilieres = createAction(
    `${prefix} Get Filieres`);
export const getFilieresSuccess = createAction(
    `${getFilieres.type} Success`,
    props<{
        filieres: IFiliere[];
    }>()
);

export const createFiliere = createAction(
    `${prefix} Create Filiere`,
    props<{
        filiere: IFiliere;
    }>()
);

export const createFiliereSuccess = createAction(
    `${createFiliere.type} Success`,
    props<{
        filiere: IFiliere;
    }>()
);

export const updateFiliere = createAction(
    `${prefix} Update Filiere`,
    props<{
        filiere: IFiliere;
    }>()
);

export const updateFiliereSuccess = createAction(
    `${updateFiliere.type} Success`,
    props<{
        filiere: IFiliere;
    }>()
);

export const deleteFiliere = createAction(
    `${prefix} Delete Filiere`,
    props<{
        filiere: IFiliere;
    }>()
);
export const deleteFiliereSuccess = createAction(
    `${deleteFiliere.type} Success`,
    props<{
        filiere: IFiliere;
    }>()
);
