import { createAction, props } from '@ngrx/store';
import { ICampagne } from '../../interfaces/campagne.interface';

const prefix = '[Campagnes]';

export const getCampagne = createAction(
    `${prefix} get Campagne`,
    props<{
        id: number;
    }>()
);
export const getCampagneSuccess = createAction(
    `${getCampagne.type} Success`,
    props<{
        oneCampagne: ICampagne;
    }>()
);

export const getCampagnes = createAction(
    `${prefix} Get Campagnes`);
export const getCampagnesSuccess = createAction(
    `${getCampagnes.type} Success`,
    props<{
        campagnes: ICampagne[];
    }>()
);

export const createCampagne = createAction(
    `${prefix} Create Campagne`,
    props<{
        campagne: ICampagne;
    }>()
);

export const createCampagneSuccess = createAction(
    `${createCampagne.type} Success`,
    props<{
        campagne: ICampagne;
    }>()
);

export const updateCampagne = createAction(
    `${prefix} Update Campagne`,
    props<{
        campagne: ICampagne;
    }>()
);

export const updateCampagneSuccess = createAction(
    `${updateCampagne.type} Success`,
    props<{
        campagne: ICampagne;
    }>()
);

export const deleteCampagne = createAction(
    `${prefix} Delete Campagne`,
    props<{
        campagne: ICampagne;
    }>()
);
export const deleteCampagneSuccess = createAction(
    `${deleteCampagne.type} Success`,
    props<{
        campagne: ICampagne;
    }>()
);
