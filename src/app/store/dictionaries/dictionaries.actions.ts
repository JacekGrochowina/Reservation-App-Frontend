import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Dictionaries, DictionaryType } from './dictionaries.state';

export enum DictionariesActionTypes {
  get = '[Dictionaries] Get Dictionaries',
  getSuccess = '[Dictionaries] Get Dictionaries Success',
  getFail = '[Dictionaries] Get Dictionaries Fail',
  getClear = '[Dictionaries] Get Dictionaries Clear',
  getClearError = '[Dictionaries] Get Dictionaries Clear Error',
}

// ========== Get Dictionaries
export class GetDictionary implements Action {
  readonly type = DictionariesActionTypes.get;

  constructor(public payload: Dictionaries, public params?: any) {}
}

export class GetDictionarySuccess implements Action {
  readonly type = DictionariesActionTypes.getSuccess;

  constructor(public payload: Dictionaries, public items: DictionaryType[]) {}
}

export class GetDictionaryFail implements Action {
  readonly type = DictionariesActionTypes.getFail;

  constructor(public payload: Dictionaries, public error: HttpErrorResponse) {}
}

export class GetDictionaryClear implements Action {
  readonly type = DictionariesActionTypes.getClear;

  constructor(public payload: Dictionaries) {}
}

export class GetDictionaryClearError implements Action {
  readonly type = DictionariesActionTypes.getClearError;

  constructor(public payload: Dictionaries) {}
}

export type DictionariesActions =
  | GetDictionary
  | GetDictionarySuccess
  | GetDictionaryFail
  | GetDictionaryClear
  | GetDictionaryClearError;
