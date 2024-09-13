import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IMouvementStockage } from '../interfaces/credit.interface';

@Injectable({
  providedIn: 'root',
})
export class MouvementStockageService {

  MouvementStockageDialogTitre = '';
  newMouvementStockage: any = {};
  editedMouvementStockage: any = {};
  deletedMouvementStockage: any = {};
  //mouvementStockages: IMouvementStockage[] = [];
  mouvementStockages = [];


  constructor(public http: HttpClient, private appService: AppService) {}
 token = this.appService.getLocalToken();

 getMouvementStockage(id: number): Observable<any> {
  return this.http.get(
    this.appService.getUrl(
      '/mouvementStocks/'+ id
    ),
    this.token
  );
}
  getMouvementStockages(): Observable<any> {
    return this.http.get(
      this.appService.getUrl(
        '/mouvementStocks'
      ),
      this.token
    );
  }
  getAllMouvementStockProduitCampagne(produitId: number, anneeId: number, saisonId: number ): Observable<any> {
    return this.http.get(
      this.appService.getUrl(
        '/mouvementStocks/produitId/' + produitId + '/anneeId/' + anneeId + '/saisonId/'+ saisonId
      ),
      this.token
    );
  }

  getAllMouvementStockOpProduitCampagne(opId: number, produitId: number, anneeId: number, saisonId: number ): Observable<any> {
    return this.http.get(
      this.appService.getUrl(
        '/mouvementStocks/opId/' + opId + '/produitId/' + produitId + '/anneeId/' + anneeId + '/saisonId/'+ saisonId
      ),
      this.token
    );
  }


  create(mouvementStockage: IMouvementStockage): Observable<any> {
      let body: any = {};
      console.log(mouvementStockage);
      body.id = null;
      body.date = mouvementStockage.date;
      body.pu = mouvementStockage.pu;
      body.quantiteEntreeEmballage = mouvementStockage.quantiteEntreeEmballage;
      body.quantiteSortieEmballage = mouvementStockage.quantiteSortieEmballage;
      body.nombreUnite = mouvementStockage.nombreUnite;
      body.valeur = mouvementStockage.valeur;
      body.opId = mouvementStockage.opId;
      body.uniteTransformationId = mouvementStockage.uniteTransformationId;
      body.varieteId = mouvementStockage.varieteId;
      body.modeEntreeSortieStockId = mouvementStockage.modeEntreeSortieStockId;
      body.anneeId = mouvementStockage.anneeId;
      body.saisonId = mouvementStockage.saisonId;
      body.emplacementId = mouvementStockage.emplacementId;

        return this.http.post(
          this.appService.getUrl(
            '/mouvementStocks/create'
          ),
        body,
          this.token
        );
  }


  update(mouvementStockage: IMouvementStockage): Observable<any> {
      let body: any = {};
      console.log(mouvementStockage);
      body.id = null;
      body.date = mouvementStockage.date;
      body.pu = mouvementStockage.pu;
      body.quantiteEntreeEmballage = mouvementStockage.quantiteEntreeEmballage;
      body.quantiteSortieEmballage = mouvementStockage.quantiteSortieEmballage;
      body.nombreUnite = mouvementStockage.nombreUnite;
      body.valeur = mouvementStockage.valeur;
      body.opId = mouvementStockage.opId;
      body.uniteTransformationId = mouvementStockage.uniteTransformationId;
      body.varieteId = mouvementStockage.varieteId;
      body.modeEntreeSortieStockId = mouvementStockage.modeEntreeSortieStockId;
      body.anneeId = mouvementStockage.anneeId;
      body.saisonId = mouvementStockage.saisonId;
      body.emplacementId = mouvementStockage.emplacementId;

        return this.http.put(
          this.appService.getUrl(
            '/mouvementStocks/update/' + mouvementStockage.id
          ),
          body,
          this.token
        );

  }

  delete(mouvementStockage: IMouvementStockage): Observable<any> {
      return this.http.delete(
        this.appService.getUrl(
          '/mouvementStocks/delete/' + mouvementStockage.id
        ),
        this.token
      );
  }


}
