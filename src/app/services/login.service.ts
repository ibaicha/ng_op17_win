import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ICampagne } from '../interfaces/campagne.interface';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { IVariete } from '../interfaces/filiere.interface';
import { IAnnee } from '../interfaces/annee.interface';
import { ISaison } from '../interfaces/saison.interface';
import { SelectItem } from '../interfaces/selectitem.interface';
import { IOp } from '../interfaces/op.interface';
import { IPointAgence } from '../interfaces/point-agence.interface';
import { IAgence } from '../interfaces/societe.interface';
import { IPoint } from '../interfaces/pays.interface';
import { IChargeExploitation } from '../interfaces/exploitation.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public titre = 'Système de Gestion des OPs';
  public titreAgenceSumCapital = '0 FCFA';
  public titreAgenceSumInteret = '0 FCFA';
  public titreAgenceSumMoratoire = '0 FCFA';
  public titreAgenceSumAutresEngagements = '0 FCFA';
  public titreAgenceSumExigibles = '0 FCFA';

  public titreSocieteSumCapital = '0 FCFA';
  public titreSocieteSumInteret = '0 FCFA';
  public titreSocieteSumMoratoire = '0 FCFA';
  public titreSocieteSumAutresEngagements = '0 FCFA';
  public titreSocieteSumExigibles = '0 FCFA';

  public exploitationId = 0;

  /*
  public UserConnexion = {
    idUser: 0,
    username: '',
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    role: '',
    nbLoginDB: 0,
    isOnline: false,
    locale: false,
    userAgenceSocieteFinanciers:{
      idAgenceSocieteFinancier: 0,
      sigle: '',
      name: '',
    }
 };
*/

  public selectedCampagne: ICampagne = {
    id: 0,
    annee: {
      id: 0,
      name: '',
      valeur: 0,
    },
    saison: {
      id: 0,
      name: '',
      description: '',
    },
  };
  public UserConnexion = {
    token: '',
    user: {
      id: 2,
      username: '',
      password: '',
      email: '',
      role: {
        id: 2,
        name: '',
      },
      profile: {
        id: 2,
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
      },
      userZones: [],

      userSousZones: [],
      userLocalites: [],
      userPoints: [],
      userOps: [],
      userAgences: {
        idAgence: 0,
        sigle: '',
        name: '',
      },
      userSocietes: [],
    },
  };

  public allVarietes: IVariete[] = [];
  public allAnnees: IAnnee[] = [];
  public allSaisons: ISaison[] = [];
  public allPointAgences: IPointAgence[] = [];
  public allPoints: IPoint[] = [];
  public allChargeExploitations: IChargeExploitation[] = [];
  public allOpsAgenceFinanciers: IOp[] = [];

  public mySelectedSaison: ISaison | undefined;
  public mySelectedAnnee: IAnnee | undefined;
  public mySelectedVariete: IVariete | undefined;
  public mySelectedChargeExploitation: IChargeExploitation | undefined;
  public mySelectedItemVariete: SelectItem | undefined;

  navigateTo(route: string) {
    // Gérer la navigation vers la route spécifiée
    console.log('Navigating to', route);
    this.router.navigate(['/' + route]);
  }

  refreshPage() {
    console.log('Navigating to', this.location.path());
    this.location.go(this.location.path());
    //window.location.reload();
  }

  visibleNav: boolean;

  items: MenuItem[] | undefined;

  constructor(public router: Router, private location: Location) {
    this.visibleNav = false;
  }

  hideNav() {
    this.visibleNav = false;
  }

  showNav() {
    this.visibleNav = true;
  }

  toggleNav() {
    this.visibleNav = !this.visibleNav;
  }
}
