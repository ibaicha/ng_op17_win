import { IModeleAutomobile } from "./modele-automobile.interface";
import { IUtilisationAutomobile } from "./utilisation-automobile.interface";

export interface IAutomobile {

    id: number;
    numero: String;
    valeur: number;
    lieuStationnement: String;
    modeleAutomobile: IModeleAutomobile;
    utilisationAutomobile: IUtilisationAutomobile;    
}
