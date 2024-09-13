import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { IPointAgence } from '../interfaces/point-agence.interface';


@Injectable({
  providedIn: 'root',
})
export class PointAgenceService {
  constructor(public http: HttpClient, private appService: AppService) {}
  token = this.appService.getLocalToken();

  getpointAgence(id: number): Observable<any> {
    return this.http.get(
      this.appService.getUrl(
        '/pointAgences/' + id
      ),
      this.token
    );
  }

  getpointAgences(): Observable<any> {
    return this.http.get(
      this.appService.getUrl('/pointAgences'),
      this.token
    );
  }

  ggetpointAgencesCustom(): Observable<any> {
    return this.http.get(
      this.appService.getUrl(
        '/pointAgences/custom'
      ),
      this.token
    );
  }

  create(
    pointAgence: IPointAgence
  ): Observable<any> {
    let body: any = {};
    console.log(pointAgence);
    body.id = null;
    body.agenceEtablissementFinancierId =
    pointAgence.agence.id;
    body.pointCollecteId =
      pointAgence.point.id;

    return this.http.post(
      this.appService.getUrl(
        '/pointAgences/create'
      ),
      body,
      this.token
    );
  }
  update(
    pointAgence: IPointAgence
  ): Observable<any> {
    let body: any = {};
    console.log(pointAgence);
    body.id = null;
    body.agenceEtablissementFinancierId =
      pointAgence.agence.id;
    body.pointCollecteId =
      pointAgence.point.id;

    return this.http.put(
      this.appService.getUrl(
        '/pointAgences/update/' +
          pointAgence.id
      ),
      body,
      this.token
    );
  }

  delete(
    pointAgence: IPointAgence
  ): Observable<any> {
    return this.http.delete(
      this.appService.getUrl(
        '/pointAgences/update/' +
          pointAgence.id
      ),
      this.token
    );
  }
}
