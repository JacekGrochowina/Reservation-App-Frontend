import { InitialLoadingHandler } from '../../../shared/utils/models/initial-loading-handler.model';
import { Dictionary } from '../interfaces/common/dictionary.interface';
import { DictionaryType } from '../dictionaries.state';

export const initialDefaultDictionary: Dictionary<DictionaryType> = {
  items: [],
  ...InitialLoadingHandler,
}
