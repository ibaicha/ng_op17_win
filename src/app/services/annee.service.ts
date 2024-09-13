import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IAnnee } from '../interfaces/annee.interface';

@Injectable({
  providedIn: 'root'
})
export class AnneeService {
  constructor(public http: HttpClient, private appService: AppService) {}
  token = this.appService.getLocalToken();
 
  getAnnee(id: number): Observable<any> {
   return this.http.get(
     this.appService.getUrl(
       '/annees/'+ id
     ),
     this.token
   );
 }
 
   getAnnees(): Observable<any> {
     return this.http.get(
       this.appService.getUrl(
         '/annees'
       ),
       this.token
     );
   }
 
 
     create(annee: IAnnee): Observable<any> {
 
       let body: any = {};
       body.id = annee.id;
       body.valeur = annee.valeur;
       body.name = annee.name;
    
         return this.http.post(
           this.appService.getUrl(
             '/annees'
           ),
           body,
           this.token
         );
 
          
     }
     update(annee: IAnnee): Observable<any> {
       let body: any = {};
       body.id = annee.id;
       body.valeur = annee.valeur;
       body.name = annee.name;
    
 
         return this.http.put(
           this.appService.getUrl(
             '/annees'
           ),
           body,
           this.token
         );
 
     }
 
     delete(annee: IAnnee): Observable<any> {
       return this.http.delete(
         this.appService.getUrl(
           '/annees/' + annee.id
         ),
         this.token
       );
     }
 
   
 }
 