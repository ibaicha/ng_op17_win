import { ICampagne } from '../../interfaces/campagne.interface';

export interface ICampagneState {
    campagnes: ICampagne[];
    isLoading: boolean;
}
