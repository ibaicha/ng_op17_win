import { IPersonne } from "./personne.interface";
import { IProfession } from "./profession.interface";
import { ISociete } from "./societe.interface";
import { ITypeClient } from "./type-client.interface";
import { ITypeSociete } from "./type-societe.interface";

export interface IClient {
    id: number;
    code: String;
    name: String;
    adresse: String;
    telephone: String;
    email: String;
    firstName: String;
    lastName: String;
    profession: IProfession; 

    societe: String;
    sigle: String;
    typeSociete: ITypeSociete;
    typeClient: ITypeClient;
    //personne: IPersonne;
    //societe: ISociete;
}

export interface IClientBase {
    id: number;
    code: String;
    name: String;
    adresse: String;
    telephone: String;
    email: String;
    fax: String;
    //showDetails: () => string;
    showDetails: () => string
    typeClient: ITypeClient;
    //typeClientName: ITypeClient['name'];
    /*
    personne: IPersonne;
    societe: ISociete;
    */ 
}

export class IClientx implements IClientBase {
    id!: number;
    code!: String;
    name!: String;
    adresse!: String;
    telephone!: String;
    email!: String;
    fax!: String;
    typeClient!: ITypeClient;
    //typeClientName!: ITypeClient['name'];
    showDetails!: () => 'xxxxx';
 
  }

/*
export interface IPersonne {
    id: number;
    firstname: String;
    lastname: String;
}

export interface ISociete {
    id: number;
    name: String;
}
*/