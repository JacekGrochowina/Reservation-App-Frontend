import { InitialLoadingHandler } from 'src/app/shared/utils/models/initial-loading-handler.model';
import { CarsActions, CarsActionTypes } from './cars.actions';
import { carsInitialState, CarsState } from './cars.state';
import { LoadingHandler } from '../../shared/utils/models/loading-handler.model';
import { SuccessLoadingHandler } from '../../shared/utils/models/success-loading-handler.model';

export function CarsReducers(
  state = carsInitialState,
  action: CarsActions,
): CarsState {
  switch (action.type) {

    // ========== Get Cars
    case CarsActionTypes.getList: {
      return {
        ...state,
        list: {
          ...state.list,
          ...LoadingHandler,
        },
      };
    }

    case CarsActionTypes.getListSuccess: {
      return {
        ...state,
        list: {
          items: action.payload,
          ...SuccessLoadingHandler,
        },
      };
    }

    case CarsActionTypes.getListFail: {
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
          error: action.payload.error,
        },
      };
    }

    case CarsActionTypes.getListClear: {
      return {
        ...state,
        list: {
          items: [],
          ...InitialLoadingHandler
        },
      };
    }

    case CarsActionTypes.getListClearError: {
      return {
        ...state,
        list: {
          ...state.list,
          error: null,
        },
      };
    }

    // ========== Get Details Car
    case CarsActionTypes.getDetails: {
      return {
        ...state,
        details: {
          ...state.details,
          ...LoadingHandler,
        },
      };
    }

    case CarsActionTypes.getDetailsSuccess: {
      return {
        ...state,
        details: {
          item: action.payload,
          ...SuccessLoadingHandler,
        },
      };
    }

    case CarsActionTypes.getDetailsFail: {
      return {
        ...state,
        details: {
          ...state.details,
          loading: false,
          error: action.payload.error,
        },
      };
    }

    case CarsActionTypes.getDetailsClear: {
      return {
        ...state,
        details: {
          item: null,
          ...InitialLoadingHandler
        },
      };
    }

    case CarsActionTypes.getDetailsClearError: {
      return {
        ...state,
        details: {
          ...state.details,
          error: null,
        },
      };
    }

    // ========== Add Car
    case CarsActionTypes.add: {
      return {
        ...state,
        add: LoadingHandler,
      };
    }

    case CarsActionTypes.addSuccess: {
      return {
        ...state,
        add: SuccessLoadingHandler,
      };
    }

    case CarsActionTypes.addFail: {
      return {
        ...state,
        add: {
          ...state.add,
          loading: false,
          error: action.payload.error,
        },
      };
    }

    case CarsActionTypes.addClear: {
      return {
        ...state,
        add: InitialLoadingHandler,
      };
    }

    case CarsActionTypes.addClearError: {
      return {
        ...state,
        add: {
          ...state.add,
          error: null,
        },
      };
    }

    // ========== Del Car
    case CarsActionTypes.del: {
      return {
        ...state,
        del: LoadingHandler,
      };
    }

    case CarsActionTypes.delSuccess: {
      return {
        ...state,
        del: SuccessLoadingHandler,
      };
    }

    case CarsActionTypes.delFail: {
      return {
        ...state,
        del: {
          ...state.del,
          loading: false,
          error: action.payload.error,
        },
      };
    }

    case CarsActionTypes.delClear: {
      return {
        ...state,
        del: InitialLoadingHandler,
      };
    }

    case CarsActionTypes.delClearError: {
      return {
        ...state,
        del: {
          ...state.del,
          error: null,
        },
      };
    }

    // ========== Update Car
    case CarsActionTypes.update: {
      return {
        ...state,
        update: LoadingHandler,
      };
    }

    case CarsActionTypes.updateSuccess: {
      return {
        ...state,
        update: SuccessLoadingHandler,
      };
    }

    case CarsActionTypes.updateFail: {
      return {
        ...state,
        update: {
          ...state.add,
          loading: false,
          error: action.payload.error,
        },
      };
    }

    case CarsActionTypes.updateClear: {
      return {
        ...state,
        update: InitialLoadingHandler,
      };
    }

    case CarsActionTypes.updateClearError: {
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
