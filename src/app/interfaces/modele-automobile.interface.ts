import { IMarqueAutomobile } from "./marque-automobile.interface";

export interface IModeleAutomobile{
    id: number;
    name: String;
    marqueAutomobile: IMarqueAutomobile;
}