import { createAction, props } from '@ngrx/store';
import { IPointAgence } from '../../interfaces/point-agence.interface';

const prefix = '[PointAgences]';

export const getPointAgence = createAction(
  `${prefix} get PointAgence`,
  props<{
    id: number;
  }>()
);
export const getPointAgenceSuccess = createAction(
  `${getPointAgence.type} Success`,
  props<{
    onePointAgence: IPointAgence;
  }>()
);

export const getPointAgences = createAction(
  `${prefix} Get PointAgences`
);
export const getPointAgencesSuccess =
  createAction(
    `${getPointAgences.type} Success`,
    props<{
      pointAgences: IPointAgence[];
    }>()
  );

export const createPointAgence = createAction(
  `${prefix} Create PointAgence`,
  props<{
    pointAgence: IPointAgence;
  }>()
);

export const createPointAgenceSuccess =
  createAction(
    `${createPointAgence.type} Success`,
    props<{
      pointAgence: IPointAgence;
    }>()
  );

export const updatePointAgence = createAction(
  `${prefix} Update PointAgence`,
  props<{
    pointAgence: IPointAgence;
  }>()
);

export const updatePointAgenceSuccess =
  createAction(
    `${updatePointAgence.type} Success`,
    props<{
      pointAgence: IPointAgence;
    }>()
  );

export const deletePointAgence = createAction(
  `${prefix} Delete PointAgence`,
  props<{
    pointAgence: IPointAgence;
  }>()
);
export const deletePointAgenceSuccess =
  createAction(
    `${deletePointAgence.type} Success`,
    props<{
      pointAgence: IPointAgence;
    }>()
  );
