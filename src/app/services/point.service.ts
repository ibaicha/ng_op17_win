import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { Observable } from 'rxjs/internal/Observable';
import { IPoint } from '../interfaces/pays.interface';

@Injectable({
  providedIn: 'root'
})
export class PointService {

    constructor(public http: HttpClient, private appService: AppService) {}
   token = this.appService.getLocalToken();

   getPoint(id: number): Observable<any> {
    return this.http.get(
      this.appService.getUrl(
        '/points/'+ id
      ),
      this.token
    );
  }

    getPoints(): Observable<any> {
      return this.http.get(
        this.appService.getUrl(
          '/points'
        ),
        this.token
      );
    }

    getPointsCustom(): Observable<any> {
      return this.http.get(
        this.appService.getUrl(
          '/point/custom'
        ),
        this.token
      );
    }

    getPointAgences(): Observable<any> {
      return this.http.get(
        this.appService.getUrl(
          '/pointAgences'
        ),
        this.token
      );
    }



    create(point: IPoint): Observable<any> {
        let body: any = {};
        console.log(point);
        body.id = null;
        body.name = point.name;
        body.localiteId = point.localite.id;

          return this.http.post(
            this.appService.getUrl(
              '/points/create'
            ),
            body,
            this.token
          );


    }
    update(point: IPoint): Observable<any> {
        let body: any = {};
        body.id = point.id;
        body.name = point.name;
        body.localiteId = point.localite.id;

          return this.http.put(
            this.appService.getUrl(
              '/points/update/' + point.id
            ),
            body,
            this.token
          );

    }

    delete(point: IPoint): Observable<any> {
        return this.http.delete(
          this.appService.getUrl(
            '/points/' + point.id
          ),
          this.token
        );
    }




  }
