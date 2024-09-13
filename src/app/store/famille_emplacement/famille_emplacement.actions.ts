import { createAction, props } from '@ngrx/store';
import { IFamilleEmplacement } from '../../interfaces/filiere.interface';

const prefix = '[FamilleEmplacements]';

export const getFamilleEmplacement = createAction(
    `${prefix} get FamilleEmplacement`,
    props<{
        id: number;
    }>()
);
export const getFamilleEmplacementSuccess = createAction(
    `${getFamilleEmplacement.type} Success`,
    props<{
        oneFamilleEmplacement: IFamilleEmplacement;
    }>()
);

export const getFamilleEmplacements = createAction(
    `${prefix} Get FamilleEmplacements`);
export const getFamilleEmplacementsSuccess = createAction(
    `${getFamilleEmplacements.type} Success`,
    props<{
        familleEmplacements: IFamilleEmplacement[];
    }>()
);

export const createFamilleEmplacement = createAction(
    `${prefix} Create FamilleEmplacement`,
    props<{
        familleEmplacement: IFamilleEmplacement;
    }>()
);

export const createFamilleEmplacementSuccess = createAction(
    `${createFamilleEmplacement.type} Success`,
    props<{
        familleEmplacement: IFamilleEmplacement;
    }>()
);

export const updateFamilleEmplacement = createAction(
    `${prefix} Update FamilleEmplacement`,
    props<{
        familleEmplacement: IFamilleEmplacement;
    }>()
);

export const updateFamilleEmplacementSuccess = createAction(
    `${updateFamilleEmplacement.type} Success`,
    props<{
        familleEmplacement: IFamilleEmplacement;
    }>()
);

export const deleteFamilleEmplacement = createAction(
    `${prefix} Delete FamilleEmplacement`,
    props<{
        familleEmplacement: IFamilleEmplacement;
    }>()
);
export const deleteFamilleEmplacementSuccess = createAction(
    `${deleteFamilleEmplacement.type} Success`,
    props<{
        familleEmplacement: IFamilleEmplacement;
    }>()
);
