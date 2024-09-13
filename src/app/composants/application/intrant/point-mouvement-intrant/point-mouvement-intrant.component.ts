import {
  Component,
  ElementRef,
  ViewChild,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { PrimeNgModule } from '../../../../../app/shared/primeng.module';
import { Observable, Subscription } from 'rxjs';
import { IMouvementIntrant } from '../../../../interfaces/mouvement-intrant.interface';
import { IAnnee } from '../../../../interfaces/annee.interface';
import { ISaison } from '../../../../interfaces/saison.interface';
import { Store, select } from '@ngrx/store';
import { LoginService } from '../../../../services/login.service';

import * as fromMouvementIntrant from '../../../../store/mouvement_intrant';
import moment from 'moment';


import { AppService } from '../../../../services/app.service';
import { IPoint } from '../../../../interfaces/pays.interface';
import {
  IChargeExploitation,
  ITypeChargeExploitation,
} from '../../../../interfaces/exploitation.interface';
import {
  Item,
  SelectItem,
  SelectItemChargeExploitation,
} from '../../../../interfaces/selectitem.interface';

@Component({
  selector: 'app-point-mouvement-intrant',
  standalone: true,
  imports: [PrimeNgModule],
  templateUrl: './point-mouvement-intrant.component.html',
  styleUrl: './point-mouvement-intrant.component.css',
})
export class PointMouvementIntrantComponent {
[x: string]: any;
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

  points: IPoint[] = [];
  selectedPoint: IPoint | undefined;
  selectedPoints: IPoint[] | undefined;

  chargeExploitations: IChargeExploitation[] = [];
  selectedChargeExploitation: IChargeExploitation | undefined;
  selectedChargeExploitations: IChargeExploitation[] | undefined;

  creditGroupsPoints: { [agenceId: number]: IMouvementIntrant[] } = {};

  selectItemGroupChargeExploitations: SelectItemChargeExploitation[] = [];

  filterTextPoint: string = '';
  filteredPoints: IPoint[] = [];

  selectedSaisonId = this.appService.getLocalselectedCampagneSaisonId();
  selectedAnneeId = this.appService.getLocalselectedCampagneAnneeId();
  selectedPointId = this.appService.getLocalselectedCampagneAnneeId();

  constructor(
    private readonly store: Store,
    public loginService: LoginService,
    public appService: AppService //private location: Location,
  ) {
    this.annees = this.loginService.allAnnees.map((device: any) => {
      return { ...device };
    });

    this.saisons = this.loginService.allSaisons.map((device: any) => {
      return { ...device };
    });

    this.points = this.loginService.allPoints.map((device: any) => {
      return { ...device };
    });
    this.points = this.points.filter(
      (point) => point.isIntrant === true && point.isVirtuel === false
    );
    this.filteredPoints = [...this.points];
    console.log(this.points);

    this.chargeExploitations = this.loginService.allChargeExploitations.map(
      (device: any) => {
        return { ...device };
      }
    );
  }

  ngBeforeViewInit() {}

  ngOnInit() {
    this.colsMouvementIntrantWithFilters = [
      { field: 'id', header: 'ID', sort: false, filter: false },
      { field: 'anneeName', header: 'ANNEE', sort: true, filter: true },
      { field: 'saisonName', header: 'SAISON', sort: true, filter: true },
      { field: 'date', header: 'DATE', sort: true, filter: true },
      /*
      {
        field: 'pointName',
        header: 'PC',
        sort: true,
        filter: true,
      },
      */
      {
        field: 'entrepotName',
        header: 'ENTREPOT',
        sort: true,
        filter: true,
      },

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
      {
        field: 'partenaireSigle',
        header: 'PARTENAIRE',
        sort: true,
        filter: true,
      },
    ];

    this.prepareSelectedChargeExploitations();

    this.selectedChargeExploitations = [];
    this.refreshPage();
  }

  prepareSelectedChargeExploitations() {
    const chargeExploitationsFiltres: IChargeExploitation[] =
      this.chargeExploitations.filter(
        (chargeExploitation) => chargeExploitation.isIntrant === true
      );
    // Utiliser un Set pour éliminer les doublons
    const typeChargeExploitationSet: Set<String> = new Set(
      chargeExploitationsFiltres.map(
        (paquet) => paquet.typeChargeExploitation.name
      )
    );
    console.log('typeChargeExploitationSet: ', typeChargeExploitationSet);
    // Créer une liste distincte d'objets de produit
    const typeChargeExploitationDistincts: ITypeChargeExploitation[] =
      Array.from(typeChargeExploitationSet)
        .map(
          (nomProduit) =>
            this.chargeExploitations.find(
              (paquet) => paquet.typeChargeExploitation.name === nomProduit
            )?.typeChargeExploitation
        )
        .filter(Boolean) as ITypeChargeExploitation[];
    console.log(
      'typeChargeExploitationDistincts: ',
      typeChargeExploitationDistincts
    );

    let chargeExploitationsInGroup: IChargeExploitation[] = [];
    this.selectItemGroupChargeExploitations = [];

    typeChargeExploitationDistincts.forEach((itemTypeExploitation) => {
      // Créer un objet pour représenter le groupe de produits
      const groupTypeExploitation: SelectItemChargeExploitation = {
        label: itemTypeExploitation.name as string,
        value: itemTypeExploitation.id,
        items: [],
      };

      // Filtrer les varietes qui appartiennent à ce groupe
      chargeExploitationsInGroup = chargeExploitationsFiltres.filter(
        (chargeExploitation) =>
          chargeExploitation.typeChargeExploitation.id ===
          groupTypeExploitation.value
      );

      chargeExploitationsInGroup.forEach((maChargeExploitation) => {
        groupTypeExploitation.items.push({
          label: maChargeExploitation.name as string,
          value: maChargeExploitation,
        });
        // Ajouter le groupe de produits à la liste finale
      });
      this.selectItemGroupChargeExploitations.push(groupTypeExploitation);
      console.log(
        'this.selectItemGroupChargeExploitations: ',
        this.selectItemGroupChargeExploitations
      );
    });
  }
  applyFilter() {
    this.filteredPoints = this.points.filter((item) =>
      item.name.toLowerCase().includes(this.filterTextPoint.toLowerCase())
    );
  }
  refreshPage() {
    console.log('this.chargeExploitations: ', this.chargeExploitations);
    this.loading = true;
    this.initDispatch();
    this.initSubscriptions();
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

    console.time('Time this');
    this.mouvementIntrantWithFiltersSubscription =
      this.mouvementIntrantWithFilters$.subscribe((datas: any[]) => {
        if (datas) {
          this.mouvementIntrantWithFilters = datas.map((device: any) => {
            return { ...device };
          });
          console.log(
            'this.selectedChargeExploitations: ',
            this.selectedChargeExploitations
          );

          if (this.selectedChargeExploitations!.length > 0) {
            console.log(
              'this.selectedChargeExploitations: ',
              this.selectedChargeExploitations?.map((item) => item.id)
            );

            this.mouvementIntrantWithFilters =
              this.mouvementIntrantWithFilters.filter((itemMouvementIntrant) =>
                this.selectedChargeExploitations!.map(
                  (item) => item.id
                ).includes(itemMouvementIntrant.chargeExploitationId)
              );
          }
        }
        console.log(
          'this.mouvementIntrantWithFilters: ',
          this.mouvementIntrantWithFilters
        );

        this.filteredPoints.forEach((item) => {
          console.log(
            'this.mouvementIntrantWithFilters: ',
            this.mouvementIntrantWithFilters
          );
          const mouvementIntrantWithFiltersOnPoint: IMouvementIntrant[] =
            this.mouvementIntrantWithFilters.filter(
              (myMouvementIntrant) => myMouvementIntrant.pointId === item.id
            );
          this.creditGroupsPoints[item.id] = mouvementIntrantWithFiltersOnPoint;
          console.table(this.creditGroupsPoints[item.id]);
          /*
          console.log(
            item.id + ' - ' + item.name,
            this.creditGroupsPoints[item.id]
          );
          */
        });

        // console.log('this.creditGroupsPoints: ', this.creditGroupsPoints);
        setTimeout(() => {
          this.loading = false;
        }, 1500);
      });
    // console.log(this.creditGroupsPoints);
    console.timeEnd('Time this');
  }

  retourCreditGroupsPoints(myId: number) {
    return this.creditGroupsPoints[myId] || [];
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
  }

  async onMultiChargeExploitationsChange(event: any) {
    const myChargeExploitations: number[] = [];
    this.selectedChargeExploitations?.forEach((chargeExploitation: any) => {
      myChargeExploitations.push(chargeExploitation.id.toString());
    });

    localStorage.setItem(
      'selectedChargeExploitationId',
      myChargeExploitations.toString()
    );

    this.refreshPage();
  }
  async onMultiPointsChange(event: any) {
    const myPoints: number[] = [];
    this.selectedPoints?.forEach((point: any) => {
      myPoints.push(point.id.toString());
    });
    localStorage.setItem('selectedPointId', myPoints.toString());

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
