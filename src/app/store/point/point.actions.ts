import { createAction, props } from '@ngrx/store';
import { IPoint } from '../../interfaces/pays.interface';


const prefix = '[Points]';

export const getPoint = createAction(
  `${prefix} get Point`,
  props<{
    id: number;
  }>()
);
export const getPointSuccess = createAction(
  `${getPoint.type} Success`,
  props<{
    onePoint: IPoint;
  }>()
);

export const getPoints = createAction(`${prefix} Get Points`);
export const getPointsSuccess = createAction(
  `${getPoints.type} Success`,
  props<{
    points: IPoint[];
  }>()
);

export const createPoint = createAction(
  `${prefix} Create Point`,
  props<{
    point: IPoint;
  }>()
);

export const createPointSuccess = createAction(
  `${createPoint.type} Success`,
  props<{
    point: IPoint;
  }>()
);

export const updatePoint = createAction(
  `${prefix} Update Point`,
  props<{
    point: IPoint;
  }>()
);

export const updatePointSuccess = createAction(
  `${updatePoint.type} Success`,
  props<{
    point: IPoint;
  }>()
);

export const deletePoint = createAction(
  `${prefix} Delete Point`,
  props<{
    point: IPoint;
  }>()
);
export const deletePointSuccess = createAction(
  `${deletePoint.type} Success`,
  props<{
    point: IPoint;
  }>()
);
