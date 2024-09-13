import { LoaderService } from './../../../services/loader.service';
import { selectAnneesList } from './../../../store/annee/annee.selectors';
import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, Subscription, throwError } from 'rxjs';
import { AppService } from '../../../services/app.service';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Store, select } from '@ngrx/store';
import * as fromAnnees from '../../../store/annee';
import * as fromPoints from '../../../store/point';
import * as fromSaisons from '../../../store/saison';
import * as fromCampagnes from '../../../store/campagne';
import * as fromVarietes from '../../../store/variete';
import * as fromOps from '../../../store/op';
import * as fromPointAgences from '../../../store/point_agence';
import * as fromChargeExploitations from '../../../store/charge_exploitation';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ICampagne } from '../../../interfaces/campagne.interface';
import { LoginService } from '../../../services/login.service';
import { IVariete } from '../../../interfaces/filiere.interface';
import { IAnnee } from '../../../interfaces/annee.interface';
import { ISaison } from '../../../interfaces/saison.interface';
import { IOp } from '../../../interfaces/op.interface';
import { IPointAgence } from '../../../interfaces/point-agence.interface';
import { IPoint } from '../../../interfaces/pays.interface';
import { IChargeExploitation } from '../../../interfaces/exploitation.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // endpoint: string = 'http://localhost:4000/api';
  endpoint: string = this.appService.getUrl('');
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  itemsDefaut: MenuItem[] = [
    {
      label: 'HOME',
      icon: 'pi pi-fw pi-home',
      command: () => this.navigateTo('/home'),
    },
  ];

  campagnes$!: Observable<ICampagne[]>;
  campagnes: ICampagne[] = [];

  varietes$!: Observable<IVariete[]>;
  varietes: IVariete[] = [];

  annees$!: Observable<IAnnee[]>;
  annees: IAnnee[] = [];

  points$!: Observable<IPoint[]>;
  points: IPoint[] = [];

  saisons$!: Observable<ISaison[]>;
  saisons: ISaison[] = [];

  pointsFromAgence$!: Observable<IPointAgence[]>;
  pointsFromAgence: IPointAgence[] = [];

  chargeExploitations$!: Observable<IChargeExploitation[]>;
  chargeExploitations: IChargeExploitation[] = [];

  selectedOp: any;
  filteredOps: any[] | undefined;
  ops$: Observable<IOp[]> | undefined;
  ops: IOp[] = [];
  op: any = {};
  selectedOps: IOp[] | undefined;

  mesOps: any[] = [];

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private appService: AppService,
    public router: Router,
    private readonly store: Store
  ) {}

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/register-user`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }

  private initDispatch(): void {
    this.store.dispatch(fromCampagnes.getCampagnes());
    this.campagnes$ = this.store.pipe(
      select(fromCampagnes.selectCampagnesList)
    );
    this.store.dispatch(fromAnnees.getAnnees());
    this.annees$ = this.store.pipe(select(fromAnnees.selectAnneesList));
    this.store.dispatch(fromSaisons.getSaisons());
    this.saisons$ = this.store.pipe(select(fromSaisons.selectSaisonsList));
    this.store.dispatch(fromVarietes.getVarietes());
    this.varietes$ = this.store.pipe(select(fromVarietes.selectVarietesList));
    this.store.dispatch(fromPoints.getPoints());
    this.points$ = this.store.pipe(select(fromPoints.selectPointsList));
    this.store.dispatch(fromChargeExploitations.getChargeExploitations());
    this.chargeExploitations$ = this.store.pipe(
      select(fromChargeExploitations.selectChargeExploitationsList)
    );
  }
  // Sign-in
  signIn(user: User) {
    this.initDispatch();

    this.campagnes$.subscribe((data: any[]) => {
      this.campagnes = data;
      this.campagnes = data.map((device: any) => {
        return { ...device };
      });
      this.loginService.selectedCampagne = this.campagnes[0];
    });

    this.varietes$.subscribe((data: any[]) => {
      this.varietes = data;
      this.varietes = data.map((device: any) => {
        return { ...device };
      });
      // localStorage.setItem('selectedVarieteId', this.varietes[0].id.toString());
      this.loginService.mySelectedVariete = this.varietes[0];
      this.loginService.allVarietes = this.varietes;
    });

    this.annees$.subscribe((data: any[]) => {
      this.annees = data;
      this.annees = data.map((device: any) => {
        return { ...device };
      });
      this.loginService.allAnnees = this.annees;
    });

    this.saisons$.subscribe((data: any[]) => {
      this.saisons = data;
      this.saisons = data.map((device: any) => {
        return { ...device };
      });
      this.loginService.allSaisons = this.saisons;
    });

    this.points$.subscribe((data: any[]) => {
      this.points = data;
      this.points = data.map((device: any) => {
        return { ...device };
      });
      this.loginService.allPoints = this.points;
      //console.table(this.points);
    });

    localStorage.setItem('selectedChargeExploitationId', '0');
    localStorage.setItem('selectedChargeExploitationName', '');
    localStorage.setItem('selectedChargeExploitationUniteId', '');
    localStorage.setItem('selectedChargeExploitationUniteName', '');
    this.chargeExploitations$.subscribe((data: any[]) => {
      this.chargeExploitations = data;

      this.chargeExploitations = data.map((device: any) => {
        console.log('this.chargeExploitations: ', this.chargeExploitations);
        return { ...device };
      });
      this.loginService.allChargeExploitations = this.chargeExploitations;

      //console.table(this.chargeExploitations);
    });

    return (
      this.http
        //.post<any>(`${this.endpoint}/signin`, user)
        .post<any>(`${this.endpoint}/auth/signin`, user)
        .subscribe((res: any) => {
          console.log(res);
          console.log(res.user);
          console.log(
            'this.loginService.UserConnexion.user.role.name: ',
            res.user.role.name
          );

          this.loginService.UserConnexion.user = res.user;
          this.loginService.mySelectedSaison = this.saisons.find(
            (item) => item.id == this.campagnes[0].saison.id
          );
          this.loginService.mySelectedAnnee = this.annees.find(
            (item) => item.id == this.campagnes[0].annee.id
          );

          localStorage.setItem('selectedPointId', '');
          localStorage.setItem('access_token', res.token);
          localStorage.setItem(
            'selectedAnneeId',
            this.loginService.mySelectedAnnee!.id.toString()
          );
          localStorage.setItem(
            'selectedAnneeName',
            this.loginService.mySelectedAnnee!.name.toString()
          );
          localStorage.setItem(
            'selectedSaisonId',
            this.loginService.mySelectedSaison!.id.toString()
          );
          localStorage.setItem(
            'selectedSaisonName',
            this.loginService.mySelectedSaison!.name.toString()
          );

          /*
          localStorage.setItem(
            'selectedChargeExploitationId',
            this.loginService.mySelectedChargeExploitation!.id.toString()
          );
          localStorage.setItem(
            'selectedChargeExploitationName',
            this.loginService.mySelectedChargeExploitation!.name.toString()
          );
          */

          localStorage.setItem('selectedLotId', '');
          localStorage.setItem(
            'selectedVarieteId',
            this.loginService.mySelectedVariete!.id.toString()
          );
          localStorage.setItem(
            'selectedVarieteName',
            this.loginService.mySelectedVariete!.name.toString()
          );

          localStorage.setItem('selectedSocieteId', '0');
          localStorage.setItem('selectedSocieteName', '');

          localStorage.setItem('selectedOpId', '0');
          localStorage.setItem('selectedOpName', '');
          localStorage.setItem('selectedExploitationId', '0');
          localStorage.setItem('selectedAgenceId', '0');
          localStorage.setItem('selectedAgenceName', '0');

          if (res.user.role.name === 'Societe') {
            this.loginService.titre = res.user.userSocietes[0].societe.name;
            localStorage.setItem(
              'selectedSocieteId',
              res.user.userSocietes[0].societe.id
            );
            localStorage.setItem(
              'selectedSocieteName',
              res.user.userSocietes[0].societe.name
            );

            this.loginService.titre = res.user.userSocietes[0].societe.name;

            this.loginService.UserConnexion.user.userSocietes =
              res.user.userSocietes[0].societe;
          }
          if (res.user.role.name === 'Agence') {
            console.log(res.user.userAgences[0].agence.name);
            this.loginService.UserConnexion.user.userAgences.idAgence = res.user
              .userAgences[0].agence.id as number;
            this.loginService.UserConnexion.user.userAgences.name =
              res.user.userAgences[0].agence.name;
            this.loginService.titre = res.user.userAgences[0].agence.name;

            localStorage.setItem(
              'selectedSocieteId',
              res.user.userAgences[0].agence.societe.id
            );
            localStorage.setItem(
              'selectedSocieteName',
              res.user.userAgences[0].agence.societe.name
            );

            localStorage.setItem(
              'selectedAgenceId',
              res.user.userAgences[0].agence.id
            );

            localStorage.setItem(
              'selectedAgenceName',
              res.user.userAgences[0].agence.name
            );
            this.store.dispatch(
              fromOps.getAllOpsCustomFromAgence({
                agenceId: this.appService.getLocalselectedAgenceId(),
              })
            );

            this.ops$ = this.store.pipe(
              select(fromOps.selecCustomCreditSocieteVarieteAnneeSaisonList)
            );

            this.ops$.subscribe((data: any[]) => {
              this.ops = data;
              this.ops = data.map((device: any) => {
                return { ...device };
              });

              this.loginService.allOpsAgenceFinanciers = this.ops;

              this.mesOps = this.ops.map(({ id, name }) => ({ id, name }));
            });
          }

          if (res.user.role.name === 'Admin') {
            this.loginService.titre = 'Administration';
          }
          this.selectNavProfile(res.user.role.name);
          this.loginService.showNav();

          //console.log('res.user.id 1: ' + res.user.id);
          const idUser = res.user.id;
          this.getUserProfile(idUser).subscribe((res) => {
            //console.log(res);
            //console.log('res.user.id 2: ' + idUser);
            const myUser = new User();
            myUser._id = idUser;
            myUser.email = user.email;
            myUser.password = user.password;
            myUser.name = user.name;
            //console.log('myUser : ' + myUser._id);
            //this.currentUser = res;
            /*
          this.currentUser = myUser;
          this.router.navigate(['user-profile/' + myUser._id]);
          */
          });
        })
    );
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }

  // User profile
  getUserProfile(id: any): Observable<any> {
    let api = `${this.endpoint}/profiles/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

  selectNavProfile(profil: string) {
    const itemsProfil = [];
    if (profil === 'Admin') {
      const itemsAdmins = [
        {
          label: 'ADMIN',
          icon: 'pi pi-map-marker',
          command: () => this.navigateTo('/filieres'),
        },

        {
          label: 'SETTINGS',
          icon: 'pi pi-fw pi-th-large',
          items: [
            {
              label: 'Zones',
              icon: 'pi pi-fw pi-chevron-right',
              command: () => this.openFiliere(),
              items: [
                {
                  label: 'Sous Zones',
                  icon: 'pi pi-fw pi-chevron-right',
                  command: () => this.openFiliere(),
                  items: [
                    {
                      label: 'Points de Collecte',
                      icon: 'pi pi-fw pi-chevron-right',
                      command: () => this.openFiliere(),
                    },
                  ],
                },
              ],
            },
            {
              label: 'Agences',
              icon: 'pi pi-fw pi-chevron-right',
              command: () => this.openFiliere(),
            },
            {
              label: 'Unions',
              icon: 'pi pi-fw pi-chevron-right',
              command: () => this.openFiliere(),
            },

            {
              label: 'Utilisateurs',
              icon: 'pi pi-fw pi-users',
              command: () => this.openFiliere(),
            },
          ],
        },
      ];

      this.loginService.items = this.itemsDefaut.concat(itemsAdmins);
    }

    if (profil === 'Societe') {
      const itemsStructure = [
        /*
        {
          label: 'Clients',
          icon: 'pi pi-map-marker',
          command: () => this.navigateTo('/clients'),
        },
        {
          label: 'Crédits',
          icon: 'pi pi-map-marker',
          command: () => this.navigateTo('/credit-campagne'),
        },

        {
          label: 'Crédits Banque',
          icon: 'pi pi-map-marker',
          command: () => this.navigateTo('/credit-campagne-etablissement'),
        },
        */
        {
          label: 'CREDITS SOCIETE',
          icon: 'pi pi-map-marker',
          command: () => this.navigateTo('/credit-societe'),
        },
        /*
        {
          label: 'Intrants',
          icon: 'pi pi-map-marker',
          command: () => this.navigateTo('/mouvement-intrant'),
        },
        */
        {
          label: 'STOKS PAR POINTS',
          icon: 'pi pi-map-marker',
          command: () => this.navigateTo('/point-mouvement-intrant'),
        },
        {
          label: 'STOCKS PAR INTRANTS',
          icon: 'pi pi-map-marker',
          command: () => this.navigateTo('/stock-mouvement-intrant'),
        },
      ];

      this.loginService.items = this.itemsDefaut.concat(itemsStructure);
    }

    if (profil === 'Agence') {
      const itemsStructure = [
        {
          label: 'CLIENTS',
          icon: 'pi pi-map-marker',
          command: () => this.navigateTo('/clients'),
        },

        {
          label: 'CREDITS AGENCE',
          icon: 'pi pi-map-marker',
          command: () => this.navigateTo('/credit-campagne'),
        },

        /*

        {
          label: 'CREDITS AGENCE',
          icon: 'pi pi-map-marker',
          command: () => this.navigateTo('/credit-campagne-etablissement'),
        },

        {
          label: 'Crédits Société',
          icon: 'pi pi-map-marker',
          command: () => this.navigateTo('/credit-societe'),
        },


        {
          label: 'Intrants',
          icon: 'pi pi-map-marker',
          command: () => this.navigateTo('/mouvement-intrant'),
        },
        {
          label: 'Point Intrants',
          icon: 'pi pi-map-marker',
          command: () => this.navigateTo('/point-mouvement-intrant'),
        },
        {
          label: 'Stocks Intrants',
          icon: 'pi pi-map-marker',
          command: () => this.navigateTo('/stock-mouvement-intrant'),
        },
        */
      ];

      this.loginService.items = this.itemsDefaut.concat(itemsStructure);
    }

    if (profil === 'defaut') {
      this.loginService.items = this.itemsDefaut;
    }
  }

  selectNavProfile1(profil: string) {
    if (profil === 'Admin') {
      const itemsAdmins = [
        {
          label: 'File',
          icon: 'pi pi-fw pi-file',
          items: [
            {
              label: 'New',
              icon: 'pi pi-fw pi-plus',
              items: [
                {
                  label: 'Bookmark',
                  icon: 'pi pi-fw pi-bookmark',
                },
                {
                  label: 'Video',
                  icon: 'pi pi-fw pi-video',
                },
              ],
            },
            {
              label: 'Delete',
              icon: 'pi pi-fw pi-trash',
            },
            {
              separator: true,
            },
            {
              label: 'Export',
              icon: 'pi pi-fw pi-external-link',
            },
          ],
        },
        {
          label: 'Edit',
          icon: 'pi pi-fw pi-pencil',
          items: [
            {
              label: 'Left',
              icon: 'pi pi-fw pi-align-left',
            },
            {
              label: 'Right',
              icon: 'pi pi-fw pi-align-right',
            },
            {
              label: 'Center',
              icon: 'pi pi-fw pi-align-center',
            },
            {
              label: 'Justify',
              icon: 'pi pi-fw pi-align-justify',
            },
          ],
        },
        {
          label: 'Users',
          icon: 'pi pi-fw pi-user',
          items: [
            {
              label: 'New',
              icon: 'pi pi-fw pi-user-plus',
            },
            {
              label: 'Delete',
              icon: 'pi pi-fw pi-user-minus',
            },
            {
              label: 'Search',
              icon: 'pi pi-fw pi-users',
              items: [
                {
                  label: 'Filter',
                  icon: 'pi pi-fw pi-filter',
                  items: [
                    {
                      label: 'Print',
                      icon: 'pi pi-fw pi-print',
                    },
                  ],
                },
                {
                  icon: 'pi pi-fw pi-bars',
                  label: 'List',
                },
              ],
            },
          ],
        },
        {
          label: 'Events',
          icon: 'pi pi-fw pi-calendar',
          items: [
            {
              label: 'Edit',
              icon: 'pi pi-fw pi-pencil',
              items: [
                {
                  label: 'Save',
                  icon: 'pi pi-fw pi-calendar-plus',
                },
                {
                  label: 'Delete',
                  icon: 'pi pi-fw pi-calendar-minus',
                },
              ],
            },
            {
              label: 'Archieve',
              icon: 'pi pi-fw pi-calendar-times',
              items: [
                {
                  label: 'Remove',
                  icon: 'pi pi-fw pi-calendar-minus',
                },
              ],
            },
          ],
        },
        {
          label: 'Quit',
          icon: 'pi pi-fw pi-power-off',
        },
      ];

      this.loginService.items = this.itemsDefaut.concat(itemsAdmins);
      //this.loginService.items = itemsAdmins;
    }

    if (profil === 'defaut') {
      this.loginService.items = this.itemsDefaut;
    }
  }

  navigateTo(route: string) {
    // Gérer la navigation vers la route spécifiée
    console.log('Navigating to', route);
    this.router.navigate(['/' + route]);
  }

  openHome() {
    this.router.navigate(['/']);
  }
  openFiliere() {
    this.router.navigate(['/filieres']);
  }
  openZones() {
    this.router.navigate(['/zones']);
  }

  openSousZones() {
    this.router.navigate(['/souszones']);
  }

  openUsers() {
    this.router.navigate(['/users']);
  }

  openEntites() {
    this.router.navigate(['/entites']);
  }

  openPosts() {
    this.router.navigate(['/posts']);
  }

  openAgences() {
    this.router.navigate(['/agences']);
  }

  openUnions() {
    this.router.navigate(['/unions']);
  }

  openPointService() {
    this.router.navigate(['/pointservice']);
  }

  openPointCollecte() {
    this.router.navigate(['/pointcollecte']);
  }
}
