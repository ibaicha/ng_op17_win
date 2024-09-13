import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {DbindexedService } from './dbindexed.service';

import { forkJoin, Observable } from 'rxjs';


@Injectable()
export class ShareService {

  public myToken = '';
  NewLigne = [];


  constructor(private appService: AppService, private dbindexedService: DbindexedService, private http: HttpClient) { }

  public serviceURL = this.appService.getUrl('');
  public myHeader = new HttpHeaders().set(
    'Content-Type', 'application/json; charset=utf-8');


  public myHeaderParam = this.myHeader.set("Authorization", "Bearer " );

  public makeToken(token: string){

  const header = { Authorization: `Bearer ${token}`};

  return {
    headers: header
  };
  }

  public makeHeader(){
  
  return '';
}

 


  getLogin(headers: any): Observable<any> {
    return this.http.post(this.serviceURL + 'auth/signin', headers);
  }


  getProfils(headers: any): Observable<any> {
    return this.http.get(this.serviceURL + 'api/profils', headers);
  }

  getAllUsers(headers: any): Observable<any> {
    return this.http.get(this.serviceURL + 'api/users/allusers', headers);
  }
  getUsers(headers: any): Observable<any> {
    return this.http.get(this.serviceURL + 'api/users', headers);
  }
  getUser(headers:  any, userId: number): Observable<any> {
    return this.http.get(this.serviceURL + 'api/users/ ' + userId + '/specific', headers);
  }
 

}
