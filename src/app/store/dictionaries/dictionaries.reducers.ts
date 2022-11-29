import { InitialLoadingHandler } from 'src/app/shared/utils/models/initial-loading-handler.model';
import { DictionariesActions, DictionariesActionTypes } from './dictionaries.actions';
import { dictionariesInitialState, DictionariesState } from './dictionaries.state';
import { LoadingHandler } from '../../shared/utils/models/loading-handler.model';
import { SuccessLoadingHandler } from '../../shared/utils/models/success-loading-handler.model';

export function DictionariesReducers(
  state = dictionariesInitialState,
  action: DictionariesActions,
): DictionariesState {
  switch (action.type) {

    case DictionariesActionTypes.get: {
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          ...LoadingHandler,
        }
      };
    }

    case DictionariesActionTypes.getSuccess: {
      console.log('test...');
      return {
        ...state,
        [action.payload]: {
          items: action.items,
          ...SuccessLoadingHandler,
        }
      };
    }

    case DictionariesActionTypes.getFail: {
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          loading: false,
          error: action.error.error,
        },
      };
    }

    case DictionariesActionTypes.getClear: {
      return {
        ...state,
        [action.payload]: {
          items: [],
          ...InitialLoadingHandler
        },
      };
    }

    case DictionariesActionTypes.getClearError: {
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          error: null,
        },
      };
    }

    default:
      return {
        ...state,
      };
  }
}
