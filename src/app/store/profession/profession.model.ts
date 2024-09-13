import { IProfession } from '../../interfaces/profession.interface';

export interface IProfessionState {
    professions: IProfession[];
    isLoading: boolean;
}
