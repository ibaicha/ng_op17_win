import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Personne } from '../models/personne';
import { IPersonne } from '../interfaces/personne.interface';

@Injectable({
  providedIn: 'root',
})
export class PersonneService {
  constructor(public http: HttpClient, private appService: AppService) {}
 token = this.appService.getLocalToken();

 getPersonne(id: number): Observable<any> {
  return this.http.get(
    this.appService.getUrl(
      '/personnes/'+ id
    ),
    this.token
  );
}

  getPersonnes(): Observable<any> {
    return this.http.get(
      this.appService.getUrl(
        '/personnes'
      ),
      this.token
    );
  }


    create(personne: IPersonne): Observable<any> {

      let body: any = {};
      body.id = personne.id;
      body.firstname = personne.firstname;
      body.lastname = personne.lastname;
     
   
        return this.http.post(
          this.appService.getUrl(
            '/personnes'
          ),
          body,
          this.token
        );

         
    }
    update(personne: IPersonne): Observable<any> {
      let body: any = {};
      body.id = personne.id;
      body.firstname = personne.firstname;
      body.lastname = personne.lastname;
    

        return this.http.put(
          this.appService.getUrl(
            '/personnes'
          ),
          body,
          this.token
        );

    }

    delete(personne: IPersonne): Observable<any> {
      return this.http.delete(
        this.appService.getUrl(
          '/personnes/' + personne.id
        ),
        this.token
      );
    }

  
}
