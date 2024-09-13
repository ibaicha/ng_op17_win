import { IClient } from '../../interfaces/client.interface';

export interface IClientState {
    clients: IClient[];
    isLoading: boolean;
}
