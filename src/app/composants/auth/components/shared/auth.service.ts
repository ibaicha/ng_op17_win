import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppService } from '../../../../services/app.service';
import * as fromCampagnes from '../../../../store/campagne';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ICampagne } from '../../../../interfaces/campagne.interface';
import { LoginService } from '../../../../services/login.service';


@Injectable({
  providedIn: 'root',
})

export class AuthService {
  // endpoint: string = 'http://localhost:4000/api';
  endpoint: string = this.appService.getUrl('');
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  campagnes$!: Observable<ICampagne[]>;
  campagnes: ICampagne[] = [];

  loginService: LoginService = new LoginService();


  constructor(private http: HttpClient, public router: Router, private appService: AppService, private readonly store: Store) {


  }
  //public serviceURL = this.appService.getUrl('');

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/register-user`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }

  // Sign-in
  signIn(user: User) {
    console.log('user: ' + user);
    this.store.dispatch(fromCampagnes.getCampagnes());
    this.campagnes$ = this.store.pipe(select(fromCampagnes.selectCampagnesList));
    this.campagnes$.subscribe((data: any[]) => {
      this.campagnes = data;
      this.campagnes = data.map((device: any) => {return {...device};});

      this.loginService.selectedCampagne = this.campagnes[0];

      console.log('this.loginService.selectedCampagne: ', this.loginService.selectedCampagne);

     });

    return this.http
      //.post<any>(`${this.endpoint}/signin`, user)
      .post<any>(`${this.endpoint}/auth/signin`, user)
      .subscribe((res: any) => {
        console.log(res);
        localStorage.setItem('access_token', res.token);
        this.getUserProfile(res._id).subscribe((res) => {
          //console.log(res);
          //this.currentUser = res;
          //this.router.navigate(['user-profile/' + res.msg._id]);
        });
      });
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }

  // User profile
  getUserProfile(id: any): Observable<any> {
    let api = `${this.endpoint}/profiles/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
