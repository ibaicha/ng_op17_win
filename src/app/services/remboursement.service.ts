import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IRemboursement } from '../interfaces/credit.interface';

@Injectable({
  providedIn: 'root',
})
export class RemboursementService {

  RemboursementDialogTitre = '';
  newRemboursement: any = {};
  editedRemboursement: any = {};
  deletedRemboursement: any = {};
  //remboursements: IRemboursement[] = [];
  remboursements = [];


  constructor(public http: HttpClient, private appService: AppService) {}
 token = this.appService.getLocalToken();

 getRemboursement(id: number): Observable<any> {
  return this.http.get(
    this.appService.getUrl(
      '/remboursements/'+ id
    ),
    this.token
  );
}

  getRemboursements(): Observable<any> {
    return this.http.get(
      this.appService.getUrl(
        '/remboursements'
      ),
      this.token
    );
  }


  create(remboursement: IRemboursement): Observable<any> {
      let body: any = {};
      console.log(remboursement);
      body.id = null;
      body.date = remboursement.date;
      body.pu = remboursement.pu;
      body.quantite = remboursement.quantite;
      body.valeur = remboursement.valeur;
      body.typeRemboursementId = remboursement.typeRemboursementId;
      body.exploitationId = remboursement.exploitationId;
      body.emballageId = remboursement.emballageId;

        return this.http.post(
          this.appService.getUrl(
            '/remboursements/create'
          ),
        body,
          this.token
        );      
  }


  update(remboursement: IRemboursement): Observable<any> {
      let body: any = {};
      console.log(remboursement);
      body.id = null;
      body.date = remboursement.date;
      body.pu = remboursement.pu;
      body.quantite = remboursement.quantite;
      body.valeur = remboursement.valeur;
      body.typeRemboursementId = remboursement.typeRemboursementId;
      body.exploitationId = remboursement.exploitationId;
   
        return this.http.put(
          this.appService.getUrl(
            '/remboursements/update/' + remboursement.id
          ),
          body,
          this.token
        );

  }

  delete(remboursement: IRemboursement): Observable<any> {
      return this.http.delete(
        this.appService.getUrl(
          '/remboursements/delete/' + remboursement.id
        ),
        this.token
      );
  }

  
}
