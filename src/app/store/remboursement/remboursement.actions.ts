import { createAction, props } from '@ngrx/store';
import { IRemboursement } from '../../interfaces/credit.interface';

const prefix = '[Remboursements]';

export const getRemboursement = createAction(
    `${prefix} get Remboursement`,
    props<{
        id: number;
    }>()
);
export const getRemboursementSuccess = createAction(
    `${getRemboursement.type} Success`,
    props<{
        oneRemboursement: IRemboursement;
    }>()
);

export const getRemboursements = createAction(
    `${prefix} Get Remboursements`);
export const getRemboursementsSuccess = createAction(
    `${getRemboursements.type} Success`,
    props<{
        remboursements: IRemboursement[];
    }>()
);

export const createRemboursement = createAction(
    `${prefix} Create Remboursement`,
    props<{
        remboursement: IRemboursement;
    }>()
);

export const createRemboursementSuccess = createAction(
    `${createRemboursement.type} Success`,
    props<{
        remboursement: IRemboursement;
    }>()
);

export const updateRemboursement = createAction(
    `${prefix} Update Remboursement`,
    props<{
        remboursement: IRemboursement;
    }>()
);

export const updateRemboursementSuccess = createAction(
    `${updateRemboursement.type} Success`,
    props<{
        remboursement: IRemboursement;
    }>()
);

export const deleteRemboursement = createAction(
    `${prefix} Delete Remboursement`,
    props<{
        remboursement: IRemboursement;
    }>()
);
export const deleteRemboursementSuccess = createAction(
    `${deleteRemboursement.type} Success`,
    props<{
        remboursement: IRemboursement;
    }>()
);
