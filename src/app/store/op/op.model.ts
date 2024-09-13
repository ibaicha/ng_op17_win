import { IOp, IOpCustom } from '../../interfaces/op.interface';

export interface IOpState {
    ops: IOp[];
    opsCustomFromAgences: IOp[];
    opWithFilters: IOpCustom[];
    isLoading: boolean;
}
