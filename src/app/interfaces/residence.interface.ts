import { ITypeConstruction } from "./type-construction.interface";
import { ITypeResidence } from "./type-residence.interface";

export interface IResidence {
    id: number;
    adresse: String;
    superficie: number;
    typeResidence: ITypeResidence;
    typeConstruction: ITypeConstruction;
}
