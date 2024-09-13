import { Injectable } from '@angular/core';




/************************************************************************** */
import { Tokener } from './../models/user';
import { Loginer } from '../models/user';
import Login from '../models/user';
import moment from 'moment';
//  from 'dexie';


/************************************************************************** */

@Injectable({
  providedIn: 'root'
})
export class DbindexedService {

  signature = 'GHQ';
  NbdisableSelect = false;
  // TableAcreer: string[];
  TableAcreers = Array();
 // private TableAcreers: any;
 TableA = new Array('logins', 'mouvements', 'autres');
 monAction = 'ajout';
 x = 0;

  dB: any;
  newLoginer: Loginer = new Loginer( 0, '', '', '', '', '');
  trouveLoginer = new Loginer( 0, '', '', '', '', '');
  rowsLogin: Login[] = [];
  nbLogins  = 0;

  rowsConnecte: Login[] = [];
  nbConnectes  = 0;


  suppressionLigneConnectes(MyConnecte: string): void {
    localStorage.removeItem(MyConnecte);
  }

  newTokener: Tokener = new Tokener('');

  tokenAdd(tokener: Tokener): void {
    const toker = {
      token: tokener.token
    };
    localStorage.setItem(this.signature + '_access_token', JSON.stringify(toker));
  }


  tokenGetter() {
    return localStorage.getItem(this.signature + '_access_token');
  }

  tokenDelete(): void {
    localStorage.removeItem(this.signature + '_access_token');
  }

  tokenReturn() {
       return [];
   }

  existeLigneConnecte(myIdConnecte: string): boolean {
    let trouver = false;

      return trouver;
  }


  constructor() { }


 isMoment(MyMomment: string): string {
  const newDate = moment(MyMomment).format('YYYY-MM-DD');


  return newDate;
}
}
