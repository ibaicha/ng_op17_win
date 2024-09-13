import { createAction, props } from '@ngrx/store';
import { IMouvementStockage} from '../../interfaces/credit.interface';

const prefix = '[MouvementStockages]';

export const getMouvementStockage= createAction(
    `${prefix} get MouvementStockage`,
    props<{
        id: number;
    }>()
);
export const getMouvementStockageSuccess = createAction(
    `${getMouvementStockage.type} Success`,
    props<{
        oneMouvementStockage: IMouvementStockage;
    }>()
);

export const getMouvementStockages = createAction(
    `${prefix} Get MouvementStockages`);

export const getMouvementStockagesSuccess = createAction(
    `${getMouvementStockages.type} Success`,
    props<{
        mouvementStockages: IMouvementStockage[];
    }>()
);

export const getAllMouvementStockagesProduitCampagne = createAction(
  `${prefix} Get MouvementStockagesProduitCampagne`,
  props<{
    produitId: number;
    anneeId: number;
    saisonId: number;
  } >());

  export const getAllMouvementStockagesProduitCampagneSuccess = createAction(
    `${getAllMouvementStockagesProduitCampagne.type} Success`,
    props<{
      mouvementStockagesProduitCampagne: IMouvementStockage[];
    }>()
  );

  export const getAllMouvementStockagesOpProduitCampagne = createAction(
    `${prefix} Get MouvementStockagesOpProduitCampagne`,
    props<{
      opId: number;
      produitId: number;
      anneeId: number;
      saisonId: number;
    } >());
    export const getAllMouvementStockagesOpProduitCampagneSuccess = createAction(
      `${getAllMouvementStockagesOpProduitCampagne.type} Success`,
      props<{
        mouvementStockagesOpProduitCampagne: IMouvementStockage[];
      }>()
    );



export const createMouvementStockage= createAction(
    `${prefix} Create MouvementStockage`,
    props<{
        mouvementStockage: IMouvementStockage;
    }>()
);

export const createMouvementStockageSuccess = createAction(
    `${createMouvementStockage.type} Success`,
    props<{
        mouvementStockage: IMouvementStockage;
    }>()
);

export const updateMouvementStockage= createAction(
    `${prefix} Update MouvementStockage`,
    props<{
        mouvementStockage: IMouvementStockage;
    }>()
);

export const updateMouvementStockageSuccess = createAction(
    `${updateMouvementStockage.type} Success`,
    props<{
        mouvementStockage: IMouvementStockage;
    }>()
);

export const deleteMouvementStockage= createAction(
    `${prefix} Delete MouvementStockage`,
    props<{
        mouvementStockage: IMouvementStockage;
    }>()
);
export const deleteMouvementStockageSuccess = createAction(
    `${deleteMouvementStockage.type} Success`,
    props<{
        mouvementStockage: IMouvementStockage;
    }>()
);
