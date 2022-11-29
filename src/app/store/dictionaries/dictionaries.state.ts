import { Dictionary } from './interfaces/common/dictionary.interface';
import { DefaultDictionary } from './interfaces/common/default-dictionary.interface';
import { initialDefaultDictionary } from './models/initial-default-dictionary.model';

export type DictionaryType =
  DefaultDictionary;

export enum Dictionaries {
  groups = 'groups',
  items = 'items',
}

export interface DictionariesState {
  groups: Dictionary<DefaultDictionary>;
  items: Dictionary<DefaultDictionary>;
}

export const dictionariesInitialState: DictionariesState = {
  groups: initialDefaultDictionary,
  items: initialDefaultDictionary,
};
