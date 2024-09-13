import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IVariete } from '../interfaces/filiere.interface';

@Injectable({
  providedIn: 'root'
})
export class VarieteService {

  constructor(public http: HttpClient, private appService: AppService) {}
  token = this.appService.getLocalToken();
 
  getVariete(id: number): Observable<any> {
   return this.http.get(
     this.appService.getUrl(
       '/varietes/'+ id
     ),
     this.token
   );
 }
 
   getVarietes(): Observable<any> {
     return this.http.get(
       this.appService.getUrl(
         '/varietes'
       ),
       this.token
     );
   }
 
 
     create(variete: IVariete): Observable<any> {
 
       let body: any = {};
       body.id = variete.id;
       body.name = variete.name;
       body.surface_unite = variete.surface_unite;
       body.surface_unite = variete.quantite_unite;
       body.surface_unite = variete.rendement_unite;
       body.surface_unite = variete.isActive;
       body.surface_unite = variete.produit.id;
    
         return this.http.post(
           this.appService.getUrl(
             '/varietes'
           ),
           body,
           this.token
         );
 
          
     }
     update(variete: IVariete): Observable<any> {
       let body: any = {};
       body.id = variete.id;
       body.name = variete.name;
       body.surface_unite = variete.surface_unite;
       body.surface_unite = variete.quantite_unite;
       body.surface_unite = variete.rendement_unite;
       body.surface_unite = variete.isActive;
       body.surface_unite = variete.produit.id;
 
         return this.http.put(
           this.appService.getUrl(
             '/varietes'
           ),
           body,
           this.token
         );
 
     }
 
     delete(variete: IVariete): Observable<any> {
       return this.http.delete(
         this.appService.getUrl(
           '/varietes/' + variete.id
         ),
         this.token
       );
     }
 
   
 }
 