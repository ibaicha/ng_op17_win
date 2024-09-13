import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TypeClient } from '../models/type-client'
import { ITypeClient } from '../interfaces/type-client.interface';

@Injectable({
  providedIn: 'root',
})
export class TypeClientService {
  constructor(public http: HttpClient, private appService: AppService) {}
 token = this.appService.getLocalToken();

 getTypeClient(id: number): Observable<any> {
  return this.http.get(
    this.appService.getUrl(
      '/typeClients/'+ id
    ),
    this.token
  );
}

  getTypeClients(): Observable<any> {
    return this.http.get(
      this.appService.getUrl(
        '/typeClients'
      ),
      this.token
    );
  }


    create(typeClient: ITypeClient): Observable<any> {

      let body: any = {};
      body.id = typeClient.id;
      body.name = typeClient.name;
   
        return this.http.post(
          this.appService.getUrl(
            '/typeClients'
          ),
          body,
          this.token
        );

         
    }
    update(typeClient: ITypeClient): Observable<any> {
      let body: any = {};
      body.id = typeClient.id;
      body.name = typeClient.name;
  

        return this.http.put(
          this.appService.getUrl(
            '/typeClients'
          ),
          body,
          this.token
        );

    }

    delete(typeClient: ITypeClient): Observable<any> {
      return this.http.delete(
        this.appService.getUrl(
          '/typeClients/' + typeClient.id
        ),
        this.token
      );
    }

  
}

