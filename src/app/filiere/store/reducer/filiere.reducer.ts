import { createReducer, on } from '@ngrx/store';
import { FiliereActions } from '../action/filiere.actions';

export const filiereFeatureKey = 'filiere';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
);

