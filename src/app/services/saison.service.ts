import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ISaison } from '../interfaces/saison.interface';

@Injectable({
  providedIn: 'root'
})
export class SaisonService {

  constructor(public http: HttpClient, private appService: AppService) {}
  token = this.appService.getLocalToken();
 
  getSaison(id: number): Observable<any> {
   return this.http.get(
     this.appService.getUrl(
       '/saisons/'+ id
     ),
     this.token
   );
 }
 
   getSaisons(): Observable<any> {
     return this.http.get(
       this.appService.getUrl(
         '/saisons'
       ),
       this.token
     );
   }
 
 
     create(saison: ISaison): Observable<any> {
 
       let body: any = {};
       body.id = saison.id;
       body.name = saison.name;
       body.description = saison.description;
    
         return this.http.post(
           this.appService.getUrl(
             '/saisons'
           ),
           body,
           this.token
         );
 
          
     }
     update(saison: ISaison): Observable<any> {
       let body: any = {};
       body.id = saison.id;
       body.name = saison.name;
       body.description = saison.description;
    
 
         return this.http.put(
           this.appService.getUrl(
             '/saisons'
           ),
           body,
           this.token
         );
 
     }
 
     delete(saison: ISaison): Observable<any> {
       return this.http.delete(
         this.appService.getUrl(
           '/saisons/' + saison.id
         ),
         this.token
       );
     }
 
   
 }
 