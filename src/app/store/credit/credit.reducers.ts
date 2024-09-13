import { Action, createReducer, on } from '@ngrx/store';

import { ICreditState } from './credit.model';
import * as fromCredits from './index';
import { Actions } from '@ngrx/effects';

export const initialCreditState: ICreditState = {
  credits: [],
  creditsCustom: [],
  customCreditAgenceVarieteAnneeSaison: [],
  customCreditSocieteVarieteAnneeSaison: [],
  exploitationCredits: [],
  creditWithFilters: [],
  isLoading: false,
};

const reducer = createReducer<ICreditState>(
  initialCreditState,
  on(fromCredits.getCredit, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(fromCredits.getCreditSuccess, (state, { oneCredit }) => {
    return {
      ...state,
      isLoading: false,
      oneCredit,
    };
  }),

  on(fromCredits.getCredits, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(fromCredits.getCreditsSuccess, (state, { credits }) => {
    return {
      ...state,
      isLoading: false,
      credits,
    };
  }),

  /* **** CUSTOM ****** */

  on(fromCredits.getCreditsCustom, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(fromCredits.getCreditsCustomSuccess, (state, { creditsCustom }) => {
    return {
      ...state,
      isLoading: false,
      creditsCustom,
    };
  }),

  on(fromCredits.createExploitationCredit, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(
    fromCredits.createExploitationCreditSuccess,
    (state, { exploitationCredit }) => {
      return {
        ...state,
        exploitationCredits: [...state.exploitationCredits, exploitationCredit],
        isLoading: false,
      };
    }
  ),

  on(fromCredits.getAllCustomCreditAgenceVarieteAnneeSaison, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(
    fromCredits.getAllCustomCreditAgenceVarieteAnneeSaisonSuccess,
    (state, { customCreditAgenceVarieteAnneeSaison }) => {
      return {
        ...state,
        isLoading: false,
        customCreditAgenceVarieteAnneeSaison,
      };
    }
  ),

  on(fromCredits.getAllCustomCreditSocieteVarieteAnneeSaison, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(
    fromCredits.getAllCustomCreditSocieteVarieteAnneeSaisonSuccess,
    (state, { customCreditSocieteVarieteAnneeSaison }) => {
      return {
        ...state,
        isLoading: false,
        customCreditSocieteVarieteAnneeSaison,
      };
    }
  ),

  /*** CUSTOM */

  on(fromCredits.createCredit, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(fromCredits.createCreditSuccess, (state, { credit }) => {
    return {
      ...state,
      credits: [...state.credits, credit],
      isLoading: false,
    };
  }),

  on(fromCredits.getAllCreditWithFilters, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(
    fromCredits.getAllCreditWithFiltersSuccess,
    (state, { creditWithFilters }) => {
      return {
        ...state,
        isLoading: false,
        creditWithFilters,
      };
    }
  ),



  on(fromCredits.updateCredit, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(fromCredits.updateCreditSuccess, (state, { credit }) => {
    return {
      ...state,
      credits: state.credits.map((b) => (b.id === credit.id ? credit : b)),
      isLoading: false,
    };
  }),

  on(fromCredits.deleteCredit, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(fromCredits.deleteCreditSuccess, (state, { credit }) => {
    return {
      ...state,
      isLoading: false,
      credits: state.credits.filter((b) => b.id !== credit.id),
    };
  })
);

export function creditReducer(
  state = initialCreditState,
  actions: Action
): ICreditState {
  return reducer(state, actions);
}
