import { Action, createReducer, on } from '@ngrx/store';


import * as fromMouvementIntrants from './index';
import { Actions } from '@ngrx/effects';
import { IMouvementIntrantState } from './mouvement_intrant.model';

export const initialMouvementIntrantState: IMouvementIntrantState = {
    mouvementIntrants: [],
    mouvementIntrantWithFilters: [],
    isLoading: false
};

const reducer = createReducer<IMouvementIntrantState>(
    initialMouvementIntrantState,
    on(fromMouvementIntrants.getMouvementIntrant, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(fromMouvementIntrants.getMouvementIntrantSuccess, (state, { oneMouvementIntrant }) => {
        return {
            ...state,
            isLoading: false,
            oneMouvementIntrant
        };
    }),

    on(fromMouvementIntrants.getMouvementIntrants, (state) => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(fromMouvementIntrants.getMouvementIntrantsSuccess, (state, { mouvementIntrants }) => {
        return {
            ...state,
            isLoading: false,
            mouvementIntrants
        };
    }),



    on(fromMouvementIntrants.getAllMouvementIntrantWithFilters, (state) => {
      return {
          ...state,
          isLoading: true
      };
  }),
  on(fromMouvementIntrants.getAllMouvementIntrantWithFiltersSuccess, (state, { mouvementIntrantWithFilters }) => {
      return {
          ...state,
          isLoading: false,
          mouvementIntrantWithFilters
      };
  }),


    on(fromMouvementIntrants.createMouvementIntrant, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromMouvementIntrants.createMouvementIntrantSuccess, (state, { mouvementIntrant }) => {
        return {
            ...state,
            mouvementIntrants: [...state.mouvementIntrants, mouvementIntrant],
            isLoading: false,
        };
    }),
    on(fromMouvementIntrants.updateMouvementIntrant, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromMouvementIntrants.updateMouvementIntrantSuccess, (state, { mouvementIntrant }) => {
        return {
            ...state,
            mouvementIntrants: state.mouvementIntrants.map((b) => b.id === mouvementIntrant.id ? mouvementIntrant : b),
            isLoading: false,
        };
    }),
    on(fromMouvementIntrants.deleteMouvementIntrant, (state) => {
        return {
            ...state,
            isLoading: true,
        };
    }),
    on(fromMouvementIntrants.deleteMouvementIntrantSuccess, (state, { mouvementIntrant }) => {
        return {
            ...state,
            isLoading: false,
            mouvementIntrants: state.mouvementIntrants.filter((b) => b.id !== mouvementIntrant.id)
        };
    })
);

export function mouvementIntrantReducer(state = initialMouvementIntrantState, actions: Action): IMouvementIntrantState {
    return reducer(state, actions);
}
