import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ICreditState } from './credit.model';
import { IOp } from '../../interfaces/op.interface';
import { ICreditCustom } from '../../interfaces/credit.interface';
import { IClient } from '../../interfaces/client.interface';

export const selectCreditState = createFeatureSelector<ICreditState>('credit'); // selectFeature
export const selectCreditsList = createSelector(
  selectCreditState,
  (state) => state.credits
);
export const selectCreditIsLoading = createSelector(
  selectCreditState,
  (state) => state.isLoading
);
export const selecCustomCreditAgenceVarieteAnneeSaisonList = createSelector(
  selectCreditState,
  (state) => state.customCreditAgenceVarieteAnneeSaison
);
export const selecCustomCreditSocieteVarieteAnneeSaisonList = createSelector(
  selectCreditState,
  (state) => state.customCreditSocieteVarieteAnneeSaison
);

export const selectCreditById = (itemId: number) =>
  createSelector(selectCreditState, (state) =>
    state.credits.find((item) => item.id === itemId)
  );

export const selectCreditsCustomListFromClient = (client: IClient) =>
  createSelector(
    createFeatureSelector<ICreditState>('credit'), // Utilisez createFeatureSelector pour accéder à votre état
    (state) => {
      if (state && state.creditsCustom) {
        return state.creditsCustom.filter(
          (credit) => credit.exploitationOpId === client.id
        );
      } else {
        return [];
      }
    }
  );

export const selectCreditsCustomListFromAgenceAnneeSaison = (
  idAgence: number,
  idAnnee: number,
  idSaison: number
) =>
  createSelector(createFeatureSelector<ICreditState>('credit'), (state) => {
    if (state && state.creditsCustom) {
      return state.creditsCustom.filter(
        (credit) =>
          credit.agenceId === idAgence &&
          credit.exploitationAnneeId === idAnnee &&
          credit.exploitationSaisonId === idSaison
      );
    } else {
      return [];
    }
  });
export const selectCreditsCustomListFromAgence = (
  idAgence: number,
  idAnnee: number,
  idSaison: number
) =>
  createSelector(createFeatureSelector<ICreditState>('credit'), (state) => {
    if (state && state.creditsCustom) {
      return state.creditsCustom.filter(
        (credit) =>
          credit.agenceId === idAgence &&
          credit.exploitationAnneeId === idAnnee &&
          credit.exploitationSaisonId === idSaison
      );
    } else {
      return [];
    }
  });
export const selectCreditsCustomListFromPoint = (idPoint: number) =>
  createSelector(createFeatureSelector<ICreditState>('credit'), (state) => {
    if (state && state.creditsCustom) {
      return state.creditsCustom.filter(
        (credit) => credit.exploitationOpPointId === idPoint
      );
    } else {
      return [];
    }
  });
export const selectCreditsCustomListFromPointAnneeSaison = (
  idPoint: number,
  idAnnee: number,
  idSaison: number
) =>
  createSelector(createFeatureSelector<ICreditState>('credit'), (state) => {
    if (state && state.creditsCustom) {
      return state.creditsCustom.filter(
        (credit) =>
          credit.exploitationOpPointId === idPoint &&
          credit.exploitationAnneeId === idAnnee &&
          credit.exploitationSaisonId === idSaison
      );
    } else {
      return [];
    }
  });
export const sumCapitalsFromPoint = (
  idPoint: number,
  idAnnee: number,
  idSaison: number
) =>
  createSelector(createFeatureSelector<ICreditState>('credit'), (state) => {
    if (state && state.creditsCustom) {
      const credits = state.creditsCustom.filter(
        (credit) =>
          credit.exploitationOpPointId === idPoint &&
          credit.exploitationAnneeId === idAnnee &&
          credit.exploitationSaisonId === idSaison
      );
      return credits.reduce((sum, credit) => sum + credit.capital, 0);
    } else {
      return 0;
    }
  });

export const selectCreditWithFiltersList = createSelector(
  selectCreditState,
  (state) => state.creditWithFilters
);

export const sumMoratoiresFromPoint = (
  idPoint: number,
  idAnnee: number,
  idSaison: number
) =>
  createSelector(createFeatureSelector<ICreditState>('credit'), (state) => {
    if (state && state.creditsCustom) {
      const encours = state.creditsCustom.filter(
        (credit) =>
          credit.exploitationOpPointId === idPoint &&
          credit.exploitationAnneeId === idAnnee &&
          credit.exploitationSaisonId === idSaison
      );
      return encours.reduce((sum, credit) => sum + credit.moratoire, 0);
    } else {
      return 0;
    }
  });

export const sumInteretsFromPoint = (
  idPoint: number,
  idAnnee: number,
  idSaison: number
) =>
  createSelector(createFeatureSelector<ICreditState>('credit'), (state) => {
    if (state && state.creditsCustom) {
      const interet = state.creditsCustom.filter(
        (credit) =>
          credit.exploitationOpPointId === idPoint &&
          credit.exploitationAnneeId === idAnnee &&
          credit.exploitationSaisonId === idSaison
      );
      return interet.reduce((sum, credit) => sum + credit.interet, 0);
    } else {
      return 0;
    }
  });

export const sumAutresEngagementsFromPoint = (
  idPoint: number,
  idAnnee: number,
  idSaison: number
) =>
  createSelector(createFeatureSelector<ICreditState>('credit'), (state) => {
    if (state && state.creditsCustom) {
      const interet = state.creditsCustom.filter(
        (credit) =>
          credit.exploitationOpPointId === idPoint &&
          credit.exploitationAnneeId === idAnnee &&
          credit.exploitationSaisonId === idSaison
      );
      return interet.reduce(
        (sum, credit) => sum + credit.autres_engagements,
        0
      );
    } else {
      return 0;
    }
  });

export const sumExigibleFromPoint = (
  idPoint: number,
  idAnnee: number,
  idSaison: number
) =>
  createSelector(createFeatureSelector<ICreditState>('credit'), (state) => {
    if (state && state.creditsCustom) {
      const credits = state.creditsCustom.filter(
        (credit) =>
          credit.exploitationOpPointId === idPoint &&
          credit.exploitationAnneeId === idAnnee &&
          credit.exploitationSaisonId === idSaison
      );

      const capitalsSum = credits.reduce(
        (sum, credit) => sum + credit.capital,
        0
      );
      const moratoiresSum = credits.reduce(
        (sum, credit) => sum + credit.moratoire,
        0
      );
      const interetsSum = credits.reduce(
        (sum, credit) => sum + credit.interet,
        0
      );
      const autresEngagementsSum = credits.reduce(
        (sum, credit) => sum + credit.autres_engagements,
        0
      );

      return capitalsSum + moratoiresSum + interetsSum + autresEngagementsSum;
    } else {
      return 0;
    }
  });

export const sumCapitalsFromAgence = (
  idAgence: number,
  idAnnee: number,
  idSaison: number
) =>
  createSelector(createFeatureSelector<ICreditState>('credit'), (state) => {
    if (state && state.creditsCustom) {
      const credits = state.creditsCustom.filter(
        (credit) =>
          credit.agenceId === idAgence &&
          credit.exploitationAnneeId === idAnnee &&
          credit.exploitationSaisonId === idSaison
      );
      return credits.reduce((sum, credit) => sum + credit.capital, 0);
    } else {
      return 0;
    }
  });

export const sumMoratoiresFromAgence = (
  idAgence: number,
  idAnnee: number,
  idSaison: number
) =>
  createSelector(createFeatureSelector<ICreditState>('credit'), (state) => {
    if (state && state.creditsCustom) {
      const encours = state.creditsCustom.filter(
        (credit) =>
          credit.agenceId === idAgence &&
          credit.exploitationAnneeId === idAnnee &&
          credit.exploitationSaisonId === idSaison
      );
      return encours.reduce((sum, credit) => sum + credit.moratoire, 0);
    } else {
      return 0;
    }
  });

export const sumInteretsFromAgence = (
  idAgence: number,
  idAnnee: number,
  idSaison: number
) =>
  createSelector(createFeatureSelector<ICreditState>('credit'), (state) => {
    if (state && state.creditsCustom) {
      const interet = state.creditsCustom.filter(
        (credit) =>
          credit.agenceId === idAgence &&
          credit.exploitationAnneeId === idAnnee &&
          credit.exploitationSaisonId === idSaison
      );
      return interet.reduce((sum, credit) => sum + credit.interet, 0);
    } else {
      return 0;
    }
  });

export const sumAutresEngagementsFromAgence = (
  idAgence: number,
  idAnnee: number,
  idSaison: number
) =>
  createSelector(createFeatureSelector<ICreditState>('credit'), (state) => {
    if (state && state.creditsCustom) {
      const interet = state.creditsCustom.filter(
        (credit) =>
          credit.agenceId === idAgence &&
          credit.exploitationAnneeId === idAnnee &&
          credit.exploitationSaisonId === idSaison
      );
      return interet.reduce(
        (sum, credit) => sum + credit.autres_engagements,
        0
      );
    } else {
      return 0;
    }
  });

export const sumExigibleFromAgence = (
  idAgence: number,
  idAnnee: number,
  idSaison: number
) =>
  createSelector(createFeatureSelector<ICreditState>('credit'), (state) => {
    if (state && state.creditsCustom) {
      const credits = state.creditsCustom.filter(
        (credit) =>
          credit.agenceId === idAgence &&
          credit.exploitationAnneeId === idAnnee &&
          credit.exploitationSaisonId === idSaison
      );

      const capitalsSum = credits.reduce(
        (sum, credit) => sum + credit.capital,
        0
      );
      const moratoiresSum = credits.reduce(
        (sum, credit) => sum + credit.moratoire,
        0
      );
      const interetsSum = credits.reduce(
        (sum, credit) => sum + credit.interet,
        0
      );
      const autresEngagementsSum = credits.reduce(
        (sum, credit) => sum + credit.autres_engagements,
        0
      );

      return capitalsSum + moratoiresSum + interetsSum + autresEngagementsSum;
    } else {
      return 0;
    }
  });
