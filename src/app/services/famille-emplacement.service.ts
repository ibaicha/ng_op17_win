import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IFamilleEmplacement } from '../interfaces/filiere.interface';

@Injectable({
  providedIn: 'root'
})
export class FamilleEmplacementService {

  constructor(public http: HttpClient, private appService: AppService) {}
  token = this.appService.getLocalToken();
 
  getFamilleEmplacement(id: number): Observable<any> {
   return this.http.get(
     this.appService.getUrl(
       '/familleEmplacements/'+ id
     ),
     this.token
   );
 }
 
   getFamilleEmplacements(): Observable<any> {
     return this.http.get(
       this.appService.getUrl(
         '/familleEmplacements'
       ),
       this.token
     );
   }
 
 
     create(familleEmplacement: IFamilleEmplacement): Observable<any> {
 
       let body: any = {};
       body.id = familleEmplacement.id;
       body.name = familleEmplacement.name;

         return this.http.post(
           this.appService.getUrl(
             '/familleEmplacements'
           ),
           body,
           this.token
         );
 
          
     }
     update(familleEmplacement: IFamilleEmplacement): Observable<any> {
       let body: any = {};
       body.id = familleEmplacement.id;
       body.name = familleEmplacement.name;

    
 
         return this.http.put(
           this.appService.getUrl(
             '/familleEmplacements'
           ),
           body,
           this.token
         );
 
     }
 
     delete(familleEmplacement: IFamilleEmplacement): Observable<any> {
       return this.http.delete(
         this.appService.getUrl(
           '/familleEmplacements/' + familleEmplacement.id
         ),
         this.token
       );
     }
 
   
 }
 