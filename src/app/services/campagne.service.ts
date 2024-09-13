import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ICampagne } from '../interfaces/campagne.interface';

@Injectable({
  providedIn: 'root'
})
export class CampagneService {
  constructor(public http: HttpClient, private appService: AppService) {}
  token = this.appService.getLocalToken();
 
  getCampagne(id: number): Observable<any> {
   return this.http.get(
     this.appService.getUrl(
       '/campagnes/'+ id
     ),
     this.token
   );
 }
 
   getCampagnes(): Observable<any> {
     return this.http.get(
       this.appService.getUrl(
         '/campagnes'
       ),
       this.token
     );
   }
 
 
     create(campagne: ICampagne): Observable<any> {
 
       let body: any = {};
       body.id = campagne.id;
       body.anneeId = campagne.annee.id;
       body.saisonId = campagne.saison.id;
    
         return this.http.post(
           this.appService.getUrl(
             '/campagnes'
           ),
           body,
           this.token
         );
 
          
     }
     update(campagne: ICampagne): Observable<any> {
       let body: any = {};
       body.id = campagne.id;
       body.anneeId = campagne.annee.id;
       body.saisonId = campagne.saison.id;
    
 
         return this.http.put(
           this.appService.getUrl(
             '/campagnes'
           ),
           body,
           this.token
         );
 
     }
 
     delete(campagne: ICampagne): Observable<any> {
       return this.http.delete(
         this.appService.getUrl(
           '/campagnes/' + campagne.id
         ),
         this.token
       );
     }
 
   
 }
 