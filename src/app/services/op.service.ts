import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { IOp } from '../interfaces/op.interface';

@Injectable({
  providedIn: 'root',
})
export class OpService {
  OpDialogTitre = '';
  newOp: any = {};
  // editedOp: any = {};
  editedOp: IOp | undefined;
  deletedOp: any = {};
  //ops: IOp[] = [];
  biens = [];

  constructor(public http: HttpClient, private appService: AppService) {}
  token = this.appService.getLocalToken();

  getOp(id: number): Observable<any> {
    return this.http.get(this.appService.getUrl('/ops/' + id), this.token);
  }

  getOps(): Observable<any> {
    return this.http.get(this.appService.getUrl('/ops/all'), this.token);
  }

  getAllOpWithFilters(filter: any): Observable<any> {
    let httpParams = new HttpParams();
    for (const key in filter) {
      if (filter.hasOwnProperty(key)) {
        httpParams = httpParams.set(key, filter[key]);
      }
    }
    const myHttp = this.http.get(this.appService.getUrl('/ops'), {
      params: httpParams,
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    });

    console.log('params', httpParams);
    return myHttp;
  }

  getOpsCustom(): Observable<any> {
    return this.http.get(this.appService.getUrl('/ops/custom'), this.token);
  }

  getAllOpsCustomFromAgence(id: number): Observable<any> {
    return this.http.get(
      this.appService.getUrl('/ops/custom/agence/' + id),
      this.token
    );
  }

  create(op: IOp): Observable<any> {
    let body: any = {};
    console.log(op);
    body.id = null;
    body.name = op.name;
    //body.typeOpId = op.typeOp.id;

    return this.http.post(
      this.appService.getUrl('/ops/create'),
      body,
      this.token
    );
  }
  update(op: IOp): Observable<any> {
    let body: any = {};
    body.id = op.id;
    body.name = op.name;
    //body.typeOpId = op.typeOp.id;

    return this.http.put(
      this.appService.getUrl('/ops/update/' + op.id),
      body,
      this.token
    );
  }

  delete(op: IOp): Observable<any> {
    return this.http.delete(
      this.appService.getUrl('/ops/' + op.id),
      this.token
    );
  }
}
