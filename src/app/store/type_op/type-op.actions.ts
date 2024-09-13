import { createAction, props } from '@ngrx/store';
import { ITypeOp } from '../../interfaces/type-op.interface';
 

const prefix = '[TypeOps]';

export const getTypeOp = createAction(
    `${prefix} get TypeOp`,
    props<{
        id: number;
    }>()
);
export const getTypeOpSuccess = createAction(
    `${getTypeOp.type} Success`,
    props<{
        oneTypeOp: ITypeOp;
    }>()
);

export const getTypeOps = createAction(
    `${prefix} Get TypeOps`);
export const getTypeOpsSuccess = createAction(
    `${getTypeOps.type} Success`,
    props<{
        typeOps: ITypeOp[];
    }>()
);

export const createTypeOp = createAction(
    `${prefix} Create TypeOp`,
    props<{
        typeOp: ITypeOp;
    }>()
);

export const createTypeOpSuccess = createAction(
    `${createTypeOp.type} Success`,
    props<{
        typeOp: ITypeOp;
    }>()
);

export const updateTypeOp = createAction(
    `${prefix} Update TypeOp`,
    props<{
        typeOp: ITypeOp;
    }>()
);

export const updateTypeOpSuccess = createAction(
    `${updateTypeOp.type} Success`,
    props<{
        typeOp: ITypeOp;
    }>()
);

export const deleteTypeOp = createAction(
    `${prefix} Delete TypeOp`,
    props<{
        typeOp: ITypeOp;
    }>()
);
export const deleteTypeOpSuccess = createAction(
    `${deleteTypeOp.type} Success`,
    props<{
        typeOp: ITypeOp;
    }>()
);
