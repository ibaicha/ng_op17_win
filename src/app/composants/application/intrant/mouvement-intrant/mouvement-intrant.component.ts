import { Component, ElementRef, ViewChild } from '@angular/core';
import { PrimeNgModule } from '../../../../../app/shared/primeng.module';
import { Observable, Subscription } from 'rxjs';
import { IMouvementIntrant } from '../../../../interfaces/mouvement-intrant.interface';
import { IAnnee } from '../../../../interfaces/annee.interface';
import { ISaison } from '../../../../interfaces/saison.interface';
import { Store, select } from '@ngrx/store';
import { LoginService } from '../../../../services/login.service';

import * as fromMouvementIntrant from '../../../../store/mouvement_intrant';
import moment from 'moment';

import { NgIf, NgFor, NgSwitch, NgSwitchDefault } from '@angular/common';

import { AppService } from '../../../../services/app.service';

@Component({
  selector: 'app-mouvement-intrant',
  standalone: true,
  imports: [PrimeNgModule],
  templateUrl: './mouvement-intrant.component.html',
  styleUrl: './mouvement-intrant.component.css',
})
export class MouvementIntrantComponent {
  colsMouvementIntrantWithFilters: any[] = [];
  @ViewChild('dt') dt: any;
  @ViewChild('mapElement') mapElement!: ElementRef;

  loading: boolean = false;
  progress: number = 50; // Remplacez cela par votre variable de pourcentage réelle

  mouvementIntrantWithFilters$!: Observable<IMouvementIntrant[]>;
  private mouvementIntrantWithFiltersSubscription: Subscription | undefined;
  mouvementIntrantWithFilters: IMouvementIntrant[] = [];
  mouvementIntrantWithFilter: any = {};
  selectedmouvementIntrantWithFilters: IMouvementIntrant[] | undefined;

  mouvementIntrants$!: Observable<IMouvementIntrant[]>;
  private mouvementIntrantsSubscription: Subscription | undefined;
  mouvementIntrants: IMouvementIntrant[] = [];
  mouvementIntrant: any = {};
  selectedmouvementIntrants: IMouvementIntrant[] | undefined;

  annees: IAnnee[] = [];
  selectedAnnee: IAnnee | undefined;
  selectedAnnees: IAnnee[] | undefined;
  saisons: ISaison[] = [];
  selectedSaison: ISaison | undefined;
  selectedSaisons: ISaison[] | undefined;

  selectedSaisonId = this.appService.getLocalselectedCampagneSaisonId();
  selectedAnneeId = this.appService.getLocalselectedCampagneAnneeId();

  lots: ILot[] = [];
  selectedLots: ILot[] | undefined;

  constructor(
    private readonly store: Store,
    public loginService: LoginService,
    public appService: AppService //private location: Location,
  )
  {
    this.annees = this.loginService.allAnnees.map((device: any) => {
      return { ...device };
    });


    this.saisons = this.loginService.allSaisons.map((device: any) => {
      return { ...device };
    });
  }

  ngBeforeViewInit() {}

  ngOnInit() {
    this.selectedSaison = this.loginService.mySelectedSaison;
    this.selectedSaisons?.push(this.loginService.mySelectedSaison!);
    localStorage.setItem(
      'selectedSaisonId',
      this.loginService.mySelectedSaison!.id.toString()
    );
    localStorage.setItem(
      'selectedSaisonName',
      this.loginService.mySelectedSaison!.name.toString()
    );

    this.selectedAnnee = this.loginService.mySelectedAnnee;
    localStorage.setItem(
      'selectedAnneeId',
      this.loginService.mySelectedAnnee!.id.toString()
    );
    localStorage.setItem(
      'selectedAnneeName',
      this.loginService.mySelectedAnnee!.name.toString()
    );

    this.colsMouvementIntrantWithFilters = [
      { field: 'id', header: 'ID', sort: false, filter: false },
      { field: 'anneeName', header: 'ANNEE', sort: true, filter: true },
      { field: 'saisonName', header: 'SAISON', sort: true, filter: true },
      { field: 'date', header: 'DATE', sort: true, filter: true },
      {
        field: 'pointName',
        header: 'PC',
        sort: true,
        filter: true,
      },
      /*
      {
        field: 'entrepotName',
        header: 'ENTREPOT',
        sort: true,
        filter: true,
      },
      {
        field: 'emplacementName',
        header: 'MAGASIN',
        sort: true,
        filter: true,
      },
      */
      {
        field: 'modeEntreeSortieIntrantName',
        header: 'MODE',
        sort: true,
        filter: true,
      },
      {
        field: 'chargeExploitationName',
        header: 'INTRANT',
        sort: true,
        filter: true,
      },
      /*
      {
        field: 'quantiteEntreeSortieEmballage',
        header: 'QTE',
        sort: true,
        filter: true,
      },

*/
      {
        field: 'lot',
        header: 'N° LOT',
        sort: true,
        filter: true,
      },
      {
        field: 'quantiteEntreeEmballage',
        header: 'ENTREE',
        sort: true,
        filter: true,
      },
      {
        field: 'quantiteSortieEmballage',
        header: 'SORTIE.',
        sort: true,
        filter: true,
      },

      /*
      {
        field: 'fournisseurSigle',
        header: 'FOURNISSEUR',
        sort: true,
        filter: true,
      },
      */
      {
        field: 'partenaireSigle',
        header: 'PARTENAIRE',
        sort: true,
        filter: true,
      },
      /*



      { field: 'opSigle', header: 'OP', sort: true, filter: true },
      */
    ];

    this.initDispatch();
    //this.viderBien();
    this.initSubscriptions();
    // Extract distinct names using a Set
  }

  refreshPage() {
    this.loading = true;
    this.initDispatch();
    this.initSubscriptions();
  }

  chargerLots() {
    let distinctNames = Array.from(
      new Set(this.mouvementIntrantWithFilters.map((item) => item.lot))
    );
    this.lots = distinctNames.map((name) => ({
      id: name,
      name: name,
    }));
    this.lots = this.lots.filter((item) => item.name.length > 0);
    console.log('this.lots: ', this.lots);
  }

  private initDispatch(): void {
    const myFilter: IFilter = {
      anneeId: null,
      saisonId: null,
      emplacementId: null,
      chargeExploitationId: null,
      opId: null,
      fourmisseurId: null,
      lot: null,
    };

    myFilter.anneeId = this.appService.getLocalselectedCampagneAnneeId();
    myFilter.saisonId = this.appService.getLocalselectedCampagneSaisonId();
    //myFilter.lot = this.appService.getLocalselectedLotId();

    this.removeNullProperties(myFilter);

    this.store.dispatch(
      fromMouvementIntrant.getAllMouvementIntrantWithFilters({
        filter: myFilter,
      })
    );
  }

  private initSubscriptions(): void {
    this.mouvementIntrantWithFilters$ = this.store.pipe(
      select(fromMouvementIntrant.selectMouvementIntrantWithFiltersList)
    );

    this.mouvementIntrantWithFiltersSubscription =
      this.mouvementIntrantWithFilters$.subscribe((datas: any[]) => {
        if (datas) {
          this.mouvementIntrantWithFilters = datas.map((device: any) => {
            return { ...device };
          });

          //this.chargerLots();
        }
        this.loading = false;
      });
  }

  removeNullProperties(obj: Record<string, any>) {
    for (const key in obj) {
      if (obj[key] === null) {
        delete obj[key];
      }
    }
  }

  async onMultiSaisonsChange(event: any) {
    const mySaisons: number[] = [];
    this.selectedSaisons?.forEach((saison: any) => {
      mySaisons.push(saison.id.toString());
    });
    localStorage.setItem('selectedSaisonId', mySaisons.toString());

    this.refreshPage();
    //this.chargerLots();
  }
  async onMultiAnneesChange(event: any) {
    const myAnnees: number[] = [];
    this.selectedAnnees?.forEach((annee: any) => {
      myAnnees.push(annee.id.toString());
    });

    localStorage.setItem('selectedAnneeId', myAnnees.toString());
    this.refreshPage();
    //this.chargerLots();
  }

  async onMultiLotsChange(event: any) {
    const myLots: number[] = [];
    this.selectedLots?.forEach((lot: any) => {
      //console.log(lot);
      myLots.push(lot.name.toString());
    });
    localStorage.setItem('selectedLotId', myLots.toString());
    this.refreshPage();
  }
  formatMontant(montant: number) {
    return montant.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' F';
  }
  formatNumber(montant: number) {
    if (montant != 0) {
      return montant.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    } else {
      return '';
    }
  }
}

export interface IFilter {
  anneeId: number | null;
  saisonId: string | null;
  emplacementId: number | null;
  chargeExploitationId: number | null;
  opId: number | null;
  fourmisseurId: number | null;
  lot?: string | null;
}

export interface ILot {
  id: String;
  name: String;
}
