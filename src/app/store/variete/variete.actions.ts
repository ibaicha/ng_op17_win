import { createAction, props } from '@ngrx/store';
import { IVariete } from '../../interfaces/filiere.interface';

const prefix = '[Varietes]';

export const getVariete = createAction(
    `${prefix} get Variete`,
    props<{
        id: number;
    }>()
);
export const getVarieteSuccess = createAction(
    `${getVariete.type} Success`,
    props<{
        oneVariete: IVariete;
    }>()
);

export const getVarietes = createAction(
    `${prefix} Get Varietes`);
export const getVarietesSuccess = createAction(
    `${getVarietes.type} Success`,
    props<{
        varietes: IVariete[];
    }>()
);

export const createVariete = createAction(
    `${prefix} Create Variete`,
    props<{
        variete: IVariete;
    }>()
);

export const createVarieteSuccess = createAction(
    `${createVariete.type} Success`,
    props<{
        variete: IVariete;
    }>()
);

export const updateVariete = createAction(
    `${prefix} Update Variete`,
    props<{
        variete: IVariete;
    }>()
);

export const updateVarieteSuccess = createAction(
    `${updateVariete.type} Success`,
    props<{
        variete: IVariete;
    }>()
);

export const deleteVariete = createAction(
    `${prefix} Delete Variete`,
    props<{
        variete: IVariete;
    }>()
);
export const deleteVarieteSuccess = createAction(
    `${deleteVariete.type} Success`,
    props<{
        variete: IVariete;
    }>()
);
