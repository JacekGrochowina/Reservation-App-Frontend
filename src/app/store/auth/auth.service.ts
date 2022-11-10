import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigAPI as api } from '../../shared/utils/api/config';
import { LoginPayload } from './interfaces/payloads/login.payload';
import { JwtResponse } from './interfaces/responses/jwt.response';
import { RegisterPayload } from './interfaces/payloads/register.payload';
import { MessageResponse } from '../../shared/utils/interfaces/responses/message.response';
import { UserResponse } from './interfaces/responses/user.response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public TOKEN_NAME = 'jwtToken';

  constructor(private http: HttpClient) {}

  public login(login: LoginPayload): Observable<JwtResponse> {
    const url = `${api.apiURL}/login`;
    return this.http.post<JwtResponse>(url, login, api.headers);
  }

  public register(register: RegisterPayload): Observable<MessageResponse> {
    const url = `${api.apiURL}/register`;
    return this.http.post<MessageResponse>(url, register, api.headers);
  }

  public getCurrentUser(): Observable<UserResponse> {
    const url = `${api.apiURL}/user`;
    return this.http.get<UserResponse>(url, api.headers);
  }

  public setJwtToken({ jwt }: JwtResponse): void {
    localStorage.setItem(this.TOKEN_NAME, jwt);
  }

  public getJwtToken(): string | null {
    return localStorage.getItem(this.TOKEN_NAME);
  }

}
