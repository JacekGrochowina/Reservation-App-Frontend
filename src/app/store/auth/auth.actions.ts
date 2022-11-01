import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginPayload } from './interfaces/payloads/login.payload';
import { RegisterPayload } from './interfaces/payloads/register.payload';
import { JwtResponse } from './interfaces/responses/jwt.response';

export enum AuthActionTypes {
  login = '[Auth/Login] Login',
  loginSuccess = '[Auth/Login] Login Success',
  loginFail = '[Auth/Login] Login Fail',
  loginClear = '[Auth/Login] Login Clear',
  loginClearError = '[Auth/Login] Login Clear Error',

  register = '[Auth/Register] Register',
  registerSuccess = '[Auth/Register] Register Success',
  registerFail = '[Auth/Register] Register Fail',
  registerClear = '[Auth/Register] Register Clear',
  registerClearError = '[Auth/Register] Register Clear Error',

  setJwtToken = '[Auth/Jwt] Set Jwt Token',
  getJwtToken = '[Auth/Jwt] Get Jwt Token',
  expireJwtToken = '[Auth/Jwt] Expire Jwt Token',
}

// ========== Login
export class AuthLogin implements Action {
  readonly type = AuthActionTypes.login;

  constructor(public payload: LoginPayload) {}
}

export class AuthLoginSuccess implements Action {
  readonly type = AuthActionTypes.loginSuccess;

  constructor(public payload: JwtResponse) {}
}

export class AuthLoginFail implements Action {
  readonly type = AuthActionTypes.loginFail;

  constructor(public payload: HttpErrorResponse) {}
}

export class AuthLoginClear implements Action {
  readonly type = AuthActionTypes.loginClear;
}

export class AuthLoginClearError implements Action {
  readonly type = AuthActionTypes.loginClearError;
}

// ========== Register
export class AuthRegister implements Action {
  readonly type = AuthActionTypes.register;

  constructor(public payload: RegisterPayload) {}
}

export class AuthRegisterSuccess implements Action {
  readonly type = AuthActionTypes.registerSuccess;
}

export class AuthRegisterFail implements Action {
  readonly type = AuthActionTypes.registerFail;

  constructor(public payload: HttpErrorResponse) {}
}

export class AuthRegisterClear implements Action {
  readonly type = AuthActionTypes.registerClear;
}

export class AuthRegisterClearError implements Action {
  readonly type = AuthActionTypes.registerClearError;
}

// ========== Set Jwt Token
export class AuthSetJwtToken implements Action {
  readonly type = AuthActionTypes.setJwtToken;

  constructor(public payload: JwtResponse) {}
}

export type AuthActions =
  | AuthLogin
  | AuthLoginSuccess
  | AuthLoginFail
  | AuthLoginClear
  | AuthLoginClearError
  | AuthRegister
  | AuthRegisterSuccess
  | AuthRegisterFail
  | AuthRegisterClear
  | AuthRegisterClearError
  | AuthSetJwtToken;
