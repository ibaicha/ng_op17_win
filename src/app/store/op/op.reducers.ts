import { Action, createReducer, on } from '@ngrx/store';

import { IOpState } from './op.model';
import * as fromOps from './index';
import { Actions } from '@ngrx/effects';

export const initialOpState: IOpState = {
    ops: [],
    opsCustomFromAgences: [],
    opWithFilters: [],
    isLoading: false
};

const reducer = createReducer<IOpState>(
    initialOpState,
    on(fromOps.getOp, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(fromOps.getOpSuccess, (state, { oneOp }) => {
        return {
            ...state,
            isLoading: false,
            oneOp
        };
    }),

    on(fromOps.getOps, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(fromOps.getOpsSuccess, (state, { ops }) => {
        return {
            ...state,
            isLoading: false,
            ops
        };
    }),
/// CUSTOM

on(fromOps.getAllOpsCustomFromAgence, (state) => {
  return {
      ...state,
      isLoading: true
  };
}),
on(fromOps.getAllOpsCustomFromAgenceSuccess, (state, { opsCustomFromAgences }) => {
  return {
      ...state,
      isLoading: false,
      opsCustomFromAgences
  };
}),


on(fromOps.getAllOpWithFilters, (state) => {
  return {
    ...state,
    isLoading: true,
  };
}),
on(
  fromOps.getAllOpWithFiltersSuccess,
  (state, { opWithFilters }) => {
    return {
      ...state,
      isLoading: false,
      opWithFilters,
    };
  }
),



/// END CUSTOM





    on(fromOps.createOp, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromOps.createOpSuccess, (state, { op }) => {
        return {
            ...state,
            ops: [...state.ops, op],
            isLoading: false,
        };
    }),
    on(fromOps.updateOp, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromOps.updateOpSuccess, (state, { op }) => {
        return {
            ...state,
            ops: state.ops.map((b) => b.id === op.id ? op : b),
            isLoading: false,
        };
    }),
    on(fromOps.deleteOp, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromOps.deleteOpSuccess, (state, { op }) => {
        return {
            ...state,
            isLoading: false,
            ops: state.ops.filter((b) => b.id !== op.id)
        };
    })
);

export function opReducer(state = initialOpState, actions: Action): IOpState {
    return reducer(state, actions);
}
