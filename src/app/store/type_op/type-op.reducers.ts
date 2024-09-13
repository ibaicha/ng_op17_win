import { Action, createReducer, on } from '@ngrx/store';

import { ITypeOpState } from './type-op.model';
import * as fromTypeOps from './index';
import { Actions } from '@ngrx/effects';

export const initialTypeOpState: ITypeOpState = {
    typeOps: [],
    isLoading: false
};

const reducer = createReducer<ITypeOpState>(
    initialTypeOpState,
    on(fromTypeOps.getTypeOp, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(fromTypeOps.getTypeOpSuccess, (state, { oneTypeOp }) => {
        return {
            ...state,
            isLoading: false,
            oneTypeOp
        };
    }),

    on(fromTypeOps.getTypeOps, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(fromTypeOps.getTypeOpsSuccess, (state, { typeOps }) => {
        return {
            ...state,
            isLoading: false,
            typeOps
        };
    }),
    on(fromTypeOps.createTypeOp, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromTypeOps.createTypeOpSuccess, (state, { typeOp }) => {
        return {
            ...state,
            typeOps: [...state.typeOps, typeOp],
            isLoading: false,
        };
    }),
    on(fromTypeOps.updateTypeOp, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromTypeOps.updateTypeOpSuccess, (state, { typeOp }) => {
        return {
            ...state,
            typeOps: state.typeOps.map((b) => b.id === typeOp.id ? typeOp : b),
            isLoading: false,
        };
    }),
    on(fromTypeOps.deleteTypeOp, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromTypeOps.deleteTypeOpSuccess, (state, { typeOp }) => {
        return {
            ...state,
            isLoading: false,
            typeOps: state.typeOps.filter((b) => b.id !== typeOp.id)
        };
    })
);

export function typeOpReducer(state = initialTypeOpState, actions: Action): ITypeOpState {
    return reducer(state, actions);
}
