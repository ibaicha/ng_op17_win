import { IAnnee } from "./annee.interface";
import { IAutomobile } from "./automobile.interface";
import { ICommercial } from "./commercial.interface";
import { IResidence } from "./residence.interface";
import { ITypeBien } from "./type-bien.interface";


export interface IBien {

    id: number;
    code: String;
    valeur: number;
    typeBien: ITypeBien;
    annee: IAnnee;
    automobile: IAutomobile;
    residence: IResidence;
    commercial: ICommercial;
    clientId: number;

}

export interface IBienAutomobile {
    id: number;
    code: String;
    numero: String;
    marque: String;
    modele: String;
    utilisation: String;
    valeur: number;
}

export interface IBienResidence {
    id: number;
    adresse: String;
    superficie: number;
    typeResidence: String;
    typeConstruction: String;
    valeur: number;

}

export interface IBienCommercial {
    id: number;
    name: String;
    sigle: String;
    adresse: String;
    superficie: number;
    typeSociete: String;
    valeur: number;
    

}