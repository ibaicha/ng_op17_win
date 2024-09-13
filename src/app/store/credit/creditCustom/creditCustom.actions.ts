import { createAction, props } from '@ngrx/store';
import { ICreditCustom } from '../../../interfaces/credit.interface';

const prefix = '[CreditCustoms]';

export const getCreditCustom = createAction(
    `${prefix} get CreditCustom`,
    props<{
        id: number;
    }>()
);
export const getCreditCustomSuccess = createAction(
    `${getCreditCustom.type} Success`,
    props<{
        oneCreditCustom: ICreditCustom;
    }>()
);

export const getCreditCustoms = createAction(
    `${prefix} Get CreditCustoms`);
    
export const getCreditCustomsSuccess = createAction(
    `${getCreditCustoms.type} Success`,
    props<{
        creditCustoms: ICreditCustom[];
    }>()
);





