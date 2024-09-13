import { createAction, props } from '@ngrx/store';
import { ITypeSociete } from '../../interfaces/type-societe.interface';

const prefix = '[TypeSocietes]';

export const getTypeSociete = createAction(
    `${prefix} get TypeSociete`,
    props<{
        id: number;
    }>()
);
export const getTypeSocieteSuccess = createAction(
    `${getTypeSociete.type} Success`,
    props<{
        oneTypeSociete: ITypeSociete;
    }>()
);

export const getTypeSocietes = createAction(
    `${prefix} Get TypeSocietes`);
export const getTypeSocietesSuccess = createAction(
    `${getTypeSocietes.type} Success`,
    props<{
        typeSocietes: ITypeSociete[];
    }>()
);

export const createTypeSociete = createAction(
    `${prefix} Create TypeSociete`,
    props<{
        typeSociete: ITypeSociete;
    }>()
);

export const createTypeSocieteSuccess = createAction(
    `${createTypeSociete.type} Success`,
    props<{
        typeSociete: ITypeSociete;
    }>()
);

export const updateTypeSociete = createAction(
    `${prefix} Update TypeSociete`,
    props<{
        typeSociete: ITypeSociete;
    }>()
);

export const updateTypeSocieteSuccess = createAction(
    `${updateTypeSociete.type} Success`,
    props<{
        typeSociete: ITypeSociete;
    }>()
);

export const deleteTypeSociete = createAction(
    `${prefix} Delete TypeSociete`,
    props<{
        typeSociete: ITypeSociete;
    }>()
);
export const deleteTypeSocieteSuccess = createAction(
    `${deleteTypeSociete.type} Success`,
    props<{
        typeSociete: ITypeSociete;
    }>()
);
