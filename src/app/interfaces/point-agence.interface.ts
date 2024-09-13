
import { IExploitation } from './exploitation.interface';
import { IPoint } from './pays.interface';
import { IAgence } from './societe.interface';

export interface IPointAgence {
  id: number;
  point: IPoint;
  agence: IAgence;
}
