import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Client } from '../models/client';
import { IClient } from '../interfaces/client.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientService {

  ClientDialogTitre = '';
  newClient: any = {};
  // editedClient: any = {};
  editedClient: IClient | undefined;
  deletedClient: any = {};
  //clients: IClient[] = [];
  biens = [];


  constructor(public http: HttpClient, private appService: AppService) {}
 token = this.appService.getLocalToken();

 getClient(id: number): Observable<any> {
  return this.http.get(
    this.appService.getUrl(
      '/clients/'+ id
    ),
    this.token
  );
}

  getClients(): Observable<any> {
    return this.http.get(
      this.appService.getUrl(
        '/clients'
      ),
      this.token
    );
  }

  create(client: IClient): Observable<any> {
      let body: any = {};
      console.log(client);
      body.id = null;
      body.code = client.code;
      body.name = client.name;
      body.adresse = client.adresse;
      body.telephone = client.telephone;
      body.email = client.email;
      body.firstName = client.firstName;
      body.lastName = client.lastName;
      body.professionId = client.profession.id;
      body.societe = client.societe;
      body.sigle = client.sigle;
      body.typeClientId = client.typeClient.id;
   
        return this.http.post(
          this.appService.getUrl(
            '/clients/create'
          ),
          body,
          this.token
        );

         
  }
  update(client: IClient): Observable<any> {
      let body: any = {};
      body.id = client.id;
      body.code = client.code;
      body.name = client.name;
      body.adresse = client.adresse;
      body.telephone = client.telephone;
      body.email = client.email;
      body.firstName = client.firstName;
      body.lastName = client.lastName;
      body.professionId = client.profession.id;
      body.societe = client.societe;
      body.sigle = client.sigle;
      body.typeClientId = client.typeClient.id;
   
        return this.http.put(
          this.appService.getUrl(
            '/clients/update/' + client.id
          ),
          body,
          this.token
        );

  }

  delete(client: IClient): Observable<any> {
      return this.http.delete(
        this.appService.getUrl(
          '/clients/' + client.id
        ),
        this.token
      );
  }

  
}
