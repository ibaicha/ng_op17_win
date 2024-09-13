import { IIdentifiant } from '../../interfaces/identifiant.interface';

export interface IIdentifiantState {
  identifiants: IIdentifiant[];
  identifiantWithFilters: IIdentifiant[];
  isLoading: boolean;
}
