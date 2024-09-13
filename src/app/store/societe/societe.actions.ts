import { createAction, props } from '@ngrx/store';
import { ISociete } from '../../interfaces/societe.interface';

const prefix = '[Societes]';

export const getSociete = createAction(
    `${prefix} get Societe`,
    props<{
        id: number;
    }>()
);
export const getSocieteSuccess = createAction(
    `${getSociete.type} Success`,
    props<{
        oneSociete: ISociete;
    }>()
);

export const getSocietes = createAction(
    `${prefix} Get Societes`);
export const getSocietesSuccess = createAction(
    `${getSocietes.type} Success`,
    props<{
        societes: ISociete[];
    }>()
);

export const createSociete = createAction(
    `${prefix} Create Societe`,
    props<{
        societe: ISociete;
    }>()
);

export const createSocieteSuccess = createAction(
    `${createSociete.type} Success`,
    props<{
        societe: ISociete;
    }>()
);

export const updateSociete = createAction(
    `${prefix} Update Societe`,
    props<{
        societe: ISociete;
    }>()
);

export const updateSocieteSuccess = createAction(
    `${updateSociete.type} Success`,
    props<{
        societe: ISociete;
    }>()
);

export const deleteSociete = createAction(
    `${prefix} Delete Societe`,
    props<{
        societe: ISociete;
    }>()
);
export const deleteSocieteSuccess = createAction(
    `${deleteSociete.type} Success`,
    props<{
        societe: ISociete;
    }>()
);
