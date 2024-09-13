import { Action, createReducer, on } from '@ngrx/store';

import { ICreditCustomState } from './creditCustom.model';
import * as fromCreditCustoms from './index';
import { Actions } from '@ngrx/effects';

export const initialCreditCustomState: ICreditCustomState = {
    creditCustoms: [],
    isLoading: false
};

const reducer = createReducer<ICreditCustomState>(
    initialCreditCustomState,
    on(fromCreditCustoms.getCreditCustom, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(fromCreditCustoms.getCreditCustomSuccess, (state, { oneCreditCustom }) => {
        return {
            ...state,
            isLoading: false,
            oneCreditCustom
        };
    }),

    on(fromCreditCustoms.getCreditCustoms, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(fromCreditCustoms.getCreditCustomsSuccess, (state, { creditCustoms }) => {
        return {
            ...state,
            isLoading: false,
            creditCustoms
        };
    }),
  
  
   
  
 
);

export function creditCustomReducer(state = initialCreditCustomState, actions: Action): ICreditCustomState {
    return reducer(state, actions);
}
