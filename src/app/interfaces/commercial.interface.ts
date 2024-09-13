import { ITypeSociete } from "./type-societe.interface";

export interface ICommercial {
    id: number;
    name: String;
    sigle: String;
    adresse: String;
    superficie: number;
    typeSociete: ITypeSociete
}
