import { createAction, props } from '@ngrx/store';
import { IIdentifiant } from '../../interfaces/identifiant.interface';


const prefix = '[Identifiants]';

export const getIdentifiant = createAction(
  `${prefix} get Identifiant`,
  props<{
    id: number;
  }>()
);
export const getIdentifiantSuccess = createAction(
  `${getIdentifiant.type} Success`,
  props<{
    oneIdentifiant: IIdentifiant;
  }>()
);

export const getIdentifiants = createAction(
  `${prefix} Get Identifiants`
);

export const getIdentifiantsSuccess = createAction(
  `${getIdentifiants.type} Success`,
  props<{
    identifiants: IIdentifiant[];
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
    identifiantWithFilters: IIdentifiant[];
  }>()
);

////////////////////////

export const createIdentifiant = createAction(
  `${prefix} Create Identifiant`,
  props<{
    identifiant: IIdentifiant;
  }>()
);

export const createIdentifiantSuccess = createAction(
  `${createIdentifiant.type} Success`,
  props<{
    identifiant: IIdentifiant;
  }>()
);

export const updateIdentifiant = createAction(
  `${prefix} Update Identifiant`,
  props<{
    identifiant: IIdentifiant;
  }>()
);

export const updateIdentifiantSuccess = createAction(
  `${updateIdentifiant.type} Success`,
  props<{
    identifiant: IIdentifiant;
  }>()
);

export const deleteIdentifiant = createAction(
  `${prefix} Delete Identifiant`,
  props<{
    identifiant: IIdentifiant;
  }>()
);
export const deleteIdentifiantSuccess = createAction(
  `${deleteIdentifiant.type} Success`,
  props<{
    identifiant: IIdentifiant;
  }>()
);
