import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IMouvementStockageState } from './mouvement_stockage.model';



export const selectMouvementStockageState = createFeatureSelector<IMouvementStockageState>('mouvementStockage');
export const selectMouvementStockagesList = createSelector(selectMouvementStockageState, (state) => state.mouvementStockages);
export const selectMouvementStockageIsLoading = createSelector(selectMouvementStockageState, (state) => state.isLoading);

export const selectMouvementStockagesProduitCampagneList = createSelector(selectMouvementStockageState, (state) => state.mouvementStockagesProduitCampagne);
export const selectMouvementStockagesOpProduitCampagneList = createSelector(selectMouvementStockageState, (state) => state.mouvementStockagesOpProduitCampagne);

export const selectMouvementStockageById = (itemId: number) => createSelector(selectMouvementStockageState, (state) => state.mouvementStockages.find((item) => item.id === itemId));

 /*
export const selectMouvementStockagesListFromExploitation = (idExploitation: number) =>
createSelector(
  createFeatureSelector<IMouvementStockageState>('mouvementStockage'),
  (state) => {
    if (state && state.mouvementStockages) {
        // return state.mouvementStockages;
        const mouvementStockages = state.mouvementStockages.filter(mouvementStockage => mouvementStockage.exploitationId === idExploitation);
        // console.log('mouvementStockages since selector ' + idExploitation, mouvementStockages);
      return mouvementStockages;
    } else {
      return [];
    }
  }
);
*/
