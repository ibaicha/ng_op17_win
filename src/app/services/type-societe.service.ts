import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ITypeSociete } from '../interfaces/type-societe.interface';

@Injectable({
  providedIn: 'root',
})
export class TypeSocieteService {
  constructor(public http: HttpClient, private appService: AppService) {}
 token = this.appService.getLocalToken();

 getTypeSociete(id: number): Observable<any> {
  return this.http.get(
    this.appService.getUrl(
      '/typeSocietes/'+ id
    ),
    this.token
  );
}

  getTypeSocietes(): Observable<any> {
    return this.http.get(
      this.appService.getUrl(
        '/typeSocietes'
      ),
      this.token
    );
  }


    create(typeSociete: ITypeSociete): Observable<any> {

      let body: any = {};
      body.id = typeSociete.id;
      body.name = typeSociete.name;
     
   
        return this.http.post(
          this.appService.getUrl(
            '/typeSocietes'
          ),
          body,
          this.token
        );

         
    }
    update(typeSociete: ITypeSociete): Observable<any> {
      let body: any = {};
      body.id = typeSociete.id;
      body.name = typeSociete.name;
    

        return this.http.put(
          this.appService.getUrl(
            '/typeSocietes'
          ),
          body,
          this.token
        );

    }

    delete(typeSociete: ITypeSociete): Observable<any> {
      return this.http.delete(
        this.appService.getUrl(
          '/typeSocietes/' + typeSociete.id
        ),
        this.token
      );
    }

  
}
