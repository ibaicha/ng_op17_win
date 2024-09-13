import { IProduit } from '../../interfaces/filiere.interface';

export interface IProduitState {
    produits: IProduit[];
    isLoading: boolean;
}
