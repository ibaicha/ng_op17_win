import { IdentifiantStoreModule } from './app/store/identifiant/identifiant-store.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component';
import { isDevMode, importProvidersFrom } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { entityConfig } from './app/entity-metadata';
import { EntityDataModule } from '@ngrx/data';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './app/reducers';
import { StoreModule } from '@ngrx/store';
import { BienStoreModule } from './app/store/bien/bien-store.module';
import { TypeSocieteStoreModule } from './app/store/type_societe/type-societe-store.module';
import { ProfessionStoreModule } from './app/store/profession/profession-store.module';
import { typeClientStoreModule } from './app/store/type_client/type-client-store.module';
import { TypeOpStoreModule } from './app/store/type_op/type-op-store.module';
import { SocieteStoreModule } from './app/store/societe/societe-store.module';
import { PersonneStoreModule } from './app/store/personne/personne-store.module';
import { ClientStoreModule } from './app/store/client/client-store.module';
import { OpStoreModule } from './app/store/op/op-store.module';
import { CreditStoreModule } from './app/store/credit/credit-store.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PrimeNgModule } from './app/shared/primeng.module';
import { MaterialModule } from './app/shared/material.module';

import { MenubarModule } from 'primeng/menubar';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AuthInterceptor } from './app/composants/auth/shared/authconfig.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DbindexedService } from './app/services/dbindexed.service';
import { BienService } from './app/services/bien.service';
import { ShareService } from './app/services/share.service';
import { LoginService } from './app/services/login.service';
import { NavigationService } from './app/services/navigation.service';
import { LoaderService } from './app/services/loader.service';
import { OnlineOfflineService } from './app/services/online-offline.service';
import { AppService } from './app/services/app.service';
import { AnneeStoreModule } from './app/store/annee/annee-store.module';
import { SaisonStoreModule } from './app/store/saison/saison-store.module';
import { CampagneStoreModule } from './app/store/campagne/campagne-store.module';
import { ProduitStoreModule } from './app/store/produit/produit-store.module';
import { VarieteStoreModule } from './app/store/variete/variete-store.module';
import { FamilleEmplacementStoreModule } from './app/store/famille_emplacement/famille_emplacement-store.module';
import { FiliereStoreModule } from './app/store/filiere/filiere-store.module';
import { ExploitationStoreModule } from './app/store/exploitation/exploitation-store.module';
import { RemboursementStoreModule } from './app/store/remboursement/remboursement-store.module';
import { DialogService } from 'primeng/dynamicdialog';
import { ExploitationCustomStoreModule } from './app/store/exploitation/exploitationCustom/exploitationCustom-store.module';
import { ChargeExploitationStoreModule } from './app/store/charge_exploitation/charge_exploitation-store.module';
import { MouvementStockageService } from './app/services/mouvement-stockage.service';
import { MouvementStockageStoreModule } from './app/store/mouvement_stockage/mouvement_stockage-store.module';
import { MouvementIntrantStoreModule } from './app/store/mouvement_intrant/mouvement_intrant-store.module';
import { MouvementIntrantService } from './app/services/mouvement-intrant.service';
import { PointService } from './app/services/point.service';
import { PointStoreModule } from './app/store/point/point-store.module';
import { PointAgenceStoreModule } from './app/store/point_agence/point_agence-store.module';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./app/composants/home/home.component').then(
        (m) => m.HomeComponent
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./app/composants/home/home.component').then(
        (m) => m.HomeComponent
      ),
  },
  {
    path: 'filieres',
    loadComponent: () =>
      import('./app/composants/filiere/filiere.component').then(
        (m) => m.FiliereComponent
      ),
  },
  {
    path: 'clients',
    loadComponent: () =>
      import('./app/composants/application/client/client.component').then(
        (m) => m.ClientComponent
      ),
  },
  {
    path: 'bien',
    loadComponent: () =>
      import('./app/composants/application/bien/bien.component').then(
        (m) => m.BienComponent
      ),
  },

  {
    path: 'credit-campagne',
    loadComponent: () =>
      import(
        './app/composants/application/credit-campagne/credit-campagne.component'
      ).then((m) => m.CreditCampagneComponent),
  },
  {
    path: 'credit-campagne-etablissement',
    loadComponent: () =>
      import(
        './app/composants/application/credit-campagne-etablissement/credit-campagne-etablissement.component'
      ).then((m) => m.CreditCampagneEtablissementComponent),
  },

  {
    path: 'credit-societe',
    loadComponent: () =>
      import(
        './app/composants/application/credit-societe/credit-societe.component'
      ).then((m) => m.CreditSocieteComponent),
  },

  {
    path: 'credit-campagne-titre',
    loadComponent: () =>
      import(
        './app/composants/application/credit-campagne-titre/credit-campagne-titre.component'
      ).then((m) => m.CreditCampagneTitreComponent),
  },
  {
    path: 'mouvement-intrant',
    loadComponent: () =>
      import(
        './app/composants/application/intrant/mouvement-intrant/mouvement-intrant.component'
      ).then((m) => m.MouvementIntrantComponent),
  },
  {
    path: 'point-mouvement-intrant',
    loadComponent: () =>
      import(
        './app/composants/application/intrant/point-mouvement-intrant/point-mouvement-intrant.component'
      ).then((m) => m.PointMouvementIntrantComponent),
  },
  {
    path: 'stock-mouvement-intrant',
    loadComponent: () =>
      import(
        './app/composants/application/intrant/stock-mouvement-intrant/stock-mouvement-intrant.component'
      ).then((m) => m.StockMouvementIntrantComponent),
  },
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      MenubarModule,
      PrimeNgModule,
      MaterialModule,
      MatSlideToggleModule,
      MatSidenavModule,
      ClientStoreModule,
      OpStoreModule,
      CreditStoreModule,
      AnneeStoreModule,
      SaisonStoreModule,
      CampagneStoreModule,
      PersonneStoreModule,
      SocieteStoreModule,
      typeClientStoreModule,
      TypeOpStoreModule,
      ProfessionStoreModule,
      TypeSocieteStoreModule,
      BienStoreModule,
      PointStoreModule,
      PointAgenceStoreModule,
      ProduitStoreModule,
      VarieteStoreModule,
      FamilleEmplacementStoreModule,
      FiliereStoreModule,
      ExploitationStoreModule,
      RemboursementStoreModule,
      MouvementStockageStoreModule,
      MouvementIntrantStoreModule,
      ExploitationCustomStoreModule,
      ChargeExploitationStoreModule,
      IdentifiantStoreModule,
      StoreModule.forRoot(reducers, {
        metaReducers,
      }),
      EffectsModule.forRoot([]),
      StoreRouterConnectingModule.forRoot(),
      EntityDataModule.forRoot(entityConfig),
      StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
    ),
    AppService,
    OnlineOfflineService,
    LoaderService,
    NavigationService,
    LoginService,
    ShareService,
    MouvementStockageService,
    MouvementIntrantService,
    BienService,
    DbindexedService,
    DialogService,
    PointService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideRouter(routes),
    provideAnimations(),
  ],
}).catch((err) => console.error(err));
