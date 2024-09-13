import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IIdentifiant } from '../interfaces/identifiant.interface';

@Injectable({
  providedIn: 'root',
})
export class IdentifiantService {
  constructor(public http: HttpClient, private appService: AppService) {}
  token = this.appService.getLocalToken();

  getIdentifiant(id: number): Observable<any> {
    return this.http.get(
      this.appService.getUrl('/identifiants/' + id),
      this.token
    );
  }

  getIdentifiants(): Observable<any> {
    return this.http.get(
      this.appService.getUrl('/identifiants/all'),
      this.token
    );
  }
  getAllIdentifiantsWithFilters(filter: any): Observable<any> {
    return this.http.get(this.appService.getUrl('/identifiants'), {
      params: filter,
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }
  create(identifiant: IIdentifiant): Observable<any> {
    let body: any = {};

    return this.http.post(
      this.appService.getUrl('/identifiants/create'),
      body,
      this.token
    );
  }
  update(identifiant: IIdentifiant): Observable<any> {
    let body: any = {};

    return this.http.put(
      this.appService.getUrl('/identifiants/update/' + identifiant.id),
      body,
      this.token
    );
  }
  delete(identifiant: IIdentifiant): Observable<any> {
    return this.http.delete(
      this.appService.getUrl('/identifiants/delete/' + identifiant.id),
      this.token
    );
  }
}
