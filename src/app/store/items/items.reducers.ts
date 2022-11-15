import { InitialLoadingHandler } from 'src/app/shared/utils/models/initial-loading-handler.model';
import { ItemsActions, ItemsActionTypes } from './items.actions';
import { groupsInitialState, ItemsState } from './items.state';
import { LoadingHandler } from '../../shared/utils/models/loading-handler.model';
import { SuccessLoadingHandler } from '../../shared/utils/models/success-loading-handler.model';

export function ItemsReducers(
  state = groupsInitialState,
  action: ItemsActions,
): ItemsState {
  switch (action.type) {

    // ========== Get Groups
    case ItemsActionTypes.getList: {
      return {
        ...state,
        list: {
          ...state.list,
          ...LoadingHandler,
        },
      };
    }

    case ItemsActionTypes.getListSuccess: {
      return {
        ...state,
        list: {
          items: action.payload,
          ...SuccessLoadingHandler,
        },
      };
    }

    case ItemsActionTypes.getListFail: {
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
          error: action.payload.error,
        },
      };
    }

    case ItemsActionTypes.getListClear: {
      return {
        ...state,
        list: {
          items: [],
          ...InitialLoadingHandler
        },
      };
    }

    case ItemsActionTypes.getListClearError: {
      return {
        ...state,
        list: {
          ...state.list,
          error: null,
        },
      };
    }

    // ========== Get Details Group
    case ItemsActionTypes.getDetails: {
      return {
        ...state,
        details: {
          ...state.details,
          ...LoadingHandler,
        },
      };
    }

    case ItemsActionTypes.getDetailsSuccess: {
      return {
        ...state,
        details: {
          item: action.payload,
          ...SuccessLoadingHandler,
        },
      };
    }

    case ItemsActionTypes.getDetailsFail: {
      return {
        ...state,
        details: {
          ...state.details,
          loading: false,
          error: action.payload.error,
        },
      };
    }

    case ItemsActionTypes.getDetailsClear: {
      return {
        ...state,
        details: {
          item: null,
          ...InitialLoadingHandler
        },
      };
    }

    case ItemsActionTypes.getDetailsClearError: {
      return {
        ...state,
        details: {
          ...state.details,
          error: null,
        },
      };
    }

    // ========== Add Group
    case ItemsActionTypes.add: {
      return {
        ...state,
        add: LoadingHandler,
      };
    }

    case ItemsActionTypes.addSuccess: {
      return {
        ...state,
        add: SuccessLoadingHandler,
      };
    }

    case ItemsActionTypes.addFail: {
      return {
        ...state,
        add: {
          ...state.add,
          loading: false,
          error: action.payload.error,
        },
      };
    }

    case ItemsActionTypes.addClear: {
      return {
        ...state,
        add: InitialLoadingHandler,
      };
    }

    case ItemsActionTypes.addClearError: {
      return {
        ...state,
        add: {
          ...state.add,
          error: null,
        },
      };
    }

    // ========== Del Group
    case ItemsActionTypes.del: {
      return {
        ...state,
        del: LoadingHandler,
      };
    }

    case ItemsActionTypes.delSuccess: {
      return {
        ...state,
        del: SuccessLoadingHandler,
      };
    }

    case ItemsActionTypes.delFail: {
      return {
        ...state,
        del: {
          ...state.del,
          loading: false,
          error: action.payload.error,
        },
      };
    }

    case ItemsActionTypes.delClear: {
      return {
        ...state,
        del: InitialLoadingHandler,
      };
    }

    case ItemsActionTypes.delClearError: {
      return {
        ...state,
        del: {
          ...state.del,
          error: null,
        },
      };
    }

    // ========== Update Group
    case ItemsActionTypes.update: {
      return {
        ...state,
        update: LoadingHandler,
      };
    }

    case ItemsActionTypes.updateSuccess: {
      return {
        ...state,
        update: SuccessLoadingHandler,
      };
    }

    case ItemsActionTypes.updateFail: {
      return {
        ...state,
        update: {
          ...state.add,
          loading: false,
          error: action.payload.error,
        },
      };
    }

    case ItemsActionTypes.updateClear: {
      return {
        ...state,
        update: InitialLoadingHandler,
      };
    }

    case ItemsActionTypes.updateClearError: {
      return {
        ...state,
        update: {
          ...state.update,
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
