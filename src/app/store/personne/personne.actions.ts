import { createAction, props } from '@ngrx/store';
import { IPersonne } from '../../interfaces/personne.interface';

const prefix = '[Personnes]';

export const getPersonne = createAction(
    `${prefix} get Personne`,
    props<{
        id: number;
    }>()
);
export const getPersonneSuccess = createAction(
    `${getPersonne.type} Success`,
    props<{
        onePersonne: IPersonne;
    }>()
);

export const getPersonnes = createAction(
    `${prefix} Get Personnes`);
export const getPersonnesSuccess = createAction(
    `${getPersonnes.type} Success`,
    props<{
        personnes: IPersonne[];
    }>()
);

export const createPersonne = createAction(
    `${prefix} Create Personne`,
    props<{
        personne: IPersonne;
    }>()
);

export const createPersonneSuccess = createAction(
    `${createPersonne.type} Success`,
    props<{
        personne: IPersonne;
    }>()
);

export const updatePersonne = createAction(
    `${prefix} Update Personne`,
    props<{
        personne: IPersonne;
    }>()
);

export const updatePersonneSuccess = createAction(
    `${updatePersonne.type} Success`,
    props<{
        personne: IPersonne;
    }>()
);

export const deletePersonne = createAction(
    `${prefix} Delete Personne`,
    props<{
        personne: IPersonne;
    }>()
);
export const deletePersonneSuccess = createAction(
    `${deletePersonne.type} Success`,
    props<{
        personne: IPersonne;
    }>()
);
