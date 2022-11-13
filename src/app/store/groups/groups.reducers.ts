import { InitialLoadingHandler } from 'src/app/shared/utils/models/initial-loading-handler.model';
import { GroupsActions, GroupsActionTypes } from './groups.actions';
import { groupsInitialState, GroupsState } from './groups.state';
import { LoadingHandler } from '../../shared/utils/models/loading-handler.model';
import { SuccessLoadingHandler } from '../../shared/utils/models/success-loading-handler.model';

export function GroupsReducers(
  state = groupsInitialState,
  action: GroupsActions,
): GroupsState {
  switch (action.type) {

    // ========== Get Groups
    case GroupsActionTypes.getList: {
      return {
        ...state,
        list: {
          ...state.list,
          ...LoadingHandler,
        },
      };
    }

    case GroupsActionTypes.getListSuccess: {
      return {
        ...state,
        list: {
          items: action.payload,
          ...SuccessLoadingHandler,
        },
      };
    }

    case GroupsActionTypes.getListFail: {
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
          error: action.payload.error,
        },
      };
    }

    case GroupsActionTypes.getListClear: {
      return {
        ...state,
        list: {
          items: [],
          ...InitialLoadingHandler
        },
      };
    }

    case GroupsActionTypes.getListClearError: {
      return {
        ...state,
        list: {
          ...state.list,
          error: null,
        },
      };
    }

    // ========== Get Details Group
    case GroupsActionTypes.getDetails: {
      return {
        ...state,
        details: {
          ...state.details,
          ...LoadingHandler,
        },
      };
    }

    case GroupsActionTypes.getDetailsSuccess: {
      return {
        ...state,
        details: {
          item: action.payload,
          ...SuccessLoadingHandler,
        },
      };
    }

    case GroupsActionTypes.getDetailsFail: {
      return {
        ...state,
        details: {
          ...state.details,
          loading: false,
          error: action.payload.error,
        },
      };
    }

    case GroupsActionTypes.getDetailsClear: {
      return {
        ...state,
        details: {
          item: null,
          ...InitialLoadingHandler
        },
      };
    }

    case GroupsActionTypes.getDetailsClearError: {
      return {
        ...state,
        details: {
          ...state.details,
          error: null,
        },
      };
    }

    // ========== Add Group
    case GroupsActionTypes.add: {
      return {
        ...state,
        add: LoadingHandler,
      };
    }

    case GroupsActionTypes.addSuccess: {
      return {
        ...state,
        add: SuccessLoadingHandler,
      };
    }

    case GroupsActionTypes.addFail: {
      return {
        ...state,
        add: {
          ...state.add,
          loading: false,
          error: action.payload.error,
        },
      };
    }

    case GroupsActionTypes.addClear: {
      return {
        ...state,
        add: InitialLoadingHandler,
      };
    }

    case GroupsActionTypes.addClearError: {
      return {
        ...state,
        add: {
          ...state.add,
          error: null,
        },
      };
    }

    // ========== Del Group
    case GroupsActionTypes.del: {
      return {
        ...state,
        del: LoadingHandler,
      };
    }

    case GroupsActionTypes.delSuccess: {
      return {
        ...state,
        del: SuccessLoadingHandler,
      };
    }

    case GroupsActionTypes.delFail: {
      return {
        ...state,
        del: {
          ...state.del,
          loading: false,
          error: action.payload.error,
        },
      };
    }

    case GroupsActionTypes.delClear: {
      return {
        ...state,
        del: InitialLoadingHandler,
      };
    }

    case GroupsActionTypes.delClearError: {
      return {
        ...state,
        del: {
          ...state.del,
          error: null,
        },
      };
    }

    // ========== Update Group
    case GroupsActionTypes.update: {
      return {
        ...state,
        update: LoadingHandler,
      };
    }

    case GroupsActionTypes.updateSuccess: {
      return {
        ...state,
        update: SuccessLoadingHandler,
      };
    }

    case GroupsActionTypes.updateFail: {
      return {
        ...state,
        update: {
          ...state.add,
          loading: false,
          error: action.payload.error,
        },
      };
    }

    case GroupsActionTypes.updateClear: {
      return {
        ...state,
        update: InitialLoadingHandler,
      };
    }

    case GroupsActionTypes.updateClearError: {
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
