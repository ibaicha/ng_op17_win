import { IPoint } from './pays.interface';
import { ITypeOp, ITypeUniteTransformation } from './type-op.interface';

export interface IOp {
  /*
  id: number;
  name: String;
  typeOp: ITypeOp;
  point: IPoint;
  */

  id: number;
  name: String;
  typeOpId: number;
  typeOpName: String;
  pointId: number;
  pointName: String;
  localiteId: number;
  localiteName: String;
  sousZoneId: number;
  sousZoneName: String;
  zoneId: number;
  zoneName: String;
}

export interface IOpCustom {
  id: number;
  name: string;
  sigle: string;
  email: string;
  telephone: string;
  adresse: string;
  prenom_contact: string;
  nom_contact: string;
  email_contact: string;
  telephone_contact: string;

  typeOpId: number;
  typeOpName: string;
  pointId: number;
  pointName: string;
  agenceId: number;
  agenceName: string;
  agenceSigle: string;
  societeId: number;
  societeName: string;
  societeSigle: string;
}

export interface IUniteTransformation {
  id: number;
  name: String;
  typeOp: ITypeUniteTransformation;
}
