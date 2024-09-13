import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IProfession } from '../interfaces/profession.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfessionService {
  constructor(public http: HttpClient, private appService: AppService) {}
 token = this.appService.getLocalToken();

 getProfession(id: number): Observable<any> {
  return this.http.get(
    this.appService.getUrl(
      '/professions/'+ id
    ),
    this.token
  );
}

  getProfessions(): Observable<any> {
    return this.http.get(
      this.appService.getUrl(
        '/professions'
      ),
      this.token
    );
  }


    create(profession: IProfession): Observable<any> {

      let body: any = {};
      body.id = profession.id;
      body.name = profession.name;
   
        return this.http.post(
          this.appService.getUrl(
            '/professions'
          ),
          body,
          this.token
        );

         
    }
    update(profession: IProfession): Observable<any> {
      let body: any = {};
      body.id = profession.id;
      body.name = profession.name;  

        return this.http.put(
          this.appService.getUrl(
            '/professions'
          ),
          body,
          this.token
        );

    }

    delete(profession: IProfession): Observable<any> {
      return this.http.delete(
        this.appService.getUrl(
          '/professions/' + profession.id
        ),
        this.token
      );
    }

  
}
