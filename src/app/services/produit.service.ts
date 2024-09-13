import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IProduit } from '../interfaces/filiere.interface';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(public http: HttpClient, private appService: AppService) {}
  token = this.appService.getLocalToken();
 
  getProduit(id: number): Observable<any> {
   return this.http.get(
     this.appService.getUrl(
       '/produits/'+ id
     ),
     this.token
   );
 }
 
   getProduits(): Observable<any> {
     return this.http.get(
       this.appService.getUrl(
         '/produits'
       ),
       this.token
     );
   }
 
 
     create(produit: IProduit): Observable<any> {
 
       let body: any = {};
       body.id = produit.id;
       body.name = produit.name;
       body.isDerive = produit.isDerive;
       body.isEnsachage = produit.isEnsachage;
       body.isActive = produit.isActive;
       body.filiereId = produit.filiere.id;
       body.familleEmplacementId = produit.familleEmplacement .id;
    
         return this.http.post(
           this.appService.getUrl(
             '/produits'
           ),
           body,
           this.token
         );
 
          
     }
     update(produit: IProduit): Observable<any> {
       let body: any = {};
       body.id = produit.id;
       body.name = produit.name;
       body.isDerive = produit.isDerive;
       body.isEnsachage = produit.isEnsachage;
       body.isActive = produit.isActive;
       body.filiereId = produit.filiere.id;
       body.familleEmplacementId = produit.familleEmplacement .id;
 
         return this.http.put(
           this.appService.getUrl(
             '/produits'
           ),
           body,
           this.token
         );
 
     }
 
     delete(produit: IProduit): Observable<any> {
       return this.http.delete(
         this.appService.getUrl(
           '/produits/' + produit.id
         ),
         this.token
       );
     }
 
   
 }
 