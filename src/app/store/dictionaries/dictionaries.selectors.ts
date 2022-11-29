import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { Dictionaries } from './dictionaries.state';

const selectDictionaries = (state: AppState) => state.dictionaries;

export const getDictionaryItemsByName = (dictionary: Dictionaries) => createSelector(
  selectDictionaries,
  (records) => records[dictionary].items
);

export const getDictionaryLoadingByName = (dictionary: Dictionaries) => createSelector(
  selectDictionaries,
  (records) => records[dictionary].loading
);

export const getDictionarySuccessByName = (dictionary: Dictionaries) => createSelector(
  selectDictionaries,
  (records) => records[dictionary].success
);

export const getDictionaryErrorByName = (dictionary: Dictionaries) => createSelector(
  selectDictionaries,
  (records) => records[dictionary].error
);
