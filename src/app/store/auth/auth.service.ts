import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as moment from 'moment';
import { ConfigAPI as api } from '../../shared/utils/api/config';
import { catchError, tap } from 'rxjs/operators';
import { LoginPayload } from './interfaces/payloads/login.payload';
import { JwtResponse } from './interfaces/responses/jwt.response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // Tutorial
  // https://jasonwatmore.com/post/2020/04/29/angular-9-basic-http-authentication-tutorial-example
  // https://blog.angular-university.io/angular-jwt-authentication/

  constructor(private http: HttpClient) {}

  public login(login: LoginPayload): Observable<any> {
    const url = `${api.apiURL}/login`;
    return this.http.post<string>(url, login, api.headers);
  }

  public setJwtToken(jwt: JwtResponse): void {
    console.log(jwt);
  }

  private setSession(authResult): any {
    console.log('authResult', authResult);
    // const expiresAt = moment().add(authResult.expiresIn, 'second');
    //
    // localStorage.setItem('id_token', authResult.idToken);
    // localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
  }

}
