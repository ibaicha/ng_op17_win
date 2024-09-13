import { IMouvementIntrant } from "../../interfaces/mouvement-intrant.interface";


export interface IMouvementIntrantState {
    mouvementIntrants: IMouvementIntrant[];
    //mouvementIntrantsProduitCampagne: IMouvementIntrant[];

    mouvementIntrantWithFilters: IMouvementIntrant[];

    isLoading: boolean;
}
