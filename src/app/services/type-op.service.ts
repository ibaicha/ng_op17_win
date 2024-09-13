import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
 
import { ITypeOp } from '../interfaces/type-op.interface';

@Injectable({
  providedIn: 'root',
})
export class TypeOpService {
  constructor(public http: HttpClient, private appService: AppService) {}
 token = this.appService.getLocalToken();

 getTypeOp(id: number): Observable<any> {
  return this.http.get(
    this.appService.getUrl(
      '/type-ops/'+ id
    ),
    this.token
  );
}

  getTypeOps(): Observable<any> {
    return this.http.get(
      this.appService.getUrl(
        '/type-ops'
      ),
      this.token
    );
  }


    create(typeOp: ITypeOp): Observable<any> {

      let body: any = {};
      body.id = typeOp.id;
      body.name = typeOp.name;
 
   
        return this.http.post(
          this.appService.getUrl(
            '/type-ops'
          ),
          body,
          this.token
        );

         
    }
    update(typeOp: ITypeOp): Observable<any> {
      let body: any = {};
      body.id = typeOp.id;
      body.name = typeOp.name;
 
   

        return this.http.put(
          this.appService.getUrl(
            '/type-ops'
          ),
          body,
          this.token
        );

    }

    delete(typeOp: ITypeOp): Observable<any> {
      return this.http.delete(
        this.appService.getUrl(
          '/type-ops/' + typeOp.id
        ),
        this.token
      );
    }

  
}
