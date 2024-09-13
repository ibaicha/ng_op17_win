export interface IPays {
  id: number;
  name: String;
}

export interface IZone {
  id: number;
  name: String;
  pays: IPays;
}

export interface ISousZone {
  id: number;
  name: String;
  zone: IZone;
}

export interface ILocalite {
  id: number;
  name: String;
  sousZone: ISousZone;
}

export interface IVillage {
  id: number;
  name: String;
  localite: ILocalite;
}

export interface IPoint {
  id: number;
  name: String;

  isProduit: Boolean;
  isIntrant: Boolean;
  isVirtuel: Boolean;
  localite: ILocalite;
  entrepots: IEntrepot[];
}

export interface IEntrepot {
  id: number;
  name: String;
  adresse: String;
  pointId: number;
  point: IPoint;
  emplacements: IEmplacement[];
}

export interface IEmplacement {
  id: number;
  name: String;
  capacite: number;
  entrepotId: number;
  entrepot: IEntrepot;
  familleEmplacementId: number;
  familleEmplacement: IFamilleEmplacement;
}

export interface IFamilleEmplacement {
  id: number;
  name: String;
}
