import { AppService } from './../../../services/app.service';
import { LoaderService } from './../../../services/loader.service';
import { Component, ElementRef, ViewChild, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Observable,
  Subject,
  Subscription,
  of,
  switchMap,
  takeUntil,
} from 'rxjs';
import {
  ICredit,
  ICreditCustom,
  IExploitationCredit,
  IMouvementStockage,
  IRemboursement,
  ISumCredit,
} from '../../../interfaces/credit.interface';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { StepsModule } from 'primeng/steps';
import { PanelModule } from 'primeng/panel';
import { MessageModule } from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import {
  LazyLoadEvent,
  SortEvent,
  MessageService,
  ConfirmationService,
  MenuItem,
  SharedModule,
  Message,
} from 'primeng/api';
import { Store, select } from '@ngrx/store';
import * as fromCredits from '../../../store/credit';
import * as fromOps from '../../../store/op';
import * as fromExploitations from '../../../store/exploitation';
import * as fromPointAgences from '../../../store/point_agence';
import * as fromRemboursements from '../../../store/remboursement';
import * as fromMouvementStockages from '../../../store/mouvement_stockage';
import moment from 'moment';

import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ChipModule } from 'primeng/chip';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule, Button } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectItemGroup } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { NgIf, NgFor, NgSwitch, NgSwitchDefault } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ClientService } from '../../../services/client.service';
import { CreditService } from '../../../services/credit.service';
import { LoginService } from '../../../services/login.service';
// import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { IOp } from './../../../interfaces/op.interface';
import { IAnnee } from '../../..//interfaces/annee.interface';
import { ISaison } from '../../../interfaces/saison.interface';
import { ICampagne } from '../../../interfaces/campagne.interface';
import { Item, SelectItem } from '../../../interfaces/selectitem.interface';

import { Location } from '@angular/common';
import { IProduit, IVariete } from '../../../interfaces/filiere.interface';

import { IExploitation } from '../../../interfaces/exploitation.interface';
import { ProgressBarModule } from 'primeng/progressbar';
import { ExploitationComponent } from '../exploitation/exploitation.component';
import { DialogExploitationComponent } from './dialog-exploitation/dialog-exploitation.component';
import { CreditCampagneTitreComponent } from '../credit-campagne-titre/credit-campagne-titre.component';
import { ISociete } from '../../../interfaces/societe.interface';
import { IPointAgence } from '../../../interfaces/point-agence.interface';
import { PointAgenceService } from '../../../services/point-agence.service';

export enum PageNames {
  DebutPage,
  FinPage,
}

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-credit-campagne',
  standalone: true,
  templateUrl: './credit-campagne.component.html',
  styleUrls: ['./credit-campagne.component.css'],
  imports: [
    
// TODO: `HttpClientModule` should not be imported into a component directly.
// Please refactor the code to add `provideHttpClient()` call to the provider list in the
// application bootstrap logic and remove the `HttpClientModule` import from this component.
HttpClientModule,
    ProgressSpinnerModule,
    ProgressBarModule,
    ButtonModule,
    ConfirmDialogModule,
    MessageModule,
    MessagesModule,
    PanelModule,
    FormsModule,
    ReactiveFormsModule,
    StepsModule,
    DialogModule,
    CommonModule,
    InputTextModule,
    DropdownModule,
    TableModule,
    ChipModule,
    CardModule,
    AccordionModule,
    AutoCompleteModule,
    FieldsetModule,
    InputTextModule,
    CalendarModule,
    InputNumberModule,
    TooltipModule,
    ButtonModule,
    ToolbarModule,
    NgIf,
    NgFor,
    NgSwitch,
    NgSwitchDefault,
    ToastModule,
    CreditCampagneTitreComponent,
  ],
})
export class CreditCampagneComponent {
  colsCredit: any[] = [];
  colsCreditCustom: any[] = [];
  colsRemboursements: any[] = [];
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

  varietes: IVariete[] = [];
  selectedVarieteId: number | undefined;
  produitDict: { [key: string]: IVariete[] } = {};

  selectItemGroupVarietes: SelectItem[] = [];
  //selectedVariete!: Item ;
  selectedVariete: IVariete | undefined;

  campagnes$!: Observable<ICampagne[]>;
  campagnes: ICampagne[] = [];
  selectedCampagne: ICampagne | undefined;

  saisons: ISaison[] = [];
  selectedSaison: ISaison | undefined;

  societes$!: Observable<ISociete[]>;
  societes: ISociete[] = [];
  societe: any = {};
  selectedSociete: ISociete | undefined;

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

  creditsOnClient$!: Observable<ICreditCustom[]>;
  private creditsOnClientSubscription: Subscription | undefined;
  creditsOnClient: ICreditCustom[] = [];
  creditOnClient: any = {};
  selectedCreditsOnClient: ICreditCustom[] | undefined;

  creditsOnPoint$!: Observable<ICreditCustom[]>;
  private creditsOnPointSubscription: Subscription | undefined;
  creditsOnPoint: ICreditCustom[] = [];

  creditGroups: { [pointId: number]: ICreditCustom[] } = {};
  creditSumGroups: { [pointId: number]: ISumCredit } = {};
  creditSumAgence: ISumCredit = {
    sumCapitals: '0 FCFA',
    sumMoratoires: '0 FCFA',
    sumInterets: '0 FCFA',
    sumAutresEngagements: '0 FCFA',
    sumExigibles: '0 FCFA',
    sumRemboursements: '0 FCFA',
  };

  pointsCollectesFromAgence$!: Observable<IPointAgence[]>;
  private pointsCollectesFromAgenceSubscription: Subscription | undefined;
  pointsCollectesFromAgence: IPointAgence[] = [];
  pointFromAgence: any = {};
  selectedpointsCollectesFromAgence: IPointAgence[] | undefined;

  credits$!: Observable<ICredit[]>;
  private creditsSubscription: Subscription | undefined;
  credits: ICredit[] = [];
  //credit: any = {};
  selectedCredits: ICredit[] | undefined;
  isLoading$: Observable<boolean> | undefined;

  creditWithFilters$!: Observable<ICreditCustom[]>;
  private creditWithFiltersSubscription: Subscription | undefined;
  creditWithFilters: ICreditCustom[] = [];
  credit: any = {};
  selectedcreditWithFilters: ICreditCustom[] | undefined;

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

  // remboursementsGroupsExploitation: { [exploitationId: number]: IRemboursement[] } = {};

  remboursementsGroupsExploitation: {
    [exploitationId: number]: IRemboursement[] & { somme?: number };
  } = {};

  mouvementStockages$!: Observable<IMouvementStockage[]>;
  private mouvementStockagesSubscription: Subscription | undefined;
  mouvementStockages: IMouvementStockage[] = [];
  mouvementStockage: any = {};
  selectedmouvementStockages: IMouvementStockage[] | undefined;

  mesMouvementStockages$!: Observable<IMouvementStockage[]>;
  private mesMouvementStockagesSubscription: Subscription | undefined;
  mesMouvementStockages: IMouvementStockage[] = [];
  monMouvementStockage: any = {};
  selectedmesMouvementStockages: IMouvementStockage[] | undefined;
  mouvementStockagesGroupsExploitation: {
    [exploitationId: number]: IMouvementStockage[] & { somme?: number };
  } = {};

  mouvementStockagesProduitCampagne$!: Observable<IMouvementStockage[]>;
  private mouvementStockagesProduitCampagneSubscription:
    | Subscription
    | undefined;
  mouvementStockagesProduitCampagne: IMouvementStockage[] = [];
  mouvementStockageProduitCampagne: any = {};
  selectedmouvementStockagesProduitCampagne: IMouvementStockage[] | undefined;

  mesMouvementStockagesProduitCampagne$!: Observable<IMouvementStockage[]>;
  private mesMouvementStockagesProduitCampagneSubscription:
    | Subscription
    | undefined;
  mesMouvementStockagesProduitCampagne: IMouvementStockage[] = [];
  monMouvementStockageProduitCampagne: any = {};
  selectedmesMouvementStockagesProduitCampagne:
    | IMouvementStockage[]
    | undefined;
  mouvementStockagesProduitCampagneGroupsExploitation: {
    [exploitationId: number]: IMouvementStockage[] & { somme?: number };
  } = {};

  selectedOp: any;

  filteredOps: any[] | undefined;

  ops$: Observable<IOp[]> | undefined;
  ops: IOp[] = [];
  op: any = {};
  selectedOps: IOp[] | undefined;

  mesOps: IOp[] = [];

  sumPoints: Array<{ id: number; sum: string }> = [];
  display: boolean = false;
  displayRemboursements: boolean = false;
  titleDialogCredit: string = '';
  titleDialogRemboursements: string = '';
  iconeSave: string = 'pi pi-save';

  displayMouvementStockages: boolean = false;
  titleDialogRMouvementStockages: string = '';

  displayExploitation: boolean = false;

  labelSave: string = 'Save';
  classSave: string = 'p-button-text; p-button-success';
  actionSave: string = 'add';

  creditForm: FormGroup;

  newCompte: string = '';
  titreCompte: string = "COMPTE D'EXPLOITATION";
  isEditedCredit: boolean = false;
  isCompteCreated: boolean = false;

  tableCreditsFilters: { [s: string]: any } = {};

  msgs: Message[] = [];
  ref: DynamicDialogRef | undefined;

  selectedSaisonId = this.appService.getLocalselectedCampagneSaisonId();
  selectedAnneeId = this.appService.getLocalselectedCampagneAnneeId();

  constructor(
    private readonly store: Store,
    private location: Location,
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
    this.varietes = this.loginService.allVarietes.map((device: any) => {
      return { ...device };
    });

    this.annees = this.loginService.allAnnees.map((device: any) => {
      return { ...device };
    });
    // this.selectedAnnee = this.annees.find((item) => item.id == this.loginService.selectedCampagne.annee.id);

    this.saisons = this.loginService.allSaisons.map((device: any) => {
      return { ...device };
    });

    // this.selectedSaison = this.saisons.find((item) => item.id == this.loginService.selectedCampagne.saison.id);

    this.creditsOnClient$ = this.store.pipe(
      select(
        fromCredits.selectCreditsCustomListFromAgence(
          this.loginService.UserConnexion.user.userAgences.idAgence,
          this.loginService.selectedCampagne.annee.id,
          this.loginService.selectedCampagne.saison.id
        )
      )
    );
    this.pointsCollectesFromAgence$ = this.store.pipe(
      select(
        fromPointAgences.selectPointCustomListFromAgence(
          this.loginService.UserConnexion.user.userAgences.idAgence
        )
      )
    );

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

    this.selectedVariete = this.loginService.mySelectedVariete;

    localStorage.setItem(
      'selectedVarieteId',
      this.loginService.mySelectedVariete!.id.toString()
    );
    localStorage.setItem(
      'selectedVarieteName',
      this.loginService.mySelectedVariete!.name.toString()
    );
    this.selectedVarieteId = parseInt(
      this.appService.getLocalselectedVarieteId()
    );

    this.colsRemboursements = [
      { field: 'id', header: 'ID', sort: false, filter: false },
      { field: 'date', header: 'DATE', sort: true, filter: true },
      {
        field: 'typeRemboursementName',
        header: 'TYPE',
        sort: true,
        filter: true,
      },
      { field: 'emballageName', header: 'EMBALLAGE', sort: true, filter: true },
      { field: 'quantiteFormat', header: 'QUANTITE', sort: true, filter: true },
      { field: 'puFormat', header: 'PU', sort: true, filter: true },
      { field: 'valeurFormat', header: 'VALEUR', sort: true, filter: true },
    ];

    this.colsCreditCustom = [
      //{ field: 'agenceEtablissementFinancierSigle', header: 'AGENCE', sort: true, filter: true},
      { field: 'id', header: 'ID', sort: false, filter: false },
      { field: 'date', header: 'DATE', sort: true, filter: true },
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
        field: 'remboursementsSum',
        header: 'REMB.',
        sort: true,
        filter: true,
      },

      {
        field: 'tauxRemboursement',
        header: 'TAUX',
        sort: true,
        filter: true,
      },

      // { field: 'exigible', header: 'EXIGIBLE', sort: true, filter: true},
      // { field: 'remboursementsSum', header: 'REMB.', sort: true, filter: true},
      // { field: 'capitalFormat', header: 'CAPITAL', sort: true, filter: true},
      // { field: 'moratoireFormat', header: 'MORATOIRE', sort: true, filter: true},
      // { field: 'interetFormat', header: 'INTERET', sort: true, filter: true},
      // { field: 'autres_engagementsFormat', header: 'AUTRES ENG.', sort: true, filter: true},
      //{ field: 'exploitationAnneeName', header: 'ANNEE', sort: true, filter: true},
      //{ field: 'exploitationSaisonName', header: 'SAISON', sort: true, filter: true},
    ];

    // this.selectedAnnee = {id: 6, name: '2025' , valeur: 2025};

    this.refreshPage();
    //this.viderBien();
  }
  refreshPage() {
    this.loading = true;
    this.initDispatch();
    // this.initSubscriptions();
    this.initSubscriptionsProgress();
  }

  private initDispatch(): void {
    const myFilter: IFilter = {
      societeId: null,
      agenceId: null,
      anneeId: null,
      saisonId: null,
      opId: null,
    };

    myFilter.anneeId = this.appService.getLocalselectedCampagneAnneeId();
    myFilter.saisonId = this.appService.getLocalselectedCampagneSaisonId();
    myFilter.societeId = this.appService.getLocalselectedSocieteId();
    myFilter.agenceId = this.appService.getLocalselectedAgenceId();

    //console.log('myFilter before: ', myFilter);

    this.appService.removeNullProperties(myFilter);
    //console.log('myFilter after: ', myFilter);
    this.store.dispatch(
      fromCredits.getAllCreditWithFilters({
        filter: {
          ...myFilter,
        },
      })
    );
    this.creditWithFilters$ = this.store.pipe(
      select(fromCredits.selectCreditWithFiltersList)
    );

    //this.store.dispatch(fromCredits.getCredits());
    this.store.dispatch(fromOps.getOps());
    this.store.dispatch(fromPointAgences.getPointAgences());

    this.store.dispatch(fromExploitations.getExploitations());
    this.store.dispatch(fromRemboursements.getRemboursements());
    this.store.dispatch(fromMouvementStockages.getMouvementStockages());

    const retourVariete = this.varietes.find(
      (item) => item.id == parseInt(this.appService.getLocalselectedVarieteId())
    );
    //console.log('retourVariete: ', retourVariete);
    this.store.dispatch(
      fromMouvementStockages.getAllMouvementStockagesProduitCampagne({
        produitId: retourVariete!.produit.id,
        anneeId: this.appService.getLocalselectedCampagneAnneeId(),
        saisonId: this.appService.getLocalselectedCampagneSaisonId(),
      })
    );
  }

  private initSubscriptions(): void {
    this.ops$ = this.store.pipe(select(fromOps.selectOpsList));
    this.remboursements$ = this.store.pipe(
      select(fromRemboursements.selectRemboursementsList)
    );
    this.mouvementStockages$ = this.store.pipe(
      select(fromMouvementStockages.selectMouvementStockagesList)
    );

    this.mouvementStockagesSubscription = this.mouvementStockages$.subscribe(
      (datas: any[]) => {
        if (datas) {
          this.mouvementStockages = datas.map((device: any) => {
            return { ...device };
          });
          // console.log('this.mouvementStockages: ', datas);
        }
      }
    );
    this.mouvementStockagesProduitCampagne$ = this.store.pipe(
      select(fromMouvementStockages.selectMouvementStockagesProduitCampagneList)
    );

    const varietesFiltres: IVariete[] = this.varietes.filter(
      (variete) => variete.produit.familleEmplacement.id === 1
    );
    // console.log('varietesFiltres: ', varietesFiltres);

    // Utiliser un Set pour éliminer les doublons
    const produitsSet: Set<string> = new Set(
      varietesFiltres.map((paquet) => paquet.produit.name)
    );
    // Créer une liste distincte d'objets de produit
    const produitsDistincts: IProduit[] = Array.from(produitsSet)
      .map(
        (nomProduit) =>
          this.varietes.find((paquet) => paquet.produit.name === nomProduit)
            ?.produit
      )
      .filter(Boolean) as IProduit[];

    let varietesInGroup: IVariete[] = [];
    this.selectItemGroupVarietes = [];

    produitsDistincts.forEach((itemProduit) => {
      // Créer un objet pour représenter le groupe de produits
      const groupProduit: SelectItem = {
        label: itemProduit.name,
        value: itemProduit.id,
        items: [],
      };

      // Filtrer les varietes qui appartiennent à ce groupe
      varietesInGroup = varietesFiltres.filter(
        (variete) => variete.produit.id === groupProduit.value
      );

      varietesInGroup.forEach((maVariete) => {
        groupProduit.items.push({
          label: maVariete.name,
          value: maVariete,
        });
        // Ajouter le groupe de produits à la liste finale
      });
      this.selectItemGroupVarietes.push(groupProduit);
      // console.log('selectItemGroupVarietes: ', this.selectItemGroupVarietes);
    });

    /////////////////////// BEGIN ///////////////////////////////
    console.time('Time this');
    this.creditWithFiltersSubscription = this.creditWithFilters$.subscribe(
      (datas: any[]) => {
        if (datas) {
          this.creditWithFilters = datas.map((device: any) => {
            return { ...device };
          });

          this.pointsCollectesFromAgenceSubscription =
            this.pointsCollectesFromAgence$.subscribe({
              next: (datas: any[]) => {
                if (datas) {
                  this.pointsCollectesFromAgence = datas.map((device: any) => {
                    return { ...device };
                  });

                  this.ops$!.subscribe((dataOps: any[]) => {
                    this.ops = dataOps;
                    this.ops = dataOps.map((deviceOps: any) => {
                      return { ...deviceOps };
                    });

                    console.log('this.ops before: ', this.ops);

                    const pointInAgence = this.pointsCollectesFromAgence.map(
                      (point) => point.point.id
                    );

                    console.log('pointInAgence: ', pointInAgence);
                    this.mesOps = [];
                    pointInAgence.forEach((pointId) => {
                      const myOp = this.ops.filter(
                        (op) => op.pointId == pointId
                      );
                      myOp.forEach((myop) => {
                        this.mesOps.push(myop);
                      });
                    });

                    console.log('mesOps: ', this.mesOps);
                  });

                  datas.forEach((item) => {
                    const creditsOnPoint = this.creditWithFilters.filter(
                      (credit) => {
                        return credit.exploitationOpPointId === item.point.id;
                      }
                    );

                    this.creditGroups[item.point.id] = creditsOnPoint;

                    let mySumCapitals = creditsOnPoint.reduce(
                      (sum, credit) => sum + credit.capital,
                      0
                    );

                    let mySumMoratoires = creditsOnPoint.reduce(
                      (sum, credit) => sum + credit.moratoire,
                      0
                    );

                    let mySumInterets = creditsOnPoint.reduce(
                      (sum, credit) => sum + credit.interet,
                      0
                    );

                    let mySumAutresEngagements = creditsOnPoint.reduce(
                      (sum, credit) => sum + credit.autres_engagements,
                      0
                    );

                    let mySumExigibles =
                      mySumCapitals +
                      mySumMoratoires +
                      mySumInterets +
                      mySumAutresEngagements;

                    let mySumRemboursements = creditsOnPoint.reduce(
                      (sum, credit) => sum + credit.remboursementsSum,
                      0
                    );

                    const mySumCredit: ISumCredit = {
                      sumCapitals:
                        mySumCapitals
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA',
                      sumMoratoires:
                        mySumMoratoires
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA',
                      sumInterets:
                        mySumInterets
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA',
                      sumAutresEngagements:
                        mySumAutresEngagements
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA',
                      sumExigibles:
                        mySumExigibles
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA',
                      sumRemboursements:
                        mySumRemboursements
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA',
                    };
                    this.creditSumGroups[item.point.id] = mySumCredit;
                  });

                  //////////////////////////// TITRE ///////////////////////

                  (this.loginService.titreSocieteSumCapital =
                    this.creditWithFilters
                      .reduce((sum, credit) => sum + credit.capital, 0)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA'),
                    (this.loginService.titreSocieteSumMoratoire =
                      this.creditWithFilters
                        .reduce((sum, credit) => sum + credit.moratoire, 0)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA');

                  this.loginService.titreSocieteSumInteret =
                    this.creditWithFilters
                      .reduce((sum, credit) => sum + credit.interet, 0)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA';

                  this.loginService.titreSocieteSumAutresEngagements =
                    this.creditWithFilters
                      .reduce(
                        (sum, credit) => sum + credit.autres_engagements,
                        0
                      )
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA';

                  this.loginService.titreSocieteSumExigibles =
                    this.creditWithFilters
                      .reduce((sum, credit) => sum + credit.exigible, 0)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA';
                }
                setTimeout(() => {
                  this.loading = false;
                }, 1500);
              },
              error: (error: any) => {
                // Handle error
              },
              complete: () => {
                // Handle completion
              },
            });

          console.log(
            'this.creditWithFilters lenght: ',
            this.creditWithFilters.length
          );
          console.log(
            'this.creditWithFilters datas:  ',
            this.creditWithFilters
          );
        }
      }
    );
    console.timeEnd('Time this');
    /////////////////////// END /////////////////////////////////
  }

  async executeCustomInitSubscriptions(): Promise<void> {
    // Custom code to execute during each progress update
    return new Promise((resolve) => {
      console.log('Executing custom code...');
      // Simulate a delay for custom code execution
      this.initSubscriptions();
      setTimeout(() => {
        resolve();
      }, 500); // Simulate custom code execution time
    });
  }

  async initSubscriptionsProgress() {
    while (this.progress < 100) {
      this.progress += 10;
      await this.executeCustomInitSubscriptions();
      await this.delay(1000); // Wait for 1 second before next update
    }
  }
  delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }


  viderBien() {
    this.initSubscriptions();
    //this.isPersonneOrSociete();
  }

  formatMontant(montant: number) {
    return montant.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA';
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

  estFormulaireValide() {
    return this.creditForm.valid;
  }

  showDialogRemboursements(action: string, creditOnClient: ICreditCustom) {
    this.displayRemboursements = true;

    if (action === 'add') {
      this.titleDialogRemboursements = 'AJOUTER UN REMBOURSEMENT';
    } else if (action === 'update') {
      this.titleDialogRemboursements = 'MODIFIER UN REMBOURSEMENT';
    } else if (action === 'view') {
      this.titleDialogRemboursements = 'LISTE DES REMBOURSEMENTS';
      this.remboursementsFromExploitation(creditOnClient.exploitationId);
    } else if (action === 'delete') {
      this.titleDialogRemboursements = 'SUPPRIMER UN REMBOURSEMENT';
    }
  }

  showDialogExploitationS(action: string, creditOnClient: ICreditCustom) {
    this.displayExploitation = true;

    if (action === 'add') {
      this.titleDialogRemboursements = 'AJOUTER UN REMBOURSEMENT';
    } else if (action === 'update') {
      this.titleDialogRemboursements = 'MODIFIER UN REMBOURSEMENT';
    } else if (action === 'view') {
      this.titleDialogRemboursements = 'LISTE DES REMBOURSEMENTS';
      this.remboursementsFromExploitation(creditOnClient.exploitationId);
    } else if (action === 'delete') {
      this.titleDialogRemboursements = 'SUPPRIMER UN REMBOURSEMENT';
    }
  }

  showDialogExploitation(creditOnClient: ICreditCustom) {
    //console.log('creditOnClient: ', creditOnClient);
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
    this.ref = this.dialogService.open(DialogExploitationComponent, {
      width: '75%',
      height: '80%',
      modal: true,
      dismissableMask: true,
      resizable: true,
      contentStyle: {
        //'max-height': '500px',

        'max-height': '90%',
        overflow: 'auto',
      },
      baseZIndex: 10000,
    });
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
      //console.log(' this.creditOnClient    --- ', creditOnClient);
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
      //console.log('this.creditForm: ', this.creditForm);
    } else if (action === 'view') {
      this.titleDialogCredit = 'CONSULTER UN CREDIT';
      this.labelSave = 'view';
    } else if (action === 'delete') {
      this.titleDialogCredit = 'SUPPRIMER UN CREDIT';
      this.actionSave = 'delete';
      this.labelSave = 'Supprimer';
      this.classSave = 'p-button-text; p-button-danger';
      this.creditOnClient = { ...creditOnClient };
      //console.log(' this.creditOnClient    --- ', creditOnClient);
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
      // console.log('myOp    --- ', myOp);
      this.creditForm.controls['varieteCredit'].patchValue(myVariete);
      //console.log('opCredit    --- ', myOp);
      this.creditForm.controls['opCredit'].patchValue(myOp);
      this.creditForm.disable();
    }
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

  onSaveCredit1(event: any) {
    console.log('event.value: ', event.value);
  }

  onAnneeChange(event: any) {
    this.selectedAnnee = event.value;

    console.log('event.value: ' + event.value.id);
    //this.loginService.selectedCampagne.annee = this.selectedAnnee!;
    //console.log( this.loginService.selectedCampagne);

    localStorage.setItem('selectedAnneeId', event.value.id.toString());
    localStorage.setItem('selectedAnneeName', event.value.name.toString());
    this.selectedAnneeId = event.value.id.toString();
    this.loginService.mySelectedAnnee = event.value;
    this.refreshPage();
  }

  onSaisonChange(event: any) {
    this.selectedSaison = event.value;
    console.log('event.value: ' + event.value);
    localStorage.setItem('selectedSaisonId', event.value.id.toString());
    localStorage.setItem('selectedSaisonName', event.value.name.toString());
    this.selectedSaisonId = event.value.id.toString();
    this.loginService.mySelectedSaison = event.value;
    this.refreshPage();
  }

  onSelectItemGroupVariete(event: any) {
    this.selectedVariete = event.value;
    console.log(event.value);
    localStorage.setItem('selectedVarieteId', event.value.id.toString());
    localStorage.setItem('selectedVarieteName', event.value.name.toString());
    this.selectedVarieteId = event.value.id.toString();
    this.loginService.mySelectedVariete = event.value;
    this.refreshPage();
  }

  filterOp(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    let colonnesOps = this.mesOps.map(({ id, name }) => ({ id, name }));
    // console.log('this.ops: ', this.ops);
    for (let i = 0; i < (colonnesOps as any[]).length; i++) {
      let op = (colonnesOps as any[])[i];

      if (op.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(op);
      }
    }

    this.filteredOps = filtered;
  }

  remboursementsFromExploitationx = async (
    exploitationId: number
  ): Promise<any> => {
    const remboursements$ = this.store.select(
      fromRemboursements.selectRemboursementsListFromExploitation(
        exploitationId
      )
    );
    remboursements$.subscribe((datasRemboursement: any) => {
      if (datasRemboursement) {
        // console.log('datasRemboursement: xxxxx ' + exploitationId + ' xxxxx :' , datasRemboursement);
        return datasRemboursement;
      } else {
        return [];
      }
    });
  };

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
        }
      }
    );
  }

  onSelectOp(event: any) {
    console.log('this.selectedOp: ', event);
  }

  creditsOnClientOnPoint1(pointId: number) {
    this.creditsOnClient$ = this.store.pipe(
      select(
        fromCredits.selectCreditsCustomListFromAgence(
          this.loginService.UserConnexion.user.userAgences.idAgence,
          this.loginService.selectedCampagne.annee.id,
          this.loginService.selectedCampagne.saison.id
        )
      )
    );
    this.creditsOnClientSubscription = this.creditsOnClient$.subscribe(
      (datas: any[]) => {
        // console.log('creditsOnClient: ', datas);
        if (datas) {
          this.creditsOnClient = datas.map((device: any) => {
            return { ...device };
          });
          //console.log('this.creditsOnClient: ', datas);
          const creditsOnClientOnPoint = this.creditsOnClient.filter(
            (credit) => credit.exploitationOpPointId == pointId
          );
          //console.log('creditsOnClientOnPoint: ', creditsOnClientOnPoint);
          return creditsOnClientOnPoint;
        } else {
          return null;
        }
      }
    );
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

  creditsOnClientOnPointAnneeSaison1(
    pointId: number,
    anneeId: number,
    saisonId: number
  ) {
    // console.log('pointId: ' + pointId + ' anneeId: ' + anneeId + ' saisonId: ' + saisonId);
    this.creditsOnPoint$ = this.store.pipe(
      select(
        fromCredits.selectCreditsCustomListFromPointAnneeSaison(
          pointId,
          anneeId,
          saisonId
        )
      )
    );
    this.creditsOnPointSubscription = this.creditsOnPoint$.subscribe(
      (datas: any[]) => {
        //console.log('creditsOnPoint: ' + pointId, datas);
        if (datas) {
          //console.log('this.datas: ' + pointId, datas );
          this.creditsOnPoint = datas.map((device: any) => {
            return { ...device };
          });
          //console.log('this.creditsOnPoint: ' + pointId, this.creditsOnPoint );
          return this.creditsOnClientOnPoint;
        } else {
          return null;
        }
      }
    );
  }

  creditsOnClientOnPointAnneeSaison2(pointId: number) {
    //console.log('pointId: ' + pointId + ' anneeId: ' + this.loginService.selectedCampagne.annee.id + ' saisonId: ' + this.loginService.selectedCampagne.saison.id);
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
        // console.log('creditsOnPoint: ' + pointId, datas);
        if (datas) {
          // console.log('this.datas: ' + pointId, datas );
          this.creditsOnPoint = datas.map((device: any) => {
            return { ...device };
          });
          // console.log('this.creditsOnPoint: ' + pointId, this.creditsOnPoint );
          return this.creditsOnClientOnPoint;
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
    return valeur.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA';
  };

  sumCapitalsFromAgence = (agenceId: number): string => {
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
    return valeur.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA';
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
    return valeur.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA';
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
    return valeur.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA';
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
    return valeur.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA';
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
    return valeur.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA';
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
    this.credits = [...this.credits];
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

  supprimerCredit() {
    let body: any = {};
    body.action = 'delete';
    body.id = this.creditForm.controls['idCredit']['value'];
    body.date = this.creditForm.controls['dateCredit']['value'].toISOString();
    body.capital = this.creditForm.controls['capitalCredit']['value'];
    body.interet = this.creditForm.controls['interetCredit']['value'];
    body.moratoire = this.creditForm.controls['moratoireCredit']['value'];
    body.autres_engagements = this.creditForm.controls['autresCredit']['value'];
    body.agenceEtablissementFinancierId =
      this.loginService.UserConnexion.user.userAgences.idAgence;
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
    body.agenceEtablissementFinancierId =
      this.loginService.UserConnexion.user.userAgences.idAgence;
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
    let body: any = {};
    body.action = 'add';
    body.date = this.creditForm.controls['dateCredit']['value'].toISOString();
    body.capital = this.creditForm.controls['capitalCredit']['value'];
    body.interet = this.creditForm.controls['interetCredit']['value'];
    body.moratoire = this.creditForm.controls['moratoireCredit']['value'];
    body.autres_engagements = this.creditForm.controls['autresCredit']['value'];
    body.agenceId = Number(this.appService.getLocalselectedAgenceId());
    // body.compte = this.newCompte;
    body.exploitationId = this.creditForm.controls['idExploitation']['value'];
    body.dateExploitation =
      this.creditForm.controls['dateExploitation']['value'].toISOString();
    body.unite = 'Ha';
    body.surface = this.creditForm.controls['surfaceCredit']['value'];
    body.varieteId = this.creditForm.controls['varieteCredit']['value']['id'];
    body.anneeId = Number(this.appService.getLocalselectedCampagneAnneeId());
    body.saisonId = Number(this.appService.getLocalselectedCampagneSaisonId());
    //body.producteurId = 0;
    body.opId = this.creditForm.controls['opCredit']['value']['id'];

    console.log('body --- ', body);
    /* ADD NEW CREDIT */
    this.store.dispatch(fromCredits.createExploitationCredit({ body }));
    //this.viderCredit();
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
    this.credits = [...this.credits];
    this.exploitations = [...this.exploitations];
    this.isEditedCredit = true;
  }

  viderCredit11() {
    this.creditOnClient.id = null;
    this.creditOnClient.date = new Date();
    this.creditOnClient.capital = null;
    this.creditOnClient.interet = null;
    this.creditOnClient.moratoire = null;
    this.creditOnClient.autres_engagements = null;
    this.creditOnClient.agenceEtablissementFinancierId = null;
    this.creditOnClient.agenceEtablissementFinancierName = '';
    this.creditOnClient.exploitationOpId = null;
    this.creditOnClient.exploitationOpName = '';
    this.creditOnClient.exploitationTypeOpId = null;
    this.creditOnClient.exploitationTypeOpName = '';
    this.creditOnClient.exploitationAnneeId = null;
    this.creditOnClient.exploitationAnneeName = '';
    this.creditOnClient.exploitationSaisonId = null;
    this.creditOnClient.exploitationSaisonName = '';
    this.creditOnClient.exploitationOpPointId = null;
    this.creditOnClient.exploitationProduitId = null;
    this.creditOnClient.exploitationProduitName = '';
    this.creditOnClient.exploitationFiliereId = null;
    this.creditOnClient.exploitationFiliereName = '';
    this.creditOnClient.exploitationCompte = '';
    this.creditOnClient.exploitationDate = new Date();
    this.creditOnClient.exploitationSurface = null;

    this.refreshPage();
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
}

export interface IFilter {
  societeId: number | null;
  agenceId: number | null;
  anneeId: number | null;
  saisonId: string | null;
  opId: number | null;
}
