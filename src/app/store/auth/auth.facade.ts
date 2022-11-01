import { Injectable } from '@angular/core';
import { LoginPayload } from './interfaces/payloads/login.payload';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { AuthLogin } from './auth.actions';
import { selectAuthLoginError, selectAuthLoginLoading, selectAuthLoginSuccess } from './auth.selectors';

@Injectable()
export class AuthFacade {

  // ========== Selectors Login
  authLoginLoading$ = this.store.select(selectAuthLoginLoading);
  authLoginSuccess$ = this.store.select(selectAuthLoginSuccess);
  authLoginError$ = this.store.select(selectAuthLoginError);

  constructor(private store: Store<AppState>) {}

  public login(login: LoginPayload): void {
    this.store.dispatch(new AuthLogin(login));
  }
}
