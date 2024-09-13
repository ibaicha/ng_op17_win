import { IPersonne } from '../../interfaces/personne.interface';

export interface IPersonneState {
    personnes: IPersonne[];
    isLoading: boolean;
}
