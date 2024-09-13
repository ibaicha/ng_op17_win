import { ISaison } from '../../interfaces/saison.interface';

export interface ISaisonState {
    saisons: ISaison[];
    isLoading: boolean;
}
