import { IBien } from '../../interfaces/bien.interface';

export interface IBienState {
    biens: IBien[];
    isLoading: boolean;
}
