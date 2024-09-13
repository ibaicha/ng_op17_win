import { createAction, props } from '@ngrx/store';
import { IMouvementIntrant } from '../../interfaces/mouvement-intrant.interface';
import { IIdentifiant } from '../../interfaces/identifiant.interface';

const prefix = '[MouvementIntrants]';

export const getMouvementIntrant = createAction(
  `${prefix} get MouvementIntrant`,
  props<{
    id: number;
  }>()
);
export const getMouvementIntrantSuccess = createAction(
  `${getMouvementIntrant.type} Success`,
  props<{
    oneMouvementIntrant: IMouvementIntrant;
  }>()
);

export const getMouvementIntrants = createAction(
  `${prefix} Get MouvementIntrants`
);

export const getMouvementIntrantsSuccess = createAction(
  `${getMouvementIntrants.type} Success`,
  props<{
    mouvementIntrants: IMouvementIntrant[];
  }>()
);

export const getAllMouvementIntrantWithFilters = createAction(
  `${prefix} Get GetAllMouvementIntrantWithFilters`,
  props<{ filter: any }>()
);

export const getAllMouvementIntrantWithFiltersSuccess = createAction(
  `${getAllMouvementIntrantWithFilters.type} Success`,
  props<{
    mouvementIntrantWithFilters: IMouvementIntrant[];
  }>()
);

////////////////////////
export const getAllIdentifiantsWithFilters = createAction(
  `${prefix} Get GetAllIdentifiantstWithFilters`,
  props<{ filter: any }>()
);

export const getAllIdentifiantsWithFiltersSuccess = createAction(
  `${getAllIdentifiantsWithFilters.type} Success`,
  props<{
    identifiantsWithFilters: IIdentifiant[];
  }>()
);

////////////////////////

export const createMouvementIntrant = createAction(
  `${prefix} Create MouvementIntrant`,
  props<{
    mouvementIntrant: IMouvementIntrant;
  }>()
);

export const createMouvementIntrantSuccess = createAction(
  `${createMouvementIntrant.type} Success`,
  props<{
    mouvementIntrant: IMouvementIntrant;
  }>()
);

export const updateMouvementIntrant = createAction(
  `${prefix} Update MouvementIntrant`,
  props<{
    mouvementIntrant: IMouvementIntrant;
  }>()
);

export const updateMouvementIntrantSuccess = createAction(
  `${updateMouvementIntrant.type} Success`,
  props<{
    mouvementIntrant: IMouvementIntrant;
  }>()
);

export const deleteMouvementIntrant = createAction(
  `${prefix} Delete MouvementIntrant`,
  props<{
    mouvementIntrant: IMouvementIntrant;
  }>()
);
export const deleteMouvementIntrantSuccess = createAction(
  `${deleteMouvementIntrant.type} Success`,
  props<{
    mouvementIntrant: IMouvementIntrant;
  }>()
);
