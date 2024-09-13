import { IExploitation } from "./exploitation.interface";


export interface ITypeSociete {
    id: number;
    name: String;
}


export interface ISociete {
    id: number;
    name: String;
    sigle: String;
    typeSociete: ITypeSociete;
}

export interface IAgence {
    id: number;
    name: String;
    sigle: String;
    societe: ISociete;
}


