import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IFiliere } from '../interfaces/filiere.interface';

@Injectable({
  providedIn: 'root'
})
export class FiliereService {

  constructor(public http: HttpClient, private appService: AppService) {}
  token = this.appService.getLocalToken();
 
  getFiliere(id: number): Observable<any> {
   return this.http.get(
     this.appService.getUrl(
       '/filieres/'+ id
     ),
     this.token
   );
 }
 
   getFilieres(): Observable<any> {
     return this.http.get(
       this.appService.getUrl(
         '/filieres'
       ),
       this.token
     );
   }
 
 
     create(filiere: IFiliere): Observable<any> {
 
       let body: any = {};
       body.id = filiere.id;
       body.name = filiere.name;

         return this.http.post(
           this.appService.getUrl(
             '/filieres'
           ),
           body,
           this.token
         );
 
          
     }
     update(filiere: IFiliere): Observable<any> {
       let body: any = {};
       body.id = filiere.id;
       body.name = filiere.name;

    
 
         return this.http.put(
           this.appService.getUrl(
             '/filieres'
           ),
           body,
           this.token
         );
 
     }
 
     delete(filiere: IFiliere): Observable<any> {
       return this.http.delete(
         this.appService.getUrl(
           '/filieres/' + filiere.id
         ),
         this.token
       );
     }
 
   
 }
 