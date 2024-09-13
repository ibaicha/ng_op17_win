import { MouvementIntrantComponent } from './composants/application/intrant/mouvement-intrant/mouvement-intrant.component';

import { Component, OnInit } from '@angular/core';
import { LoaderService } from './services/loader.service';
import { OnlineOfflineService } from './services/online-offline.service';
//import { ShareService } from './services/share.service';
//import { environment } from '../environments/environment';

import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../environments/environment.prod';
import { FooterComponent } from './composants/affichage/footer/footer.component';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './composants/affichage/navbar/navbar.component';
import { HeaderComponent } from './composants/affichage/header/header.component';
import { CreditCampagneTitreComponent } from './composants/application/credit-campagne-titre/credit-campagne-titre.component';
import { CreditSocieteComponent } from './composants/application/credit-societe/credit-societe.component';
//import { CreditCampagneSocieteComponent } from './composants/application/credit-campagne-societe/credit-campagne-societe.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    HeaderComponent,
    NavbarComponent,
    RouterOutlet,
    FooterComponent,
    CreditCampagneTitreComponent,
    MouvementIntrantComponent,
    CreditSocieteComponent
  ],
})
export class AppComponent implements OnInit {
  title = 'Ges' + 'OPs';
  showLoader: boolean = false;

  message = '';
  constructor(public router: Router) {}
  ngOnInit(): void {
    if (environment.production) {
      if (location.protocol === 'http:') {
        // window.location.href = location.href.replace('http', 'https');
      }
    }
  }
}
