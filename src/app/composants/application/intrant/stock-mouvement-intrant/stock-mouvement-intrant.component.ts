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
import * as fromIdentifiant from '../../../../store/identifiant';
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
import { IIdentifiant } from '../../../../interfaces/identifiant.interface';

@Component({
  selector: 'app-stock-mouvement-intrant',
  standalone: true,
  imports: [PrimeNgModule],
  templateUrl: './stock-mouvement-intrant.component.html',
  styleUrl: './stock-mouvement-intrant.component.css',
})
export class StockMouvementIntrantComponent {
  colsMouvementIntrantWithFilters: any[] = [];
  @ViewChild('dt') dt: any;
  @ViewChild('mapElement') mapElement!: ElementRef;

  loading: boolean = false;
  progress: number = 50; // Remplacez cela par votre variable de pourcentage réelle

  /*
  identifiantWithFilters$!: Observable<IIdentifiant[]>;
  private identifiantWithFiltersSubscription: Subscription | undefined;
  identifiantWithFilters: IIdentifiant[] = [];
  identifiantWithFilter: any = {};
  selectedidentifiantWithFilters: IIdentifiant[] | undefined;
  */

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

  mouvementsGroupsEntrepots: { [entrepotId: number]: IMouvementIntrant[] } = {};
  mouvementsGroupsPoints: { [agenceId: number]: IMouvementIntrant[] } = {};

  pointGroupEmplacements: { [pointId: number]: any[] } = {};

  pointGroupStocks: { [pointId: number]: IPointStock } = {};
  entrepotGroupStocks: { [entrepotId: number]: IEntrepotStock } = {};

  selectItemGroupChargeExploitations: SelectItemChargeExploitation[] = [];

  filterTextPoint: string = '';
  filteredPoints: IPoint[] = [];

  selectedSaisonId = this.appService.getLocalselectedCampagneSaisonId();
  selectedAnneeId = this.appService.getLocalselectedCampagneAnneeId();
  selectedPointId = this.appService.getLocalselectedCampagneAnneeId();

  chargeExploitationEnCours: string =
    this.appService.getLocalselectedChargeExploitationName();
  chargeExploitationUniteEnCours: string =
    this.appService.getLocalselectedChargeExploitationUniteName();

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
    this.preparePointsEntrepotEmplacements();

    this.selectedChargeExploitations = [];
    this.refreshPage();
  }

  prepareSelectedChargeExploitations() {
    const chargeExploitationsFiltres: IChargeExploitation[] =
      this.chargeExploitations.filter(
        (chargeExploitation) => chargeExploitation.isIntrant === true
      );

    localStorage.setItem(
      'selectedChargeExploitationId',
      chargeExploitationsFiltres[0].id.toString()
    );
    localStorage.setItem(
      'selectedChargeExploitationName',
      chargeExploitationsFiltres[0].name.toString()
    );

    localStorage.setItem(
      'selectedChargeExploitationUniteId',
      chargeExploitationsFiltres[0].uniteGrandeur.id.toString()
    );
    localStorage.setItem(
      'selectedChargeExploitationUniteName',
      chargeExploitationsFiltres[0].uniteGrandeur.name.toString()
    );
    // Utiliser un Set pour éliminer les doublons
    const typeChargeExploitationSet: Set<String> = new Set(
      chargeExploitationsFiltres.map(
        (paquet) => paquet.typeChargeExploitation.name
      )
    );

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
    });
  }
  preparePointsEntrepotEmplacements() {
    this.points.forEach((point) => {
      const pointsGroupEntrepotEmplacements: any[] = [];
      const mesEntrepots = point.entrepots.filter((entrepot) => {
        return entrepot.pointId === point.id;
      });

      point.entrepots.forEach((entrepot) => {
        pointsGroupEntrepotEmplacements.push({
          entrepotId: entrepot.id,
          entrepotName: entrepot.name,
          emplacements: entrepot.emplacements,
        });
      });

      this.pointGroupEmplacements[point.id] = pointsGroupEntrepotEmplacements;
    });
  }

  retourMouvementsGroupsEntrepots(myId: number) {
    return this.mouvementsGroupsEntrepots[myId] || [];
  }
  applyFilter() {
    this.filteredPoints = this.points.filter((item) =>
      item.name.toLowerCase().includes(this.filterTextPoint.toLowerCase())
    );
  }

  refreshPage() {
    this.loading = true;
    this.initDispatch();
    this.initSubscriptions();
  }

  /*
  async generateRandomArray(
    length: number,
    min: number,
    max: number
  ): Promise<number[]> {
    const result: number[] = [];
    const set = new Set<number>();

    while (set.size < length) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!set.has(randomNumber)) {
        set.add(randomNumber);
      }
    }
    console.trace();
    result.push(...set);
    console.log(result);
    return result;
  }
  */

  async initDispatch(): Promise<void> {
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
    console.log('myFilter', myFilter);
    this.store.dispatch(
      fromMouvementIntrant.getAllMouvementIntrantWithFilters({
        filter: {
          ...myFilter,},
      })
    );

    /*
    const myFilterIdentifiant: IFilterIdentifiant = {
      id: null,
      sexe: null,
      annee_true: null,
      code_numeric: null,
    };

    myFilterIdentifiant.sexe = 1;
    myFilterIdentifiant.annee_true = 1973;
    this.removeNullProperties(myFilterIdentifiant);
    console.log('myFilterIdentifiant', myFilterIdentifiant);


    this.store.dispatch(
      fromIdentifiant.getAllIdentifiantsWithFilters({
        filter: myFilterIdentifiant,
      })
    );
    this.store.dispatch(fromIdentifiant.getIdentifiants());
    */
  }

  async initSubscriptions(): Promise<void> {

    /*
    this.identifiantWithFilters$ = this.store.pipe(
      select(fromIdentifiant.selectIdentifiantsList)
    );


    this.identifiantWithFilters$ = this.store.pipe(
      select(fromIdentifiant.selectIdentifiantWithFiltersList)
    );

    this.identifiantWithFiltersSubscription =
      this.identifiantWithFilters$.subscribe((datas: any[]) => {
        if (datas) {
          console.log('this.identifiantWithFilters.length', datas.length);
          this.identifiantWithFilters = datas.map((device: any) => {
            return { ...device };
          });

          console.log('this.identifiantWithFilters', datas);
        }
      });
*/
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
          const selectedChargeExploitationId =
            this.appService.getLocalselectedChargeExploitationId();

          this.chargeExploitationEnCours =
            this.appService.getLocalselectedChargeExploitationName();

          this.chargeExploitationUniteEnCours =
            this.appService.getLocalselectedChargeExploitationUniteName();

          if (parseInt(selectedChargeExploitationId.toString()) > 0) {
            this.mouvementIntrantWithFilters =
              this.mouvementIntrantWithFilters.filter(
                (itemMouvementIntrant) =>
                  itemMouvementIntrant.chargeExploitationId ===
                  parseInt(selectedChargeExploitationId.toString())
              );
          }
        }

        this.filteredPoints.forEach((item) => {
          const mouvementIntrantWithFiltersOnPoint: IMouvementIntrant[] =
            this.mouvementIntrantWithFilters.filter(
              (myMouvementIntrant) => myMouvementIntrant.pointId === item.id
            );
          this.mouvementsGroupsPoints[item.id] =
            mouvementIntrantWithFiltersOnPoint;
          const myPointStock: IPointStock = {
            pointId: item.id,
            pointEntree: mouvementIntrantWithFiltersOnPoint
              .map(
                (mouvementIntrant) =>
                  mouvementIntrant.quantiteEntreeEmballage *
                  mouvementIntrant.nombreUnite
              )
              .reduce((acc, current) => acc + current, 0),
            pointSortie: mouvementIntrantWithFiltersOnPoint
              .map(
                (mouvementIntrant) =>
                  mouvementIntrant.quantiteSortieEmballage *
                  mouvementIntrant.nombreUnite
              )
              .reduce((acc, current) => acc + current, 0),
            pointSolde: mouvementIntrantWithFiltersOnPoint
              .map(
                (mouvementIntrant) =>
                  mouvementIntrant.quantiteEntreeEmballage *
                    mouvementIntrant.nombreUnite -
                  mouvementIntrant.quantiteSortieEmballage *
                    mouvementIntrant.nombreUnite
              )
              .reduce((acc, current) => acc + current, 0),
          };

          this.pointGroupStocks[item.id] = myPointStock;

          item.entrepots.forEach((entrepot) => {
            const mouvementIntrantWithFiltersOnEntrepot: IMouvementIntrant[] =
              this.mouvementIntrantWithFilters.filter(
                (myMouvementIntrant) =>
                  myMouvementIntrant.entrepotId === entrepot.id
              );
            this.mouvementsGroupsEntrepots[entrepot.id] =
              mouvementIntrantWithFiltersOnEntrepot;

            const myEntrepotStock: IEntrepotStock = {
              entrepotId: item.id,
              entrepotEntree: mouvementIntrantWithFiltersOnEntrepot
                .map(
                  (mouvementIntrant) =>
                    mouvementIntrant.quantiteEntreeEmballage *
                    mouvementIntrant.nombreUnite
                )
                .reduce((acc, current) => acc + current, 0),
              entrepotSortie: mouvementIntrantWithFiltersOnEntrepot
                .map(
                  (mouvementIntrant) =>
                    mouvementIntrant.quantiteSortieEmballage *
                    mouvementIntrant.nombreUnite
                )
                .reduce((acc, current) => acc + current, 0),
              entrepotSolde: mouvementIntrantWithFiltersOnEntrepot
                .map(
                  (mouvementIntrant) =>
                    mouvementIntrant.quantiteEntreeEmballage *
                      mouvementIntrant.nombreUnite -
                    mouvementIntrant.quantiteSortieEmballage *
                      mouvementIntrant.nombreUnite
                )
                .reduce((acc, current) => acc + current, 0),
            };

            this.entrepotGroupStocks[entrepot.id] = myEntrepotStock;
          });
        });

        console.log('this.pointGroupStocks: ', this.pointGroupStocks);
        setTimeout(() => {
          this.loading = false;
        }, 1500);
      });
    // console.log(this.mouvementsGroupsEntrepots);
    console.timeEnd('Time this');
  }

  retourCreditGroupsPoints(myId: number) {
    return this.mouvementsGroupsEntrepots[myId] || [];
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

  async onMultiPointsChange(event: any) {
    const myPoints: number[] = [];
    this.selectedPoints?.forEach((point: any) => {
      myPoints.push(point.id.toString());
    });
    localStorage.setItem('selectedPointId', myPoints.toString());

    this.refreshPage();
  }
  onSelectItemGroupChargeExploitation(event: any) {
    console.log(event.value);
    this.selectedChargeExploitation = event.value;
    localStorage.setItem('selectedVarieteId', event.value.id.toString());
    localStorage.setItem('selectedVarieteName', event.value.name.toString());

    localStorage.setItem(
      'selectedChargeExploitationId',
      event.value.id.toString()
    );

    localStorage.setItem(
      'selectedChargeExploitationName',
      event.value.name.toString()
    );

    localStorage.setItem(
      'selectedChargeExploitationUniteId',
      event.value.uniteGrandeur.id.toString()
    );
    localStorage.setItem(
      'selectedChargeExploitationUniteName',
      event.value.uniteGrandeur.name.toString()
    );
    this.loginService.mySelectedChargeExploitation = event.value;
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

export interface IFilterIdentifiant {
  id: number | null;
  sexe: number | null;
  annee_true: number | null;
  code_numeric: number | null;
}

export interface IPointStock {
  pointId: number | null;
  pointEntree: number | null;
  pointSortie: number | null;
  pointSolde: number | null;
}
export interface IEntrepotStock {
  entrepotId: number | null;
  entrepotEntree: number | null;
  entrepotSortie: number | null;
  entrepotSolde: number | null;
}

/*
export interface IEntrepotEmplacement {
  entrepotId: number | null;
  entrepotName: String | null;
  emplacements: IEmplacement[] | null;
}

export interface IEmplacement {
  emplacementId: number;
  emplacementName: string;
}
*/
