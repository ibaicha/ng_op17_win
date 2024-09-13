import { IRemboursement } from '../../interfaces/credit.interface';

export interface IRemboursementState {
    remboursements: IRemboursement[];
    isLoading: boolean;
}
