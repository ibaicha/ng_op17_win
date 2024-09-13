import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path: '',
      loadComponent: () => import('./composants/home/home.component').then(m => m.HomeComponent)
    },

    {
      path: 'home',
      loadComponent: () => import('./composants/home/home.component').then(m => m.HomeComponent)
    },
    {
      path: 'filieres',
      loadComponent: () => import('./composants/filiere/filiere.component').then(m => m.FiliereComponent)
    },
    {
      path: 'clients',
      loadComponent: () => import('./composants/application/client/client.component').then(m => m.ClientComponent)
    },

    {
      path: 'bien',
      loadComponent: () => import('./composants/application/bien/bien.component').then(m => m.BienComponent)
    },
    {
      path: 'credit',
      loadComponent: () => import('./composants/application/credit/credit.component').then(m => m.CreditComponent)
    },
  ];
