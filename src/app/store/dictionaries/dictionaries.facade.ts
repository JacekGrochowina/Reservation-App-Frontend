import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { GetDictionary, GetDictionaryClear } from './dictionaries.actions';
import { Dictionaries } from './dictionaries.state';
import {
  getDictionaryErrorByName,
  getDictionaryItemsByName,
  getDictionaryLoadingByName,
  getDictionarySuccessByName,
} from './dictionaries.selectors';

@Injectable()
export class DictionariesFacade {

  // ========== Dictionary Selectors Groups
  dictionaryGroupsItems$ = this.store.select(getDictionaryItemsByName(Dictionaries.groups));
  dictionaryGroupsLoading$ = this.store.select(getDictionaryLoadingByName(Dictionaries.groups));
  dictionaryGroupsSuccess$ = this.store.select(getDictionarySuccessByName(Dictionaries.groups));
  dictionaryGroupsError$ = this.store.select(getDictionaryErrorByName(Dictionaries.groups));

  // ========== Dictionary Selectors Items
  dictionaryItemsItems$ = this.store.select(getDictionaryItemsByName(Dictionaries.items));
  dictionaryItemsLoading$ = this.store.select(getDictionaryLoadingByName(Dictionaries.items));
  dictionaryItemsSuccess$ = this.store.select(getDictionarySuccessByName(Dictionaries.items));
  dictionaryItemsError$ = this.store.select(getDictionaryErrorByName(Dictionaries.items));

  constructor(private store: Store<AppState>) {}

  public getDictionary(dictionary: Dictionaries, params?: any): void {
    this.store.dispatch(new GetDictionary(dictionary, params));
  }

  public clearDictionary(dictionary: Dictionaries): void {
    this.store.dispatch(new GetDictionaryClear(dictionary));
  }

  public clearAllDictionary(): void {
    // this.store.dispatch(new GetListDictionaries());
  }

}
