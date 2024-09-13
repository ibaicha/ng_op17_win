import { IPointAgence } from '../../interfaces/point-agence.interface';

export interface IPointAgenceState {
  pointAgences: IPointAgence[];
  isLoading: boolean;
}
