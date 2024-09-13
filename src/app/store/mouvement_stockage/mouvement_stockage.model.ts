import { IMouvementStockage } from '../../interfaces/credit.interface';

export interface IMouvementStockageState {
    mouvementStockages: IMouvementStockage[];
    mouvementStockagesProduitCampagne: IMouvementStockage[];
    mouvementStockagesOpProduitCampagne: IMouvementStockage[];
    isLoading: boolean;
}
