import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ConfigAPI as api } from '../../shared/utils/api/config';
import { Dictionaries, DictionaryType } from './dictionaries.state';
import { catchError, map, tap } from 'rxjs/operators';
import { GetDictionaryFail, GetDictionarySuccess } from './dictionaries.actions';

@Injectable({
  providedIn: 'root',
})
export class DictionariesService {

  constructor(private http: HttpClient) {}

  public getDictionary(dictionary: Dictionaries, params?: any): Observable<DictionaryType[]> {
    const url = `${api.apiURL}/dictionaries/${dictionary}`;
    return this.http.get<DictionaryType[]>(url, {
      ...api.headers,
      params,
    });
  }

  // public getDictionary(dictionary: Dictionaries, params?: any): void {
  //   const url = `${api.apiURL}/dictionaries/${dictionary}`;
  //   this.http.get<DictionaryType[]>(url, {
  //     ...api.headers,
  //     params,
  //   }).pipe(
  //     tap(console.log),
  //     map((response) => new GetDictionarySuccess(dictionary, response)),
  //     catchError((error) => of(new GetDictionaryFail(dictionary, error)))
  //   ).subscribe();
  // }

}
