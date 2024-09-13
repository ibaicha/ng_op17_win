import { createAction, props } from '@ngrx/store';
import { IProfession } from '../../interfaces/profession.interface';

const prefix = '[Professions]';

export const getProfession = createAction(
    `${prefix} get Profession`,
    props<{
        id: number;
    }>()
);
export const getProfessionSuccess = createAction(
    `${getProfession.type} Success`,
    props<{
        oneProfession: IProfession;
    }>()
);

export const getProfessions = createAction(
    `${prefix} Get Professions`);
export const getProfessionsSuccess = createAction(
    `${getProfessions.type} Success`,
    props<{
        professions: IProfession[];
    }>()
);

export const createProfession = createAction(
    `${prefix} Create Profession`,
    props<{
        profession: IProfession;
    }>()
);

export const createProfessionSuccess = createAction(
    `${createProfession.type} Success`,
    props<{
        profession: IProfession;
    }>()
);

export const updateProfession = createAction(
    `${prefix} Update Profession`,
    props<{
        profession: IProfession;
    }>()
);

export const updateProfessionSuccess = createAction(
    `${updateProfession.type} Success`,
    props<{
        profession: IProfession;
    }>()
);

export const deleteProfession = createAction(
    `${prefix} Delete Profession`,
    props<{
        profession: IProfession;
    }>()
);
export const deleteProfessionSuccess = createAction(
    `${deleteProfession.type} Success`,
    props<{
        profession: IProfession;
    }>()
);
