import { Injectable } from '@angular/core';
import { LoginPayload } from './interfaces/payloads/login.payload';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { AuthGetJwtToken, AuthLogin, AuthLogout } from './auth.actions';
import {
  selectAuthIsLogged,
  selectAuthJwtToken,
  selectAuthLoginError,
  selectAuthLoginLoading,
  selectAuthLoginSuccess
} from './auth.selectors';

@Injectable()
export class AuthFacade {

  // ========== Selectors Login
  authLoginLoading$ = this.store.select(selectAuthLoginLoading);
  authLoginSuccess$ = this.store.select(selectAuthLoginSuccess);
  authLoginError$ = this.store.select(selectAuthLoginError);

  // ========== Selectors IsLogged
  authIsLogged$ = this.store.select(selectAuthIsLogged);

  // ========== Selectors Jwt
  authJwtToken$ = this.store.select(selectAuthJwtToken);

  constructor(private store: Store<AppState>) {}

  public login(login: LoginPayload): void {
    this.store.dispatch(new AuthLogin(login));
  }

  public logout(): void {
    this.store.dispatch(new AuthLogout());
  }

  public getJwtToken(): void {
    this.store.dispatch(new AuthGetJwtToken());
  }

}
