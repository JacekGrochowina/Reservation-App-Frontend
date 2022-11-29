import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { DictionariesService } from './dictionaries.service';
import {
  DictionariesActionTypes,
  GetDictionary,
  GetDictionaryFail,
  GetDictionarySuccess
} from './dictionaries.actions';

@Injectable()
export class DictionariesEffects {

  constructor(
    private actions$: Actions,
    private dictionariesService: DictionariesService,
  ) {}

  getDictionary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DictionariesActionTypes.get),
      mergeMap((action: GetDictionary) =>
        this.dictionariesService.getDictionary(action.payload, action?.params).pipe(
          map((response) => new GetDictionarySuccess(action.payload, response)),
          catchError((error) => of(new GetDictionaryFail(action.payload, error))),
        )
      )
    )
  );

}
