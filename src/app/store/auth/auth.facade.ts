import { Injectable } from '@angular/core';
import { LoginPayload } from './interfaces/payloads/login.payload';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { AuthGetCurrentUser, AuthGetJwtToken, AuthLogin, AuthLogout, AuthRegister } from './auth.actions';
import {
  selectAuthIsLogged,
  selectAuthJwtToken,
  selectAuthLoginError,
  selectAuthLoginLoading,
  selectAuthLoginSuccess,
  selectAuthRegisterError,
  selectAuthRegisterLoading,
  selectAuthRegisterSuccess,
} from './auth.selectors';
import { RegisterPayload } from './interfaces/payloads/register.payload';

@Injectable()
export class AuthFacade {

  // ========== Selectors Login
  authLoginLoading$ = this.store.select(selectAuthLoginLoading);
  authLoginSuccess$ = this.store.select(selectAuthLoginSuccess);
  authLoginError$ = this.store.select(selectAuthLoginError);

  // ========== Selectors Login
  authRegisterLoading$ = this.store.select(selectAuthRegisterLoading);
  authRegisterSuccess$ = this.store.select(selectAuthRegisterSuccess);
  authRegisterError$ = this.store.select(selectAuthRegisterError);

  // ========== Selectors IsLogged
  authIsLogged$ = this.store.select(selectAuthIsLogged);

  // ========== Selectors Jwt
  authJwtToken$ = this.store.select(selectAuthJwtToken);

  constructor(private store: Store<AppState>) {}

  public login(login: LoginPayload): void {
    this.store.dispatch(new AuthLogin(login));
  }

  public register(register: RegisterPayload): void {
    this.store.dispatch(new AuthRegister(register));
  }

  public logout(): void {
    this.store.dispatch(new AuthLogout());
  }

  public getJwtToken(): void {
    this.store.dispatch(new AuthGetJwtToken());
  }

  public getCurrentUser(): void {
    this.store.dispatch(new AuthGetCurrentUser());
  }

}
