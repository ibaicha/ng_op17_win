import { IAnnee } from './annee.interface';
import { IChargeExploitation, IExploitation } from './exploitation.interface';
import { IProduit, IVariete } from './filiere.interface';
import { IOp, IUniteTransformation } from './op.interface';
import { IEmplacement } from './pays.interface';
import { ISaison } from './saison.interface';

export interface IMouvementIntrant {

  id: number;
  date: string;
  pu: number;
  quantiteEntreeEmballage: number;
  quantiteSortieEmballage: number;
  quantiteEntreeSortieEmballage: number;
  nombreUnite: number;
  valeur: number;
  lot: string;

  chargeExploitationId: number;
  chargeExploitationName: string;

  modeEntreeSortieIntrantId: number;
  modeEntreeSortieIntrantName: string;

  anneeId: number;
  anneeName: string;
  anneeValeur: number;

  saisonId: number;
  saisonName: string;
  saisonDescription: string;

  emballageIntrantId: number;
  emballageIntrantName: string;

  opId: number;

  opName: string;
  opSigle: string;

  fournisseurId: number;
  fournisseurName: string;
  fournisseurSigle: string;

  partenaireId: number;
  partenaireName: string;
  partenaireSigle: string;

  emplacementId: number;
  emplacementName: string;
  entrepotId: number;
  entrepotName: string;
  pointId: number;
  pointName: string;

  emplacementSourceId: number;
  emplacementSourceName: string;
  entrepotSourceId: number;
  entrepotSourceName: string;
  pointSourceId: number;
  pointSourceName: string;

  emplacementDestinationId: number;
  emplacementDestinationName: string;
  entrepotDestinationId: number;
  entrepotDestinationName: string;
  pointDestinationId: number;
  pointDestinationName: string;




  modeEntreeSortieIntrant: IModeEntreeSortieIntrant;
  chargeExploitation: IChargeExploitation;
  annee: IAnnee;
  saison: ISaison;
  emplacement: IEmplacement;
  emplacementSource: IEmplacement;
  emplacementDestination: IEmplacement;
  op: IOp;

  fournisseur: IFournisseur;




/*
  id: number;
  date: Date;
  pu: number;
  quantiteEntreeEmballage: number;
  quantiteSortieEmballage: number;
  nombreUnite: number;
  valeur: number;
  lot: String;

  modeEntreeSortieIntrantId: number;
  modeEntreeSortieIntrant: IModeEntreeSortieIntrant;
  chargeExploitationId: number;
  chargeExploitation: IChargeExploitation;
  anneeId: number;
  annee: IAnnee;
  saisonId: number;
  saison: ISaison;
  emplacementId: number;
  emplacement: IEmplacement;
  emplacementSourceId: number;
  emplacementSource: IEmplacement;
  emplacementDestinationId: number;
  emplacementDestination: IEmplacement;
  opId: number;
  op: IOp;
  fournisseurId: number;
  fournisseur: IFournisseur;
  */
}

export interface IModeEntreeSortieIntrant {
  id: number;
  name: String;
  typeMouvementIntrantId: number;
  typeMouvementIntrant: ITypeMouvementIntrant;
}

export interface ITypeMouvementIntrant {
  id: number;
  name: String;
}

export interface IFournisseur {
  id: number;
  name: String;
  sigle: String;
  email: String;
  telephone: String;
  adresse: String;
  prenom_contact: String;
  nom_contact: String;
  email_contact: String;
  telephone_contact: String;
  structure: IStructure;
}

export interface IStructure {
  id: number;
  name: String;
  sigle: String;
  email: String;
  telephone: String;
  adresse: String;
}
