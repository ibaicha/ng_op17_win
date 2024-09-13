import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ICredit, IExploitationCredit } from '../interfaces/credit.interface';

@Injectable({
  providedIn: 'root',
})
export class CreditService {
  CreditDialogTitre = '';
  newCredit: any = {};
  editedCredit: any = {};
  deletedCredit: any = {};
  //credits: ICredit[] = [];
  credits = [];

  constructor(public http: HttpClient, private appService: AppService) {}
  token = this.appService.getLocalToken();

  getAllCreditsWithFilters(filter: any): Observable<any> {
    let httpParams = new HttpParams();
    for (const key in filter) {
      if (filter.hasOwnProperty(key)) {
        httpParams = httpParams.set(key, filter[key]);
      }
    }
    const myHttp = this.http.get(this.appService.getUrl('/exploitations'), {
      params: httpParams,
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });

    console.log('params', httpParams);
    return myHttp;
  }

  getCredit(id: number): Observable<any> {
    return this.http.get(this.appService.getUrl('/credits/' + id), this.token);
  }

  getCredits(): Observable<any> {
    return this.http.get(this.appService.getUrl('/credits/all'), this.token);
  }

  getAllCustomCreditToOp(id: number): Observable<any> {
    return this.http.get(
      this.appService.getUrl('/credits/custom/clientId/' + id),
      this.token
    );
  }

  getAllCustom(): Observable<any> {
    return this.http.get(
      this.appService.getUrl('/credits/custom/'),
      this.token
    );
  }

  getAllCustomCreditAgenceVarieteAnneeSaison(
    agenceId: number,
    produitId: number,
    anneeId: number,
    saisonId: number
  ): Observable<any> {
    return this.http.get(
      this.appService.getUrl(
        '/credits/custom/agenceId/' +
          agenceId +
          '/produitId/' +
          produitId +
          '/anneeId/' +
          anneeId +
          '/saisonId/' +
          saisonId
      ),
      this.token
    );
  }

  getAllCustomCreditSocieteVarieteAnneeSaison(
    etablissementId: number,
    produitId: number,
    anneeId: number,
    saisonId: number
  ): Observable<any> {
    return this.http.get(
      this.appService.getUrl(
        '/credits/custom/etablissementId/' +
          etablissementId +
          '/produitId/' +
          produitId +
          '/anneeId/' +
          anneeId +
          '/saisonId/' +
          saisonId
      ),
      this.token
    );
  }

  create(credit: ICredit): Observable<any> {
    let body: any = {};
    console.log(credit);
    body.id = null;
    body.dateCredit = credit.dateCredit;
    body.capital = credit.capital;
    body.interet = credit.interet;
    body.moratoire = credit.moratoire;
    body.autres_engagements = credit.autres_engagements;

    return this.http.post(
      this.appService.getUrl('/credits/create'),
      body,
      this.token
    );
  }
  update(credit: ICredit): Observable<any> {
    let body: any = {};
    body.id = credit.id;
    body.date = credit.dateCredit;
    body.capital = credit.capital;
    body.interet = credit.interet;
    body.moratoire = credit.moratoire;
    body.autres_engagements = credit.autres_engagements;
    body.exploitationId = credit.exploitationId;


    return this.http.put(
      this.appService.getUrl('/credits/update/' + credit.id),
      body,
      this.token
    );
  }

  createExploitationCredit(
    exploitationCredit: IExploitationCredit
  ): Observable<any> {
    let body: any = {};
    // console.log(exploitationCredit);
    body.id = null;
     ////////////// DONNEES CREDIT
     body.date = exploitationCredit.date;
     body.capital = exploitationCredit.capital;
     body.interet = exploitationCredit.interet;
     body.moratoire = exploitationCredit.moratoire;
     body.autres_engagements = exploitationCredit.autres_engagements;
     body.exploitationId = exploitationCredit.exploitationId;
    ////////////// DONNEES EXPLOITATION
    // body.compte = exploitationCredit.compte;
    body.dateExploitation = exploitationCredit.dateExploitation;
    body.unite = exploitationCredit.unite;
    body.surface = exploitationCredit.surface;
    body.agenceId = exploitationCredit.agenceId;
    body.varieteId = exploitationCredit.varieteId;
    body.anneeId = exploitationCredit.anneeId;
    body.saisonId = exploitationCredit.saisonId;
    //body.producteurId = exploitationCredit.producteurId;
    body.opId = exploitationCredit.opId;




    console.log(body);
    return this.http.post(
      this.appService.getUrl('/credits/createExploitationCredit'),
      body,
      this.token
    );
  }

  delete(credit: ICredit): Observable<any> {
    return this.http.delete(
      this.appService.getUrl('/credits/delete/' + credit.id),
      this.token
    );
  }
}
