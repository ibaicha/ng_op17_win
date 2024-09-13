import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Societe } from '../models/societe';
import { ISociete } from '../interfaces/societe.interface';

@Injectable({
  providedIn: 'root',
})
export class SocieteService {
  constructor(public http: HttpClient, private appService: AppService) {}
 token = this.appService.getLocalToken();

 getSociete(id: number): Observable<any> {
  return this.http.get(
    this.appService.getUrl(
      '/societes/'+ id
    ),
    this.token
  );
}

  getSocietes(): Observable<any> {
    return this.http.get(
      this.appService.getUrl(
        '/societes'
      ),
      this.token
    );
  }


    create(societe: ISociete): Observable<any> {

      let body: any = {};
      body.id = societe.id;
      body.name = societe.name;
      body.sigle = societe.sigle;
   
        return this.http.post(
          this.appService.getUrl(
            '/societes'
          ),
          body,
          this.token
        );

         
    }
    update(societe: ISociete): Observable<any> {
      let body: any = {};
      body.id = societe.id;
      body.name = societe.name;
      body.sigle = societe.sigle;
   

        return this.http.put(
          this.appService.getUrl(
            '/societes'
          ),
          body,
          this.token
        );

    }

    delete(societe: ISociete): Observable<any> {
      return this.http.delete(
        this.appService.getUrl(
          '/societes/' + societe.id
        ),
        this.token
      );
    }

  
}
