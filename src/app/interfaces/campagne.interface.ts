import { IAnnee } from "./annee.interface";
import { ISaison } from "./saison.interface";

export interface ICampagne{
    id: number;
    annee: IAnnee;
    saison: ISaison;

}
