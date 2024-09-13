import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IBien } from '../interfaces/bien.interface';

@Injectable({
  providedIn: 'root',
})
export class BienService {

  BienDialogTitre = '';
  newBien: any = {};
  editedBien: any = {};
  deletedBien: any = {};
  //biens: IBien[] = [];
  biens = [];


  constructor(public http: HttpClient, private appService: AppService) {}
 token = this.appService.getLocalToken();

 getBien(id: number): Observable<any> {
  return this.http.get(
    this.appService.getUrl(
      '/biens/'+ id
    ),
    this.token
  );
}

  getBiens(): Observable<any> {
    return this.http.get(
      this.appService.getUrl(
        '/biens'
      ),
      this.token
    );
  }

  getBiensOnClient(id: number): Observable<any> {
    return this.http.get(
      this.appService.getUrl(
        '/biens/clientId/'+ id
      ),
      this.token
    );
  }

  create(bien: IBien): Observable<any> {
      let body: any = {};
      console.log(bien);
      body.id = null;
      body.code = bien.code;
      body.valeur = bien.valeur;
      body.anneeId = bien.annee.id;
      body.typeBienId = bien.typeBien.id;
      body.automobile = bien.automobile;
      body.residence = bien.residence;
      body.commercial = bien.commercial;
      body.clientId = bien.clientId;
 
        return this.http.post(
          this.appService.getUrl(
            '/biens/create'
          ),
          body,
          this.token
        );

         
  }
  update(bien: IBien): Observable<any> {
      let body: any = {};
      body.id = bien.id;
      body.code = bien.code;
      body.valeur = bien.valeur;
      body.anneeId = bien.annee.id;
      body.typeBienId = bien.typeBien.id;
      body.automobile = bien.automobile;
      body.residence = bien.residence;
      body.commercial = bien.commercial;
      body.clientId = bien.clientId;
   
        return this.http.put(
          this.appService.getUrl(
            '/biens/update/' + bien.id
          ),
          body,
          this.token
        );

  }

  delete(bien: IBien): Observable<any> {
      return this.http.delete(
        this.appService.getUrl(
          '/biens/' + bien.id
        ),
        this.token
      );
  }

  
}
