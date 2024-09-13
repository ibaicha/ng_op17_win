import { IAnnee } from './annee.interface';
import { IAgence } from './societe.interface';
import { IExploitation } from './exploitation.interface';
import { IProduit, IVariete } from './filiere.interface';
import { IOp, IUniteTransformation } from './op.interface';
import { IEmplacement } from './pays.interface';
import { ISaison } from './saison.interface';


export interface ICredit {
  id: number;
  dateCredit: Date;
  capital: number;
  interet: number;
  moratoire: number;
  autres_engagements: number;
  // agenceId: number;
  // agence: IAgence;
  exploitationId: number;
  exploitation: IExploitation;
}

export interface IExploitationCreditCustom {
    id: number;
    dateCredit: string;
    capital: number;
    interet: number;
    moratoire: number;
    autres_engagements: number;
    exigible: number;
    capitalFormat: string;
    interetFormat: string;
    moratoireFormat: string;
    autres_engagementsFormat: string;
    exigibleFormat: string;

    agenceId: number;
    agenceName: string;
    agenceSigle: string;
    societeId: number;
    societeName: string;
    societeSigle: string;

    exploitationId: number;
    exploitationOpId: number;
    exploitationOpName: string;

    exploitationOpPointId: number;
    exploitationOpPointName: string;

    exploitationOpPointAgenceId: number;
    exploitationOpPointAgenceName: string;
    exploitationOpPointAgenceSigle: string;

    exploitationOpPointAgenceSocieteId: number;
    exploitationOpPointAgenceSocieteName: string;
    exploitationOpPointAgenceSocieteSigle: string;

    exploitationTypeOpId: number;
    exploitationTypeOpName: string;

    exploitationAnneeId: number;
    exploitationAnneeName: string;
    exploitationSaisonId: number;
    exploitationSaisonName: string;

    exploitationVarieteId: number;
    exploitationVarieteName: string;
    exploitationProduitId: number;
    exploitationProduitName: string;
    exploitationFiliereId: number;
    exploitationFiliereName: string;
    exploitationFamilleEmplacemenId: number;
    exploitationFamilleEmplacementName: string;
    exploitationCompte: number;
    exploitationDate: string;
    exploitationUnite: string;
    exploitationSurface: number;

    remboursementsSum: number;
    remboursementsSumFormat: string;
    remboursementsCount: number;
    tauxRemboursement: number;
    tauxRemboursementFormat: string;

    remboursementsMouvementSum: number;
    remboursementsMouvementCount: number;
    remboursementsMouvementSumFormat: string;

    tauxRemboursementMouvement: number;
    tauxRemboursementMouvementFormat: string;
  }

export interface IExploitationCredit {
  id: number;
  date: Date;
  capital: number;
  interet: number;
  moratoire: number;
  autres_engagements: number;
  agenceId: number;
  compte: '';
  exploitationId: number;
  dateExploitation: Date;
  unite: '';
  surface: number;

  varieteId: number;
  anneeId: number;
  saisonId: number;
  producteurId: number;
  opId: number;
}

export interface ICreditCustom {
  id: number;
  dateCredit: string;
  capital: number;
  interet: number;
  moratoire: number;
  autres_engagements: number;
  agenceId: number;
  agenceName: string;
  agenceSigle: string;
  exploitationId: number;
  exploitationOpId: number;
  exploitationOpName: string;
  exploitationTypeOpId: number;
  exploitationTypeOpName: string;
  exploitationAnneeId: number;
  exploitationAnneeName: string;
  exploitationSaisonId: number;
  exploitationSaisonName: string;
  exploitationVarieteId: number;
  exploitationVarieteName: string;
  exploitationVarieteSurfaceUnite: string;
  exploitationVarieteQuantiteUnite: string;
  exploitationVarieteRendementUnite: number;

  exploitationProduitId: number;
  exploitationProduitName: string;
  exploitationFiliereId: number;
  exploitationFiliereName: string;
  exploitationFamilleEmplacemenId: number;
  exploitationFamilleEmplacementName: string;
  exploitationCompte: string;
  exploitationDate: Date;
  exploitationUnite: string;
  exploitationSurface: number;

  exigible: number;
  capitalFormat: string;
  interetFormat: string;
  moratoireFormat: string;
  autres_engagementsFormat: string;
  exigibleFormat: string;

  societeId: number;
  societeName: string;
  societeSigle: string;

  exploitationOpPointId: number;
  exploitationOpPointName: string;

  exploitationOpPointAgenceId: number;
  exploitationOpPointAgenceName: string;
  exploitationOpPointAgenceSigle: string;

  exploitationOpPointAgenceSocieteId: number;
  exploitationOpPointAgenceSocieteName: string;
  exploitationOpPointAgenceSocieteSigle: string;

  remboursementsSum: number;
  remboursementsSumFormat: string;
  remboursementsCount: number;
  tauxRemboursement: number;
  tauxRemboursementFormat: string;

  remboursementsMouvementSum: number;
  remboursementsMouvementCount: number;
  remboursementsMouvementSumFormat: string;

  tauxRemboursementMouvement: number;
  tauxRemboursementMouvementFormat: string;
}



export interface ISumCredit {
  sumCapitals: String;
  sumMoratoires: String;
  sumInterets: String;
  sumAutresEngagements: String;
  sumExigibles: String;
  sumRemboursements: String;
}

export interface IRemboursement {
  id: number;
  date: Date;
  pu: number;
  quantite: number;
  valeur: number;
  typeRemboursementId: number;
  typeRemboursement: ITypeRemboursement;
  exploitationId: number;
  exploitation: IExploitation;
  emballageId: number;
  emballage: IEmballage;
}

export interface IRemboursementCustom {
  id: number;
  date: Date;
  pu: number;
  quantite: number;
  valeur: number;
  emballageId: number;
  emballageName: string;
  typeEmballageId: number;
  typeEmballageName: string;
  pointId: number;
  pointName: string;
  localiteId: number;
  localiteName: string;
}

export interface IMouvementCustom {
  id: number;
  date: Date;
  pu: number;
  quantite: number;
  valeur: number;
  emballageId: number;
  emballageName: string;
  emplacementId: number;
  emplacementName: string;
}

export interface IMouvementStockage {
  id: number;
  date: Date;
  pu: number;
  quantiteEntreeEmballage: number;
  quantiteSortieEmballage: number;
  nombreUnite: number;
  valeur: number;
  opId: number;
  op: IOp;
  uniteTransformationId: number;
  uniteTransformation: IUniteTransformation;
  varieteId: number;
  variete: IVariete;
  modeEntreeSortieStockId: number;
  modeEntreeSortieStock: IModeEntreeSortieStock;
  anneeId: number;
  annee: IAnnee;
  saisonId: number;
  saison: ISaison;
  emplacementId: number;
  emplacement: IEmplacement;
  emballageId: number;
  emballage: IEmballage;
}

export interface ITypeMouvementStockage {
  id: number;
  name: String;
}

export interface IModeEntreeSortieStock {
  id: number;
  name: String;
  typeMouvementStockageId: number;
  typeMouvementStockage: ITypeMouvementStockage;
}

export interface IRecolte {
  id: number;
  date: Date;
  pu: number;
  quantite: number;
  valeur: number;
  exploitationId: number;
  varieteId: number;
  emballageId: number;
}
export interface IRecolteCustom {
  id: number;
  date: Date;
  pu: number;
  quantite: number;
  valeur: number;
  emballageId: number;
  emballageName: string;
  typeEmballageId: number;
  typeEmballageName: string;
}

export interface ITypeRemboursement {
  id: number;
  name: String;
}

export interface ITypeEmballage {
  id: number;
  name: String;
  conditionnement: String;
  quantite: number;
  pu: number;
  valeur: number;
  isActive: boolean;
  isDefault: boolean;
  produitId: number;
  produit: IProduit;
  typeEmballageId: number;
  typeEmballage: ITypeEmballage;
}

export interface IEmballage {
  id: number;
  name: String;
}

export interface ITypeUniteGrandeur {
  id: number;
  name: String;
}

export interface IUniteGrandeur {
  id: number;
  name: String;
  typeUniteGrandeurId: number;
  typeUniteGrandeur: ITypeUniteGrandeur;
}

export interface ISurUniteGrandeur {
  id: number;
  name: String;
  valeurReference: number;
  uniteGrandeur: IUniteGrandeur;
}
