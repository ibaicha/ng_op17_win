import { ISociete } from '../../interfaces/societe.interface';

export interface ISocieteState {
    societes: ISociete[];
    isLoading: boolean;
}
