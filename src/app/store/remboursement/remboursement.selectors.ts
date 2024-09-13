import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IRemboursementState } from './remboursement.model';

export const selectRemboursementState = createFeatureSelector<IRemboursementState>('remboursement');
export const selectRemboursementsList = createSelector(selectRemboursementState, (state) => state.remboursements);
export const selectRemboursementIsLoading = createSelector(selectRemboursementState, (state) => state.isLoading);


export const selectRemboursementById = (itemId: number) => createSelector(selectRemboursementState, (state) => state.remboursements.find((item) => item.id === itemId));

export const selectRemboursementsListFromExploitation = (idExploitation: number) =>
createSelector(
  createFeatureSelector<IRemboursementState>('remboursement'), 
  (state) => {
    if (state && state.remboursements) {
        // return state.remboursements;
        const remboursements = state.remboursements.filter(remboursement => remboursement.exploitationId === idExploitation);
        // console.log('remboursements since selector ' + idExploitation, remboursements);
      return remboursements;
    } else {
      return []; 
    }
  }
);