import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IFiliereState } from './filiere.model';

export const selectFiliereState = createFeatureSelector<IFiliereState>('filiere');
export const selectFilieresList = createSelector(selectFiliereState, (state) => state.filieres);
export const selectFiliereIsLoading = createSelector(selectFiliereState, (state) => state.isLoading);


export const selectFiliereById = (itemId: number) => createSelector(selectFiliereState, (state) => state.filieres.find((item) => item.id === itemId));