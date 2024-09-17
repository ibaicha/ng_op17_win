import { Injectable } from '@angular/core';
// import { Http, RequestOptionsArgs, Response} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Headers, RequestOptions } from '@angular/http';
// import { Body } from '@angular/http/src/body';

import * as serviceURL_Data from '../../assets/env.json';

@Injectable()
export class AppService {
  // private serviceURL = 'https://api-horticulture.suivi-paddy.org/';
  // private serviceURL = 'http://192.168.1.20:8000/';
  // private serviceURL = 'http://192.168.43.97:80OO/';
  // private serviceURL = 'http://localhost:8000/';
  // private serviceURL = 'http://172.20.10.3:3000';
  // private serviceURL = 'https://test-p94w.onrender.com';
  // private serviceURL = 'http://172.16.1.127:3000';

  private serviceURL = '';



  public body = {};
  public myHeader = new HttpHeaders().set(
    'Content-Type',
    'application/json; charset=utf-8'
  );
  /*
private headers: Headers = new Headers(
  {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
);
*/

  constructor(private http: HttpClient) {
    const data: any = serviceURL_Data;
    console.log('Data', data.data[0]['serviceURL']);
    this.serviceURL = data.data[0]['serviceURL'];
  }

  getUrl(url: string): string {

    return this.serviceURL + url;
  }

  getLocalToken(): any {
    return localStorage.getItem('access_token');
  }

  getLocalselectedCampagneAnneeId(): any {
    return localStorage.getItem('selectedAnneeId');
  }
  getLocalselectedCampagneSaisonId(): any {
    return localStorage.getItem('selectedSaisonId');
  }

  getLocalselectedPoint(): any {
    return localStorage.getItem('selectedPointId');
  }

  getLocalselectedOpId(): any {
    return localStorage.getItem('selectedOpId');
  }
  getLocalselectedVarieteId(): any {
    return localStorage.getItem('selectedVarieteId');
  }
  getLocalselectedLotId(): any {
    return localStorage.getItem('selectedLotId');
  }

  getLocalselectedSocieteId(): any {
    return localStorage.getItem('selectedSocieteId');
  }

  getLocalselectedAgenceId(): any {
    return localStorage.getItem('selectedAgenceId');
  }

  getLocalselectedCampagneAnneeName(): any {
    return localStorage.getItem('selectedAnneeName');
  }
  getLocalselectedCampagneSaisonName(): any {
    return localStorage.getItem('selectedSaisonName');
  }

  getLocalselectedVarieteName(): any {
    return localStorage.getItem('selectedVarieteName');
  }
  getLocalselectedOpName(): any {
    return localStorage.getItem('selectedOpName');
  }

  getLocalselectedExploitationId(): any {
    return localStorage.getItem('selectedExploitationId');
  }

  getLocalselectedChargeExploitationId(): any {
    return localStorage.getItem('selectedChargeExploitationId');
  }
  getLocalselectedChargeExploitationName(): any {
    return localStorage.getItem('selectedChargeExploitationName');
  }

  getLocalselectedChargeExploitationUniteId(): any {
    return localStorage.getItem('selectedChargeExploitationUniteId');
  }
  getLocalselectedChargeExploitationUniteName(): any {
    return localStorage.getItem('selectedChargeExploitationUniteName');
  }

  removeNullProperties(obj: Record<string, any>) {
    for (const key in obj) {
      if (obj[key] === null) {
        delete obj[key];
      }
    }
  }
}
