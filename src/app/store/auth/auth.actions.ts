import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginPayload } from './interfaces/payloads/login.payload';
import { RegisterPayload } from './interfaces/payloads/register.payload';
import { JwtResponse } from './interfaces/responses/jwt.response';
import { UserResponse } from './interfaces/responses/user.response';

export enum AuthActionTypes {
  login = '[Auth/Login] Login',
  loginSuccess = '[Auth/Login] Login Success',
  loginFail = '[Auth/Login] Login Fail',
  loginClear = '[Auth/Login] Login Clear',
  loginClearError = '[Auth/Login] Login Clear Error',

  logout = '[Auth/Logout] Logout',

  register = '[Auth/Register] Register',
  registerSuccess = '[Auth/Register] Register Success',
  registerFail = '[Auth/Register] Register Fail',
  registerClear = '[Auth/Register] Register Clear',
  registerClearError = '[Auth/Register] Register Clear Error',

  setJwtToken = '[Auth/Jwt] Set Jwt Token',
  getJwtToken = '[Auth/Jwt] Get Jwt Token',
  expireJwtToken = '[Auth/Jwt] Expire Jwt Token',

  getCurrentUser = '[Auth/CurrentUser] Get Current User',
  getCurrentUserSuccess = '[Auth/CurrentUser] Get Current User Success',
  getCurrentUserFail = '[Auth/CurrentUser] Get Current User Fail',
  getCurrentUserClear = '[Auth/CurrentUser] Get Current User Clear',
  getCurrentUserClearError = '[Auth/CurrentUser] Get Current User Clear Error',
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

// ========== Logout
export class AuthLogout implements Action {
  readonly type = AuthActionTypes.logout;
}

// ========== Register
export class AuthRegister implements Action {
  readonly type = AuthActionTypes.register;

  constructor(public payload: RegisterPayload) {}
}

export class AuthRegisterSuccess implements Action {
  readonly type = AuthActionTypes.registerSuccess;

  constructor(public payload: RegisterPayload) {}
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

// ========== Get Jwt Token
export class AuthGetJwtToken implements Action {
  readonly type = AuthActionTypes.getJwtToken;
}

// ========== Get Current User
export class AuthGetCurrentUser implements Action {
  readonly type = AuthActionTypes.getCurrentUser;
}

export class AuthGetCurrentUserSuccess implements Action {
  readonly type = AuthActionTypes.getCurrentUserSuccess;

  constructor(public payload: UserResponse) {}
}

export class AuthGetCurrentUserFail implements Action {
  readonly type = AuthActionTypes.getCurrentUserFail;

  constructor(public payload: HttpErrorResponse) {}
}

export class AuthGetCurrentUserClear implements Action {
  readonly type = AuthActionTypes.getCurrentUserClear;
}

export class AuthGetCurrentUserClearError implements Action {
  readonly type = AuthActionTypes.getCurrentUserClearError;
}

export type AuthActions =
  | AuthLogin
  | AuthLoginSuccess
  | AuthLoginFail
  | AuthLoginClear
  | AuthLoginClearError
  | AuthLogout
  | AuthRegister
  | AuthRegisterSuccess
  | AuthRegisterFail
  | AuthRegisterClear
  | AuthRegisterClearError
  | AuthSetJwtToken
  | AuthGetJwtToken
  | AuthGetCurrentUser
  | AuthGetCurrentUserSuccess
  | AuthGetCurrentUserFail
  | AuthGetCurrentUserClear
  | AuthGetCurrentUserClearError;
