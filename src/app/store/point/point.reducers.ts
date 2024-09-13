import { Action, createReducer, on } from '@ngrx/store';

import { IPointState } from './point.model';
import * as fromPoints from './index';
import { Actions } from '@ngrx/effects';

export const initialPointState: IPointState = {
  points: [],
  isLoading: false,
};

const reducer = createReducer<IPointState>(
  initialPointState,
  on(fromPoints.getPoint, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(
    fromPoints.getPointSuccess,
    (state, { onePoint }) => {
      return {
        ...state,
        isLoading: false,
        onePoint,
      };
    }
  ),

  on(fromPoints.getPoints, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(
    fromPoints.getPointsSuccess,
    (state, { points }) => {
      return {
        ...state,
        isLoading: false,
        points,
      };
    }
  ),

  on(fromPoints.createPoint, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(
    fromPoints.createPointSuccess,
    (state, { point }) => {
      return {
        ...state,
        points: [...state.points, point],
        isLoading: false,
      };
    }
  ),
  on(fromPoints.updatePoint, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(
    fromPoints.updatePointSuccess,
    (state, { point }) => {
      return {
        ...state,
        points: state.points.map((b) =>
          b.id === point.id ? point : b
        ),
        isLoading: false,
      };
    }
  ),
  on(fromPoints.deletePoint, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(
    fromPoints.deletePointSuccess,
    (state, { point }) => {
      return {
        ...state,
        isLoading: false,
        points: state.points.filter(
          (b) => b.id !== point.id
        ),
      };
    }
  )
);

export function pointReducer(
  state = initialPointState,
  actions: Action
): IPointState {
  return reducer(state, actions);
}
