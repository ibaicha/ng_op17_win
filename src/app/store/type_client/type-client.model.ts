import { ITypeClient } from '../../interfaces/type-client.interface';

export interface ITypeClientState {
    typeClients: ITypeClient[];
    isLoading: boolean;
}
