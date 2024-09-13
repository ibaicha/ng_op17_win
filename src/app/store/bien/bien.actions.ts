import { createAction, props } from '@ngrx/store';
import { IBien } from '../../interfaces/bien.interface';
import { IClient } from '../../interfaces/client.interface';

const prefix = '[Biens]';

export const getBien = createAction(
    `${prefix} get Bien`,
    props<{
        id: number;
    }>()
);
export const getBienSuccess = createAction(
    `${getBien.type} Success`,
    props<{
        oneBien: IBien;
    }>()
);


export const getBiens = createAction(
    `${prefix} Get Biens`);
export const getBiensSuccess = createAction(
    `${getBiens.type} Success`,
    props<{
        biens: IBien[];
    }>()
);

export const createBien = createAction(
    `${prefix} Create Bien`,
    props<{
        bien: IBien;
    }>()
);

export const createBienSuccess = createAction(
    `${createBien.type} Success`,
    props<{
        bien: IBien;
    }>()
);

export const updateBien = createAction(
    `${prefix} Update Bien`,
    props<{
        bien: IBien;
    }>()
);

export const updateBienSuccess = createAction(
    `${updateBien.type} Success`,
    props<{
        bien: IBien;
    }>()
);

export const deleteBien = createAction(
    `${prefix} Delete Bien`,
    props<{
        bien: IBien;
    }>()
);
export const deleteBienSuccess = createAction(
    `${deleteBien.type} Success`,
    props<{
        bien: IBien;
    }>()
);
