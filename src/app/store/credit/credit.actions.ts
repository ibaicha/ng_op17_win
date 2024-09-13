import { createAction, props } from '@ngrx/store';
import { ICredit, ICreditCustom, IExploitationCredit} from '../../interfaces/credit.interface';
import { IClient } from '../../interfaces/client.interface';

const prefix = '[Credits]';

export const getCredit = createAction(
    `${prefix} get Credit`,
    props<{
        id: number;
    }>()
);
export const getCreditSuccess = createAction(
    `${getCredit.type} Success`,
    props<{
        oneCredit: ICredit;
    }>()
);


export const getCredits = createAction(
    `${prefix} Get Credits`);
export const getCreditsSuccess = createAction(
    `${getCredits.type} Success`,
    props<{
        credits: ICredit[];
    }>()
);

export const getCreditsCustom = createAction(
    `${prefix} Get Credits`);
export const getCreditsCustomSuccess = createAction(
    `${getCreditsCustom.type} Success`,
    props<{
        creditsCustom: ICreditCustom[];
    }>()
);


export const getAllCreditWithFilters = createAction(
  `${prefix} Get GetAllCreditWithFilters`,
  props<{ filter: any }>()
);

export const getAllCreditWithFiltersSuccess = createAction(
  `${getAllCreditWithFilters.type} Success`,
  props<{
    creditWithFilters: ICreditCustom[];
  }>()
);
 


export const getAllCustomCreditAgenceVarieteAnneeSaison = createAction(
  `${prefix} Get CustomCreditAgenceVarieteAnneeSaison`,
  props<{
    agenceSocieteId: number;
    produitId: number;
    anneeId: number;
    saisonId: number;
  } >());
  export const getAllCustomCreditAgenceVarieteAnneeSaisonSuccess = createAction(
    `${getAllCustomCreditAgenceVarieteAnneeSaison.type} Success`,
    props<{
      customCreditAgenceVarieteAnneeSaison: ICreditCustom[];
    }>()
  );




  export const getAllCustomCreditSocieteVarieteAnneeSaison = createAction(
    `${prefix} Get CustomCreditSocieteVarieteAnneeSaison`,
    props<{
      etablissementId: number;
      produitId: number;
      anneeId: number;
      saisonId: number;
    } >());
    export const getAllCustomCreditSocieteVarieteAnneeSaisonSuccess = createAction(
      `${getAllCustomCreditSocieteVarieteAnneeSaison.type} Success`,
      props<{
        customCreditSocieteVarieteAnneeSaison: ICreditCustom[];
      }>()
    );


export const createCredit = createAction(
    `${prefix} Create Credit`,
    /*
    props<{
        credit: ICredit;
    }>()
    */
    props<{ body: any }>()
);

export const createCreditSuccess = createAction(
    `${createCredit.type} Success`,
    props<{
        credit: ICredit;
    }>()
);

/*
export const createExploitationCredit = createAction(
    `${prefix} Create Exploitation Credit `,
    props<{
        exploitationCredit: IExploitationCredit;
    }>()
);
*/


    export const createExploitationCredit = createAction(
        `${prefix} Create Exploitation Credit `,
        props<{ body: any }>()
    );

export const createExploitationCreditSuccess = createAction(
    `${createExploitationCredit.type} Success`,
    props<{
        exploitationCredit: IExploitationCredit;
    }>()
);





export const updateCredit = createAction(
    `${prefix} Update Credit`,
    /*
    props<{
        credit: ICredit;
    }>()
    */
    props<{ body: any }>()
);

export const updateCreditSuccess = createAction(
    `${updateCredit.type} Success`,
    props<{
        credit: ICredit;
    }>()
);

export const deleteCredit = createAction(
    `${prefix} Delete Credit`,
    /*
    props<{
        credit: ICredit;
    }>()
    */
    props<{ body: any }>()
);
export const deleteCreditSuccess = createAction(
    `${deleteCredit.type} Success`,
    props<{
        credit: ICredit;
    }>()
);
