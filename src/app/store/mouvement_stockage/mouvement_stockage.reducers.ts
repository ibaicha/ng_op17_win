import { getAllMouvementStockagesProduitCampagne } from './mouvement_stockage.actions';
import { Action, createReducer, on } from '@ngrx/store';


import * as fromMouvementStockages from './index';
import { Actions } from '@ngrx/effects';
import { IMouvementStockageState } from './mouvement_stockage.model';

export const initialMouvementStockageState: IMouvementStockageState = {
    mouvementStockages: [],
    mouvementStockagesProduitCampagne: [],
    mouvementStockagesOpProduitCampagne: [],
    isLoading: false
};

const reducer = createReducer<IMouvementStockageState>(
    initialMouvementStockageState,
    on(fromMouvementStockages.getMouvementStockage, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(fromMouvementStockages.getMouvementStockageSuccess, (state, { oneMouvementStockage }) => {
        return {
            ...state,
            isLoading: false,
            oneMouvementStockage
        };
    }),

    on(fromMouvementStockages.getMouvementStockages, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(fromMouvementStockages.getMouvementStockagesSuccess, (state, { mouvementStockages }) => {
        return {
            ...state,
            isLoading: false,
            mouvementStockages
        };
    }),



    on(fromMouvementStockages.getAllMouvementStockagesProduitCampagne, (state) => {
      return {
          ...state,
          isLoading: true
      };
  }),
  on(fromMouvementStockages.getAllMouvementStockagesProduitCampagneSuccess, (state, { mouvementStockagesProduitCampagne }) => {
      return {
          ...state,
          isLoading: false,
          mouvementStockagesProduitCampagne
      };
  }),

  on(fromMouvementStockages.getAllMouvementStockagesOpProduitCampagne, (state) => {
    return {
        ...state,
        isLoading: true
    };
}),
on(fromMouvementStockages.getAllMouvementStockagesOpProduitCampagneSuccess, (state, { mouvementStockagesOpProduitCampagne }) => {
    return {
        ...state,
        isLoading: false,
        mouvementStockagesOpProduitCampagne
    };
}),


    on(fromMouvementStockages.createMouvementStockage, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromMouvementStockages.createMouvementStockageSuccess, (state, { mouvementStockage }) => {
        return {
            ...state,
            mouvementStockages: [...state.mouvementStockages, mouvementStockage],
            isLoading: false,
        };
    }),
    on(fromMouvementStockages.updateMouvementStockage, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromMouvementStockages.updateMouvementStockageSuccess, (state, { mouvementStockage }) => {
        return {
            ...state,
            mouvementStockages: state.mouvementStockages.map((b) => b.id === mouvementStockage.id ? mouvementStockage : b),
            isLoading: false,
        };
    }),
    on(fromMouvementStockages.deleteMouvementStockage, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromMouvementStockages.deleteMouvementStockageSuccess, (state, { mouvementStockage }) => {
        return {
            ...state,
            isLoading: false,
            mouvementStockages: state.mouvementStockages.filter((b) => b.id !== mouvementStockage.id)
        };
    })
);

export function mouvementStockageReducer(state = initialMouvementStockageState, actions: Action): IMouvementStockageState {
    return reducer(state, actions);
}
