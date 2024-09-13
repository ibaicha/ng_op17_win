import { createAction, props } from '@ngrx/store';
import { IOp, IOpCustom } from '../../interfaces/op.interface';

const prefix = '[Ops]';

export const getOp = createAction(
  `${prefix} get Op`,
  props<{
    id: number;
  }>()
);
export const getOpSuccess = createAction(
  `${getOp.type} Success`,
  props<{
    oneOp: IOp;
  }>()
);

export const getOps = createAction(`${prefix} Get Ops`);
export const getOpsSuccess = createAction(
  `${getOps.type} Success`,
  props<{
    ops: IOp[];
  }>()
);

//////////////////////////////////////

export const getAllOpWithFilters = createAction(
  `${prefix} Get GetAllOpWithFilters`,
  props<{ filter: any }>()
);

export const getAllOpWithFiltersSuccess = createAction(
  `${getAllOpWithFilters.type} Success`,
  props<{
    opWithFilters: IOpCustom[];
  }>()
);

//////////////////////////////////////

export const getAllOpsCustomFromAgence = createAction(
  `${prefix} Get AllOpsCustomFromAgence`,
  props<{
    agenceId: number;
  }>()
);
export const getAllOpsCustomFromAgenceSuccess = createAction(
  `${getAllOpsCustomFromAgence.type} Success`,
  props<{
    opsCustomFromAgences: IOp[];
  }>()
);

export const createOp = createAction(
  `${prefix} Create Op`,
  props<{
    op: IOp;
  }>()
);

export const createOpSuccess = createAction(
  `${createOp.type} Success`,
  props<{
    op: IOp;
  }>()
);

export const updateOp = createAction(
  `${prefix} Update Op`,
  props<{
    op: IOp;
  }>()
);

export const updateOpSuccess = createAction(
  `${updateOp.type} Success`,
  props<{
    op: IOp;
  }>()
);

export const deleteOp = createAction(
  `${prefix} Delete Op`,
  props<{
    op: IOp;
  }>()
);
export const deleteOpSuccess = createAction(
  `${deleteOp.type} Success`,
  props<{
    op: IOp;
  }>()
);
