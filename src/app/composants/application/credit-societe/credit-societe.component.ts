import { Component, ElementRef, ViewChild } from '@angular/core';
import { PrimeNgModule } from '../../../shared/primeng.module';
import { Store, select } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppService } from '../../../services/app.service';
import { ClientService } from '../../../services/client.service';
import { CreditService } from '../../../services/credit.service';
import { LoginService } from '../../../services/login.service';
import { PointAgenceService } from '../../../services/point-agence.service';
import { Observable, Subject, Subscription, distinct, from, map } from 'rxjs';
import {
  ConfirmationService,
  MenuItem,
  Message,
  MessageService,
  SelectItem,
} from 'primeng/api';
import { IAnnee } from '../../../interfaces/annee.interface';
import { ISaison } from '../../../interfaces/saison.interface';
import {
  ICreditCustom,
  IExploitationCredit,
  IRemboursement,
  ISumCredit,
} from '../../../interfaces/credit.interface';
import * as fromCredits from '../../../../app/store/credit';
import * as fromPointsAgences from '../../../store/point_agence';
import * as fromExploitations from '../../../store/exploitation';
import * as fromRemboursements from '../../../store/remboursement';
import moment from 'moment';
import { IAgence, ISociete } from '../../../interfaces/societe.interface';
import { IPointAgence } from '../../../interfaces/point-agence.interface';
import { IVariete } from '../../../interfaces/filiere.interface';
import { IOp } from '../../../interfaces/op.interface';
import { IExploitation } from '../../../interfaces/exploitation.interface';

export enum PageNames {
  DebutPage,
  FinPage,
}

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-credit-societe',
  standalone: true,
  imports: [PrimeNgModule],
  templateUrl: './credit-societe.component.html',
  styleUrl: './credit-societe.component.css',
})
export class CreditSocieteComponent {
  colsCredit: any[] = [];
  colsCreditCustom: any[] = [];
  @ViewChild('dt') dt: any;
  @ViewChild('mapElement') mapElement!: ElementRef;

  PageNames = PageNames;
  dialogPageIndex = PageNames.DebutPage;

  dialogPages: MenuItem[] = [
    { label: 'Crédit' },
    { label: "Compte d'exploitation" },
  ];
  private unsubscribe$ = new Subject<void>();
  submitted: boolean = false;

  loading: boolean = false;
  progress: number = 50; // Remplacez cela par votre variable de pourcentage réelle

  annees: IAnnee[] = [];
  selectedAnnee: IAnnee | undefined;
  selectedAnnees: IAnnee[] | undefined;

  saisons: ISaison[] = [];
  selectedSaison: ISaison | undefined;
  selectedSaisons: ISaison[] | undefined;

  creditWithFilters$!: Observable<ICreditCustom[]>;
  private creditWithFiltersSubscription: Subscription | undefined;
  creditWithFilters: ICreditCustom[] = [];
  credit: any = {};
  selectedcreditWithFilters: ICreditCustom[] | undefined;

  societes$!: Observable<ISociete[]>;
  societes: ISociete[] = [];
  societe: any = {};
  selectedSociete: ISociete | undefined;

  agences: IAgence[] = [];

  pointAgences$!: Observable<IPointAgence[]>;
  private pointAgencesSubscription: Subscription | undefined;
  pointAgences: IPointAgence[] = [];
  pointFromAgence: any = {};
  selectedpointAgences: IPointAgence[] | undefined;

  creditsOnClientOnSociete$!: Observable<ICreditCustom[]>;
  private creditsOnClientOnSocieteSubscription: Subscription | undefined;
  creditsOnClientOnSociete: ICreditCustom[] = [];

  creditGroups: { [pointId: number]: ICreditCustom[] } = {};
  creditGroupsAgence: { [agenceId: number]: ICreditCustom[] } = {};
  creditSumGroupsAgence: {
    [agenceId: number]: ISumCredit;
  } = {};
  creditSumGroupsPoint: { [pointId: number]: ISumCredit } = {};

  creditSumSociete: ISumCredit = {
    sumCapitals: '0 F',
    sumMoratoires: '0 F',
    sumInterets: '0 F',
    sumAutresEngagements: '0 F',
    sumExigibles: '0 F',
    sumRemboursements: '0 F',
  };

  creditSumAgence: ISumCredit = {
    sumCapitals: '0 F',
    sumMoratoires: '0 F',
    sumInterets: '0 F',
    sumAutresEngagements: '0 F',
    sumExigibles: '0 F',
    sumRemboursements: '0 F',
  };

  creditForm: FormGroup;

  varietes: IVariete[] = [];
  selectedVarieteId: number | undefined;
  produitDict: { [key: string]: IVariete[] } = {};

  selectItemGroupVarietes: SelectItem[] = [];
  selectedVariete: IVariete | undefined;

  selectedOp: any;
  filteredOps: any[] | undefined;
  ops$: Observable<IOp[]> | undefined;
  ops: IOp[] = [];
  op: any = {};
  selectedOps: IOp[] | undefined;
  mesOps: any[] = [];

  remboursements$!: Observable<IRemboursement[]>;
  private remboursementsSubscription: Subscription | undefined;
  remboursements: IRemboursement[] = [];
  remboursement: any = {};
  selectedremboursements: IRemboursement[] | undefined;

  mesRemboursements$!: Observable<IRemboursement[]>;
  private mesRemboursementsSubscription: Subscription | undefined;
  mesRemboursements: IRemboursement[] = [];
  monRemboursement: any = {};
  selectedmesRemboursements: IRemboursement[] | undefined;

  exploitations$!: Observable<IExploitation[]>;
  private exploitationsSubscription: Subscription | undefined;
  exploitations: IExploitation[] = [];
  exploitation: any = {};
  selectedExploitations: IExploitation | undefined;

  exploitationsCredits$!: Observable<IExploitationCredit[]>;
  private exploitationsCreditsSubscription: Subscription | undefined;
  exploitationsCredits: IExploitationCredit[] = [];
  exploitationCredit: any = {};
  selectedExploitationsCredits: IExploitationCredit | undefined;

  remboursementsGroupsExploitation: {
    [exploitationId: number]: IRemboursement[] & { somme?: number };
  } = {};

  creditsOnPoint$!: Observable<ICreditCustom[]>;
  private creditsOnPointSubscription: Subscription | undefined;
  creditsOnPoint: ICreditCustom[] = [];

  creditsOnClient$!: Observable<ICreditCustom[]>;
  private creditsOnClientSubscription: Subscription | undefined;
  creditsOnClient: ICreditCustom[] = [];
  creditOnClient: any = {};
  selectedCreditsOnClient: ICreditCustom[] | undefined;

  sumPoints: Array<{ id: number; sum: string }> = [];
  display: boolean = false;
  displayRemboursements: boolean = false;
  titleDialogCredit: string = '';
  titleDialogRemboursements: string = '';
  iconeSave: string = 'pi pi-save';

  displayExploitation: boolean = false;

  labelSave: string = 'Save';
  classSave: string = 'p-button-text; p-button-success';
  actionSave: string = 'add';

  newCompte: string = '';
  titreCompte: string = "COMPTE D'EXPLOITATION";
  isEditedCredit: boolean = false;
  isCompteCreated: boolean = false;

  tableCreditsFilters: { [s: string]: any } = {};

  filterTextAgence: string = '';
  filteredAgences: IAgence[] = [];

  msgs: Message[] = [];
  ref: DynamicDialogRef | undefined;

  constructor(
    private readonly store: Store,
    //private location: Location,
    public clientService: ClientService,
    public appService: AppService,
    public loginService: LoginService,
    public dialogService: DialogService,
    public creditService: CreditService,
    private fb: FormBuilder,
    public pointAgenceService: PointAgenceService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.annees = this.loginService.allAnnees.map((device: any) => {
      return { ...device };
    });

    this.saisons = this.loginService.allSaisons.map((device: any) => {
      return { ...device };
    });

    this.pointAgences$ = this.store.pipe(
      select(
        fromPointsAgences.selectPointCustomListFromAgence(
          this.loginService.UserConnexion.user.userAgences.idAgence
        )
      )
    );

    if (this.loginService.UserConnexion.user.role.name === 'Societe') {
      this.pointAgences$ = this.store.pipe(
        select(
          fromPointsAgences.selectPointCustomListFromAgenceFromSociete(
            (this.loginService.UserConnexion.user.userSocietes as any)['id']
          )
        )
      );
    }
    if (this.loginService.UserConnexion.user.role.name === 'Agence') {
      this.pointAgences$ = this.store.pipe(
        select(
          fromPointsAgences.selectPointCustomListFromAgence(
            this.loginService.UserConnexion.user.userAgences.idAgence
          )
        )
      );
    }

    this.creditForm = this.fb.group({
      idCredit: [null],
      opCredit: ['', Validators.required],
      dateCredit: [new Date(), Validators.required],
      varieteCredit: ['', Validators.required],
      surfaceCredit: [0, Validators.required],
      uniteCredit: ['Ha', Validators.required],
      capitalCredit: [0, Validators.required],
      interetCredit: [0, Validators.required],
      moratoireCredit: [0, Validators.required],
      autresCredit: [0, Validators.required],
      idExploitation: [0],
      compteExploitation: [0],
      dateExploitation: [new Date(), Validators.required],
      // Add more fields as needed
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

    this.colsCreditCustom = [
      { field: 'id', header: 'ID', sort: false, filter: false },
      { field: 'dateCredit', header: 'DATE', sort: true, filter: true },
      {
        field: 'exploitationTypeOpName',
        header: 'FAMILLE',
        sort: true,
        filter: true,
      },
      { field: 'exploitationOpName', header: 'OP', sort: true, filter: true },
      {
        field: 'exploitationProduitName',
        header: 'SPECULATION',
        sort: true,
        filter: true,
      },
      {
        field: 'exploitationVarieteName',
        header: 'VARIETE',
        sort: true,
        filter: true,
      },
      { field: 'exigible', header: 'EXIGIBLE', sort: true, filter: true },
      {
        field: 'remboursementsMouvementSum',
        header: 'REMB.',
        sort: true,
        filter: true,
      },

      {
        field: 'tauxRemboursementMouvement',
        header: 'TAUX',
        sort: true,
        filter: true,
      },
    ];

    this.refreshPage();
  }

  applyFilter() {
    this.filteredAgences = this.agences.filter((item) =>
      item.name.toLowerCase().includes(this.filterTextAgence.toLowerCase())
    );
  }

  refreshPage() {
    this.loading = true;
    this.initDispatch();
    this.initSubscriptions();
  }

  private initDispatch(): void {
    this.store.dispatch(fromPointsAgences.getPointAgences());
    const myFilter: IFilter = {
      societeId: null,
      agenceId: null,
      anneeId: null,
      saisonId: null,
      opId: null,
    };

    myFilter.anneeId = this.appService.getLocalselectedCampagneAnneeId();
    //console.log('myFilter.anneeId: ', myFilter.anneeId);
    myFilter.saisonId = this.appService.getLocalselectedCampagneSaisonId();
    //console.log('myFilter.saisonId: ', myFilter.saisonId);
    myFilter.societeId = this.appService.getLocalselectedSocieteId();
    //console.log('myFilter.societeId: ', myFilter.societeId);

    console.log('myFilter before: ', myFilter);

    this.appService.removeNullProperties(myFilter);
    console.log('myFilter after: ', myFilter);

    this.store.dispatch(
      fromCredits.getAllCreditWithFilters({
        filter: {
          ...myFilter,
        },
      })
    );
  }

  private initSubscriptions(): void {
    this.creditsOnClientOnSociete$ = this.store.pipe(
      select(fromCredits.selecCustomCreditSocieteVarieteAnneeSaisonList)
    );

    this.creditWithFilters$ = this.store.pipe(
      select(fromCredits.selectCreditWithFiltersList)
    );

    console.time('Time this');
    this.pointAgencesSubscription = this.pointAgences$.subscribe({
      next: (datas: any[]) => {
        if (datas) {
          //console.log('pointAgence datas1: ', datas);
          this.pointAgences = datas.map((device: any) => {
            return { ...device };
          });

          const sourceObj = from(datas);
          const mappedObj = sourceObj.pipe(
            map((x) => {
              return {
                id: x.agence.id as number,
                name: x.agence.name as string,
                sigle: x.agence.sigle as string,
                societe: x.agence.societe as ISociete,
              };
            })
          );
          const SocieteSetDistincts = mappedObj.pipe(distinct((x) => x.id));

          this.agences = [];
          SocieteSetDistincts.forEach((item) => {
            this.agences.push({
              id: item.id,
              name: item.name,
              sigle: item.sigle,
              societe: item.societe,
            });
          });

          this.filteredAgences = [...this.agences];

          this.creditWithFiltersSubscription =
            this.creditWithFilters$.subscribe((datas: any[]) => {
              if (datas) {
                this.creditWithFilters = datas.map((device: any) => {
                  return { ...device };
                });

                console.log(
                  'this.creditWithFilters lenght: ',
                  this.creditWithFilters.length
                );
                /*
                console.log(
                  'this.creditWithFilters: ',
                  this.creditWithFilters
                );
                */
                this.pointAgences.forEach((item) => {
                  const filterCreditsOnClientOnSociete: ICreditCustom[] =
                    this.creditWithFilters.filter(
                      (myCreditCustom) =>
                        myCreditCustom.exploitationOpPointId === item.point.id
                    );
                  this.creditGroups[item.point.id] =
                    filterCreditsOnClientOnSociete;

                  let creditSumPointCapitals =
                    filterCreditsOnClientOnSociete.reduce(
                      (sum, credit) => sum + credit.capital,
                      0
                    );

                  let creditSumPointMoratoires =
                    filterCreditsOnClientOnSociete.reduce(
                      (sum, credit) => sum + credit.moratoire,
                      0
                    );
                  let creditSumPointInterets =
                    filterCreditsOnClientOnSociete.reduce(
                      (sum, credit) => sum + credit.interet,
                      0
                    );
                  let creditSumPointAutresEngagements =
                    filterCreditsOnClientOnSociete.reduce(
                      (sum, credit) => sum + credit.autres_engagements,
                      0
                    );
                  let creditSumPointRemboursements =
                    filterCreditsOnClientOnSociete.reduce(
                      (sum, credit) => sum + credit.remboursementsSum,
                      0
                    );
                  let creditSumPointExigibles =
                    creditSumPointCapitals +
                    creditSumPointMoratoires +
                    creditSumPointInterets +
                    creditSumPointAutresEngagements;

                  const mySumCreditPoint: ISumCredit = {
                    sumCapitals:
                      creditSumPointCapitals
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' F',
                    sumMoratoires:
                      creditSumPointMoratoires
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' F',
                    sumInterets:
                      creditSumPointInterets
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' F',
                    sumAutresEngagements:
                      creditSumPointAutresEngagements
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' F',
                    sumExigibles:
                      creditSumPointExigibles
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' F',
                    sumRemboursements:
                      creditSumPointRemboursements
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' F',
                  };
                  this.creditSumGroupsPoint[item.point.id] = mySumCreditPoint;
                });

                let creditSumSocieteCapitals = this.creditWithFilters.reduce(
                  (sum, credit) => sum + credit.capital,
                  0
                );

                let creditSumSocieteMoratoires = this.creditWithFilters.reduce(
                  (sum, credit) => sum + credit.moratoire,
                  0
                );
                let creditSumSocieteInterets = this.creditWithFilters.reduce(
                  (sum, credit) => sum + credit.interet,
                  0
                );
                let creditSumSocieteAutresEngagements =
                  this.creditWithFilters.reduce(
                    (sum, credit) => sum + credit.autres_engagements,
                    0
                  );
                let creditSumSocieteExigibles =
                  creditSumSocieteCapitals +
                  creditSumSocieteMoratoires +
                  creditSumSocieteInterets +
                  creditSumSocieteAutresEngagements;

                this.creditSumSociete.sumCapitals =
                  creditSumSocieteCapitals
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' F';
                this.creditSumSociete.sumMoratoires =
                  creditSumSocieteMoratoires
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' F';
                this.creditSumSociete.sumInterets =
                  creditSumSocieteInterets
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' F';
                this.creditSumSociete.sumAutresEngagements =
                  creditSumSocieteAutresEngagements
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' F';
                this.creditSumSociete.sumExigibles =
                  creditSumSocieteExigibles
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' F';

                this.loginService.titreSocieteSumCapital =
                  this.creditSumSociete.sumCapitals.toString();

                this.loginService.titreSocieteSumMoratoire =
                  this.creditSumSociete.sumMoratoires.toString();
                this.loginService.titreSocieteSumInteret =
                  this.creditSumSociete.sumInterets.toString();
                this.loginService.titreSocieteSumAutresEngagements =
                  this.creditSumSociete.sumAutresEngagements.toString();
                this.loginService.titreSocieteSumExigibles =
                  this.creditSumSociete.sumExigibles.toString();

                this.agences.forEach((item) => {
                  const filterCreditsOnClientOnAgenceFinancier: ICreditCustom[] =
                    this.creditWithFilters.filter(
                      (myCreditCustom) =>
                        myCreditCustom.exploitationOpPointAgenceId === item.id
                    );

                  //console.log(item.name, filterCreditsOnClientOnAgenceFinancier);

                  this.creditGroupsAgence[item.id] =
                    filterCreditsOnClientOnAgenceFinancier;

                  let creditSumAgenceCapitals =
                    filterCreditsOnClientOnAgenceFinancier.reduce(
                      (sum, credit) => sum + credit.capital,
                      0
                    );

                  let creditSumAgenceMoratoires =
                    filterCreditsOnClientOnAgenceFinancier.reduce(
                      (sum, credit) => sum + credit.moratoire,
                      0
                    );
                  let creditSumAgenceInterets =
                    filterCreditsOnClientOnAgenceFinancier.reduce(
                      (sum, credit) => sum + credit.interet,
                      0
                    );
                  let creditSumAgenceAutresEngagements =
                    filterCreditsOnClientOnAgenceFinancier.reduce(
                      (sum, credit) => sum + credit.autres_engagements,
                      0
                    );
                  let creditSumAgenceRemboursements =
                    filterCreditsOnClientOnAgenceFinancier.reduce(
                      (sum, credit) => sum + credit.remboursementsSum,
                      0
                    );
                  let creditSumAgenceExigibles =
                    creditSumAgenceCapitals +
                    creditSumAgenceMoratoires +
                    creditSumAgenceInterets +
                    creditSumAgenceAutresEngagements;

                  const mySumCreditAgence: ISumCredit = {
                    sumCapitals:
                      creditSumAgenceCapitals
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' F',
                    sumMoratoires:
                      creditSumAgenceMoratoires
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' F',
                    sumInterets:
                      creditSumAgenceInterets
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' F',
                    sumAutresEngagements:
                      creditSumAgenceAutresEngagements
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' F',
                    sumExigibles:
                      creditSumAgenceExigibles
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' F',
                    sumRemboursements:
                      creditSumAgenceRemboursements
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' F',
                  };
                  this.creditSumGroupsAgence[item.id] = mySumCreditAgence;
                });
              }
            });

          // console.log('this.creditGroups: ', this.creditGroups);
          // console.table(this.creditGroups);
        }
        setTimeout(() => {
          this.loading = false;
        }, 1500);
      },

      error: (error) => {
        console.error('Error loading data:', error);
      },
      complete: () =>
        console.log('Observable emitted the complete notification'),
    });
    console.timeEnd('Time this');
  }
  onDialogHideRemboursements() {
    console.log('Dialog Remboursements is closed');
    this.displayRemboursements = false;
  }
  onDialogHide() {
    console.log('Dialog is closed');
    this.viderCredit();
    this.display = false;
    if (this.isEditedCredit) {
      this.refreshPage();
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

  onSelectItemGroupVariete(event: any) {
    this.selectedVariete = event.value;
    // console.log(event.value);
    localStorage.setItem('selectedVarieteId', event.value.id.toString());
    localStorage.setItem('selectedVarieteName', event.value.name.toString());
    this.selectedVarieteId = event.value.id.toString();
    this.loginService.mySelectedVariete = event.value;
    this.refreshPage();
  }

  filterOp(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    let colonnesOps = this.ops.map(({ id, name }) => ({ id, name }));
    // console.log('this.ops: ', this.ops);
    for (let i = 0; i < (colonnesOps as any[]).length; i++) {
      let op = (colonnesOps as any[])[i];

      if (op.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(op);
      }
    }

    this.filteredOps = filtered;
  }

  remboursementsFromExploitation(exploitationId: number) {
    this.mesRemboursements$ = this.store.select(
      fromRemboursements.selectRemboursementsListFromExploitation(
        exploitationId
      )
    );
    this.mesRemboursementsSubscription = this.mesRemboursements$.subscribe(
      (datas: any[]) => {
        if (datas) {
          this.mesRemboursements = datas.map((device: any) => {
            return { ...device };
          });
          // console.table(this.mesRemboursements);
        }
      }
    );
  }

  onSelectOp(event: any) {
    console.log('this.selectedOp: ', event);
  }

  creditsOnClientOnPoint(pointId: number) {
    this.creditsOnPoint$ = this.store.pipe(
      select(
        fromCredits.selectCreditsCustomListFromPointAnneeSaison(
          pointId,
          this.loginService.selectedCampagne.annee.id,
          this.loginService.selectedCampagne.saison.id
        )
      )
    );
    this.creditsOnPointSubscription = this.creditsOnPoint$.subscribe(
      (datas: any[]) => {
        //console.log('creditsOnPoint: ', datas);
        if (datas) {
          return datas;
        } else {
          return null;
        }
      }
    );
  }

  sumCapitalsFromPoint = (pointId: number): string => {
    const sumOfValues$ = this.store.select(
      fromCredits.sumCapitalsFromPoint(
        pointId,
        this.loginService.selectedCampagne.annee.id,
        this.loginService.selectedCampagne.saison.id
      )
    );
    let valeur = 0;
    sumOfValues$.subscribe((data: any) => {
      if (data) {
        valeur = valeur + data;
      }
    });
    return valeur.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' F';
  };

  sumCapitalsFromAgenceFinancier = (agenceId: number): string => {
    const sumOfValues$ = this.store.select(
      fromCredits.sumCapitalsFromAgence(
        agenceId,
        this.loginService.selectedCampagne.annee.id,
        this.loginService.selectedCampagne.saison.id
      )
    );
    let valeur = 0;
    sumOfValues$.subscribe((data: any) => {
      if (data) {
        valeur = valeur + data;
      }
    });
    return valeur.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' F';
  };

  sumMoratoiresFromPoint = (pointId: number): string => {
    const sumOfValues$ = this.store.select(
      fromCredits.sumMoratoiresFromPoint(
        pointId,
        this.loginService.selectedCampagne.annee.id,
        this.loginService.selectedCampagne.saison.id
      )
    );
    let valeur = 0;
    sumOfValues$.subscribe((data: any) => {
      if (data) {
        valeur = valeur + data;
      }
    });
    return valeur.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' F';
  };

  sumInteretsFromPoint = (pointId: number): string => {
    const sumOfValues$ = this.store.select(
      fromCredits.sumInteretsFromPoint(
        pointId,
        this.loginService.selectedCampagne.annee.id,
        this.loginService.selectedCampagne.saison.id
      )
    );
    let valeur = 0;
    sumOfValues$.subscribe((data: any) => {
      if (data) {
        valeur = valeur + data;
      }
    });
    return valeur.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' F';
  };

  sumAutresEngagementsFromPoint = (pointId: number): string => {
    const sumOfValues$ = this.store.select(
      fromCredits.sumAutresEngagementsFromPoint(
        pointId,
        this.loginService.selectedCampagne.annee.id,
        this.loginService.selectedCampagne.saison.id
      )
    );
    let valeur = 0;
    sumOfValues$.subscribe((data: any) => {
      if (data) {
        valeur = valeur + data;
      }
    });
    return valeur.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' F';
  };

  sumExigiblesFromPoint = (pointId: number): string => {
    const sumOfValues$ = this.store.select(
      fromCredits.sumExigibleFromPoint(
        pointId,
        this.loginService.selectedCampagne.annee.id,
        this.loginService.selectedCampagne.saison.id
      )
    );
    let valeur = 0;
    sumOfValues$.subscribe((data: any) => {
      if (data) {
        valeur = valeur + data;
      }
    });
    return valeur.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' F';
  };
  saveExploitation() {
    this.submitted = true;
    if (this.exploitation.id) {
      let body: any = {};
      body.action = 'update';
      body.id = this.credit.id;

      body.societe = this.societe;
      body.societe.id = this.societe.id;
      body.exploitation = this.exploitation;
      body.exploitation.id = this.exploitation.id;

      body.exploitation.date = moment(this.credit.date).format('YYYY-MM-DD');
      body.capital = this.credit.capital;
      body.interet = this.credit.interet;
      body.moratoire = this.credit.moratoire;
      body.autres_engagements = this.credit.autres_engagements;

      console.log('body --- ', body);

      /* UPDATE CREDIT */
      //this.store.dispatch(fromCredits.updateCredit({ body }));
      this.viderCredit();
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Poinnt Service Updated',
        life: 3000,
      });
    } else {
      let body: any = {};
      body.action = 'add';
      body.societe = this.societe;
      body.societe.id = this.societe.id;
      body.exploitation = this.exploitation;
      body.exploitation.id = this.exploitation.id;

      body.exploitation.date = moment(this.credit.date).format('YYYY-MM-DD');
      body.capital = this.credit.capital;
      body.interet = this.credit.interet;
      body.moratoire = this.credit.moratoire;
      body.autres_engagements = this.credit.autres_engagements;

      console.log('body --- ', body);
      /* ADD NEW CREDI */
      // this.store.dispatch(fromCredits.createCredit({ body }));
      this.viderCredit();
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Point Service Created',
        life: 3000,
      });
    }
    this.creditWithFilters = [...this.creditWithFilters];
  }

  parseIntValue(value: string): number {
    return parseInt(value, 10);
  }
  fillerPointByAgence(idAgence: number) {
    const retourPoint: IPointAgence[] = this.pointAgences.filter(
      (point) => point.agence.id === idAgence
    );

    return retourPoint;
  }

  formatMontant(montant: number) {
    return montant.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' F';
  }

  convertirEnDate(chaineDate: string): Date | null {
    const parties = chaineDate.split('/');
    if (parties.length === 3) {
      const jour = parseInt(parties[0], 10);
      const mois = parseInt(parties[1], 10) - 1; // Soustraire 1 car les mois sont indexés à partir de zéro
      const annee = parseInt(parties[2], 10);

      if (!isNaN(jour) && !isNaN(mois) && !isNaN(annee)) {
        // console.log('date: ', new Date(annee, mois, jour));
        return new Date(annee, mois, jour);
      }
    }

    console.error('Format de date invalide');
    return null;
  }

  getTotalExigibles(myTabClients: any): number {
    if (myTabClients.filteredValue) {
      //return myTabClients.filteredValue.length;
      return (
        myTabClients.filteredValue
          ?.map((item: { exigible: any }) => item.exigible)
          ?.reduce((a: any, b: any) => a + b, 0) || 0
      );
    } else {
      return (
        myTabClients.value
          ?.map((item: { exigible: any }) => item.exigible)
          ?.reduce((a: any, b: any) => a + b, 0) || 0
      );
    }
  }

  getTotalExigiblesAgence(myTabClients: any): number {
    return (
      myTabClients
        .map((item: { exigible: any }) => item.exigible)
        ?.reduce((a: any, b: any) => a + b, 0) || 0
    );
  }
  getTotalRemboursements(myTabClients: any): number {
    if (myTabClients.filteredValue) {
      //return myTabClients.filteredValue.length;
      return (
        myTabClients.filteredValue
          ?.map((item: { remboursementsSum: any }) => item.remboursementsSum)
          ?.reduce((a: any, b: any) => a + b, 0) || 0
      );
    } else {
      return (
        myTabClients.value
          ?.map((item: { remboursementsSum: any }) => item.remboursementsSum)
          ?.reduce((a: any, b: any) => a + b, 0) || 0
      );
    }
  }

  getTotalRemboursementsMouvementAgence(myTabClients: any): number {
    return (
      myTabClients
        .map(
          (item: { remboursementsMouvementSum: any }) =>
            item.remboursementsMouvementSum
        )
        ?.reduce((a: any, b: any) => a + b, 0) || 0
    );
  }
  getTotalRemboursementsMouvement(myTabClients: any): number {
    if (myTabClients.filteredValue) {
      return (
        myTabClients.filteredValue
          ?.map(
            (item: { remboursementsMouvementSum: any }) =>
              item.remboursementsMouvementSum
          )
          ?.reduce((a: any, b: any) => a + b, 0) || 0
      );
    } else {
      return (
        myTabClients.value
          ?.map(
            (item: { remboursementsMouvementSum: any }) =>
              item.remboursementsMouvementSum
          )
          ?.reduce((a: any, b: any) => a + b, 0) || 0
      );
    }
  }

  getTauxRemboursements(myTabClients: any): number {
    let taux = 0;
    if (this.getTotalExigibles(myTabClients) !== 0) {
      taux =
        (this.getTotalRemboursements(myTabClients) /
          this.getTotalExigibles(myTabClients)) *
        100;
    }
    return taux;
  }

  getTauxRemboursementsMouvement(myTabClients: any): number {
    let taux = 0;
    if (this.getTotalExigibles(myTabClients) !== 0) {
      taux =
        (this.getTotalRemboursementsMouvement(myTabClients) /
          this.getTotalExigibles(myTabClients)) *
        100;
    }
    return taux;
  }
  getTauxRemboursementsMouvementAgence(myTabClients: any): number {
    let taux = 0;
    /*
    console.log(myTabClients);
    console.log(this.getTotalExigiblesAgence(myTabClients));
    console.log(this.getTotalRemboursementsMouvementAgence(myTabClients));
    */
    if (this.getTotalExigiblesAgence(myTabClients) !== 0) {
      taux =
        (this.getTotalRemboursementsMouvementAgence(myTabClients) /
          this.getTotalExigiblesAgence(myTabClients)) *
        100;
    }
    return taux;
  }

  supprimerCredit() {
    let body: any = {};
    body.action = 'delete';
    body.id = this.creditForm.controls['idCredit']['value'];
    body.date = this.creditForm.controls['dateCredit']['value'].toISOString();
    body.capital = this.creditForm.controls['capitalCredit']['value'];
    body.interet = this.creditForm.controls['interetCredit']['value'];
    body.moratoire = this.creditForm.controls['moratoireCredit']['value'];
    body.autres_engagements = this.creditForm.controls['autresCredit']['value'];
    body.genceId = this.loginService.UserConnexion.user.userAgences.idAgence;
    body.exploitationId = this.creditForm.controls['idExploitation']['value'];
    console.log('body exploitation --- ', body);
    this.store.dispatch(fromCredits.deleteCredit({ body }));

    body = {};
    body.action = 'delete';

    body.id = this.creditForm.controls['idExploitation']['value'];
    body.compte = this.creditForm.controls['compteExploitation']['value'];
    body.date =
      this.creditForm.controls['dateExploitation']['value'].toISOString();
    body.unite = this.creditForm.controls['uniteCredit']['value'];
    body.surface = this.creditForm.controls['surfaceCredit']['value'];
    body.varieteId = this.creditForm.controls['varieteCredit']['value']['id'];
    body.anneeId = this.loginService.selectedCampagne.annee.id;
    body.saisonId = this.loginService.selectedCampagne.saison.id;
    body.producteurId = 0;
    body.opId = this.creditForm.controls['opCredit']['value']['id'];
    console.log('body credit --- ', body);
    this.store.dispatch(fromExploitations.deleteExploitation({ body }));

    console.log('body --- ', body);
    /* UPDATE CREDIT */
    this.onDialogHide();
    // this.msgs = [{severity:'info', summary:'Confirmed', detail:'Modification effectuée'}];
    this.messageService.add({
      severity: 'danger',
      summary: 'Successful',
      detail: 'credit Deleted',
      life: 3000,
    });
  }
  modifierCredit() {
    let body: any = {};
    body.action = 'update';
    body.id = this.creditForm.controls['idCredit']['value'];
    body.date = this.creditForm.controls['dateCredit']['value'].toISOString();
    body.capital = this.creditForm.controls['capitalCredit']['value'];
    body.interet = this.creditForm.controls['interetCredit']['value'];
    body.moratoire = this.creditForm.controls['moratoireCredit']['value'];
    body.autres_engagements = this.creditForm.controls['autresCredit']['value'];
    body.genceId = this.loginService.UserConnexion.user.userAgences.idAgence;
    body.exploitationId = this.creditForm.controls['idExploitation']['value'];
    console.log('body exploitation --- ', body);
    this.store.dispatch(fromCredits.updateCredit({ body }));

    body = {};
    body.action = 'update';

    body.id = this.creditForm.controls['idExploitation']['value'];
    body.compte = this.creditForm.controls['compteExploitation']['value'];
    body.date =
      this.creditForm.controls['dateExploitation']['value'].toISOString();
    body.unite = this.creditForm.controls['uniteCredit']['value'];
    body.surface = this.creditForm.controls['surfaceCredit']['value'];
    body.varieteId = this.creditForm.controls['varieteCredit']['value']['id'];
    body.anneeId = this.loginService.selectedCampagne.annee.id;
    body.saisonId = this.loginService.selectedCampagne.saison.id;
    //body.producteurId = 0;
    body.opId = this.creditForm.controls['opCredit']['value']['id'];
    console.log('body credit --- ', body);
    this.store.dispatch(fromExploitations.updateExploitation({ body }));

    console.log('body --- ', body);
    /* UPDATE CREDIT */
    this.onDialogHide();
    // this.msgs = [{severity:'info', summary:'Confirmed', detail:'Modification effectuée'}];
    this.messageService.add({
      severity: 'warning',
      summary: 'Successful',
      detail: 'credit Updated',
      life: 3000,
    });
  }
  ajouterCredit() {
    console.log(
      'idProduit: ',
      this.creditForm.controls['varieteCredit']['value']['produit']['id']
    );
    const compteValue$ = this.store.select(
      fromExploitations.selectExploitationByFilter(
        this.loginService.selectedCampagne.annee.id,
        this.loginService.selectedCampagne.saison.id,
        this.creditForm.controls['varieteCredit']['value']['produit']['id']
      )
    );
    compteValue$.subscribe((data: any) => {
      if (data) {
        this.newCompte = data;
      }
      console.log('newCompte: ', this.newCompte);
    });
    let body: any = {};
    body.action = 'add';
    body.date = this.creditForm.controls['dateCredit']['value'].toISOString();
    body.capital = this.creditForm.controls['capitalCredit']['value'];
    body.interet = this.creditForm.controls['interetCredit']['value'];
    body.moratoire = this.creditForm.controls['moratoireCredit']['value'];
    body.autres_engagements = this.creditForm.controls['autresCredit']['value'];
    body.agenceId = this.loginService.UserConnexion.user.userAgences.idAgence;
    body.compte = this.newCompte;
    body.exploitationId = this.creditForm.controls['idExploitation']['value'];
    body.dateExploitation =
      this.creditForm.controls['dateExploitation']['value'].toISOString();
    body.unite = 'Ha';
    body.surface = this.creditForm.controls['surfaceCredit']['value'];
    body.varieteId = this.creditForm.controls['varieteCredit']['value']['id'];
    body.anneeId = this.loginService.selectedCampagne.annee.id;
    body.saisonId = this.loginService.selectedCampagne.saison.id;
    //body.producteurId = 0;
    body.opId = this.creditForm.controls['opCredit']['value']['id'];
    console.log('body --- ', body);
    /* ADD NEW CREDIT */
    this.store.dispatch(fromCredits.createExploitationCredit({ body }));
    this.viderCredit();
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Credit Created',
      life: 3000,
    });
  }
  onSaveCredit() {
    this.submitted = true;
    if (this.creditOnClient.id) {
      if (this.actionSave == 'update') {
        this.confirmationService.confirm({
          message: 'Êtes-vous sûr de vouloir modifier ce credit?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.modifierCredit();
          },
          reject: () => {
            this.msgs = [
              {
                severity: 'warning',
                summary: 'Annulation',
                detail: 'Vous avez annulé la modification',
                life: 2000,
              },
            ];
          },
        });
      } else if (this.actionSave == 'delete') {
        this.confirmationService.confirm({
          message: 'Êtes-vous sûr de vouloir supprimer ce credit?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.supprimerCredit();
          },
          reject: () => {
            this.msgs = [
              {
                severity: 'danger',
                summary: 'Annulation',
                detail: 'Vous avez annulé la suppression',
                life: 2000,
              },
            ];
          },
        });
      }
    } else {
      this.ajouterCredit();
    }
    this.creditWithFilters = [...this.creditWithFilters];
    this.exploitations = [...this.exploitations];
    this.isEditedCredit = true;
  }

  viderCredit() {
    this.creditForm.reset();
    this.creditForm.controls['idCredit'].patchValue(0);
    this.creditForm.controls['dateCredit'].patchValue(new Date());
    this.creditForm.controls['capitalCredit'].patchValue(0);
    this.creditForm.controls['interetCredit'].patchValue(0);
    this.creditForm.controls['moratoireCredit'].patchValue(0);
    this.creditForm.controls['autresCredit'].patchValue(0);
    this.creditForm.controls['dateExploitation'].patchValue(new Date());
    this.creditForm.controls['idExploitation'].patchValue(0);
    this.creditForm.controls['compteExploitation'].patchValue(0);
    this.creditForm.controls['surfaceCredit'].patchValue(0);
    this.creditForm.controls['uniteCredit'].patchValue('Ha');
    this.initDispatch();
  }

  showDialogCredit(action: string, creditOnClient: ICreditCustom) {
    this.display = true;
    this.isEditedCredit = false;
    if (action === 'add') {
      this.titleDialogCredit = 'AJOUTER UN CREDIT';
      this.labelSave = 'Ajouter';
      this.classSave = 'p-button-text; p-button-success';
      this.actionSave = 'add';
      this.isCompteCreated = false;
    } else if (action === 'update') {
      this.isCompteCreated = true;
      this.titleDialogCredit = 'MODIFIER UN CREDIT';
      this.labelSave = 'Modifier';
      this.classSave = 'p-button-text; p-button-warning';
      this.actionSave = 'update';
      this.creditOnClient = { ...creditOnClient };
      console.log(' this.creditOnClient    --- ', creditOnClient);
      this.creditForm.controls['idCredit'].patchValue(creditOnClient.id);
      this.creditForm.controls['dateCredit'].patchValue(
        this.convertirEnDate(creditOnClient.dateCredit.toString())
      );
      // this.creditForm.controls['capitalCredit'].patchValue(creditOnClient.capital);
      this.creditForm.controls['capitalCredit'].patchValue(
        creditOnClient.capital
      );
      this.creditForm.controls['interetCredit'].patchValue(
        creditOnClient.interet
      );
      this.creditForm.controls['moratoireCredit'].patchValue(
        creditOnClient.moratoire
      );
      this.creditForm.controls['autresCredit'].patchValue(
        creditOnClient.autres_engagements
      );
      // this.creditForm.controls['dateExploitation'].patchValue(creditOnClient.exploitationDate);
      this.creditForm.controls['dateExploitation'].patchValue(
        this.convertirEnDate(creditOnClient.exploitationDate.toString())
      );
      this.creditForm.controls['idExploitation'].patchValue(
        creditOnClient.exploitationId
      );
      this.creditForm.controls['compteExploitation'].patchValue(
        creditOnClient.exploitationCompte
      );
      this.creditForm.controls['surfaceCredit'].patchValue(
        creditOnClient.exploitationSurface
      );
      this.creditForm.controls['uniteCredit'].patchValue(
        creditOnClient.exploitationUnite
      );
      const myVariete: IVariete = {
        id: creditOnClient.exploitationVarieteId,
        name: creditOnClient.exploitationVarieteName,
        surface_unite: creditOnClient.exploitationVarieteSurfaceUnite,
        quantite_unite: creditOnClient.exploitationVarieteQuantiteUnite,
        rendement_unite: creditOnClient.exploitationVarieteRendementUnite,
        isActive: true,
        produit: {
          id: creditOnClient.exploitationProduitId,
          name: creditOnClient.exploitationProduitName,
          isDerive: false,
          isEnsachage: false,
          isActive: true,
          filiere: {
            id: creditOnClient.exploitationFiliereId,
            name: creditOnClient.exploitationFiliereName,
          },
          familleEmplacement: {
            id: creditOnClient.exploitationFamilleEmplacemenId,
            name: creditOnClient.exploitationFamilleEmplacementName,
          },
        },
      };
      const myOp: any = {
        id: creditOnClient.exploitationOpId,
        name: creditOnClient.exploitationOpName,
      };
      //console.log('myOp    --- ', myOp);
      this.creditForm.controls['varieteCredit'].patchValue(myVariete);
      //console.log('opCredit    --- ', myOp);
      this.creditForm.controls['opCredit'].patchValue(myOp);
      console.log('this.creditForm: ', this.creditForm);
    } else if (action === 'view') {
      this.titleDialogCredit = 'CONSULTER UN CREDIT';
      this.labelSave = 'view';
    } else if (action === 'delete') {
      this.titleDialogCredit = 'SUPPRIMER UN CREDIT';
      this.actionSave = 'delete';
      this.labelSave = 'Supprimer';
      this.classSave = 'p-button-text; p-button-danger';
      this.creditOnClient = { ...creditOnClient };
      console.log(' this.creditOnClient    --- ', creditOnClient);
      this.creditForm.controls['idCredit'].patchValue(creditOnClient.id);
      this.creditForm.controls['dateCredit'].patchValue(
        this.convertirEnDate(creditOnClient.dateCredit.toString())
      );
      // this.creditForm.controls['capitalCredit'].patchValue(creditOnClient.capital);
      this.creditForm.controls['capitalCredit'].patchValue(
        creditOnClient.capital
      );
      this.creditForm.controls['interetCredit'].patchValue(
        creditOnClient.interet
      );
      this.creditForm.controls['moratoireCredit'].patchValue(
        creditOnClient.moratoire
      );
      this.creditForm.controls['autresCredit'].patchValue(
        creditOnClient.autres_engagements
      );
      // this.creditForm.controls['dateExploitation'].patchValue(creditOnClient.exploitationDate);
      this.creditForm.controls['dateExploitation'].patchValue(
        this.convertirEnDate(creditOnClient.exploitationDate.toString())
      );
      this.creditForm.controls['idExploitation'].patchValue(
        creditOnClient.exploitationId
      );
      this.creditForm.controls['compteExploitation'].patchValue(
        creditOnClient.exploitationCompte
      );
      this.creditForm.controls['surfaceCredit'].patchValue(
        creditOnClient.exploitationSurface
      );
      this.creditForm.controls['uniteCredit'].patchValue(
        creditOnClient.exploitationUnite
      );
      const myVariete: IVariete = {
        id: creditOnClient.exploitationVarieteId,
        name: creditOnClient.exploitationVarieteName,
        surface_unite: creditOnClient.exploitationVarieteSurfaceUnite,
        quantite_unite: creditOnClient.exploitationVarieteQuantiteUnite,
        rendement_unite: creditOnClient.exploitationVarieteRendementUnite,
        isActive: true,
        produit: {
          id: creditOnClient.exploitationProduitId,
          name: creditOnClient.exploitationProduitName,
          isDerive: false,
          isEnsachage: false,
          isActive: true,
          filiere: {
            id: creditOnClient.exploitationFiliereId,
            name: creditOnClient.exploitationFiliereName,
          },
          familleEmplacement: {
            id: creditOnClient.exploitationFamilleEmplacemenId,
            name: creditOnClient.exploitationFamilleEmplacementName,
          },
        },
      };
      const myOp: any = {
        id: creditOnClient.exploitationOpId,
        name: creditOnClient.exploitationOpName,
      };
      console.log('myOp    --- ', myOp);
      this.creditForm.controls['varieteCredit'].patchValue(myVariete);
      console.log('opCredit    --- ', myOp);
      this.creditForm.controls['opCredit'].patchValue(myOp);
      this.creditForm.disable();
    }
  }
  showDialogExploitation(creditOnClient: ICreditCustom) {
    console.log('creditOnClient: ', creditOnClient);
    this.loginService.exploitationId = creditOnClient.exploitationId;
    localStorage.setItem(
      'selectedOpId',
      creditOnClient.exploitationOpId.toString()
    );
    localStorage.setItem(
      'selectedOpName',
      creditOnClient.exploitationTypeOpName.toString() +
        ' ' +
        creditOnClient.exploitationOpName.toString()
    );
  }

  estFormulaireValide() {
    return this.creditForm.valid;
  }
  formatDate(date: Date) {
    const dateObject = new Date(date);
    const formattedDate = dateObject.toLocaleDateString('fr-FR');
    return formattedDate;
  }

  allerSuivant() {
    this.dialogPageIndex = this.dialogPageIndex + 1;
  }
  allerAvant() {
    this.dialogPageIndex = this.dialogPageIndex - 1;
  }
}

export interface IFilter {
  societeId: number | null;
  agenceId: number | null;
  anneeId: number | null;
  saisonId: string | null;
  opId: number | null;
}
