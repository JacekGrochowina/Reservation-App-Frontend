import { InitialLoadingHandler } from 'src/app/shared/utils/models/initial-loading-handler.model';
import { CarsActions, CarsActionTypes } from './cars.actions';
import { carsInitialState, CarsState } from './cars.state';

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
          loading: true,
          success: false,
          error: null,
        },
      };
    }

    case CarsActionTypes.getListSuccess: {
      return {
        ...state,
        list: {
          items: action.payload,
          loading: false,
          success: true,
          error: null,
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
          loading: true,
          success: false,
          error: null,
        },
      };
    }

    case CarsActionTypes.getDetailsSuccess: {
      return {
        ...state,
        details: {
          item: action.payload,
          loading: false,
          success: true,
          error: null,
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
        add: {
          loading: true,
          success: false,
          error: null,
        },
      };
    }

    case CarsActionTypes.addSuccess: {
      return {
        ...state,
        list: {
          ...state.list,
          loading: true,
          success: false,
          error: null,
        },
        add: {
          loading: false,
          success: true,
          error: null,
        },
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
        del: {
          loading: true,
          success: false,
          error: null,
        },
      };
    }

    case CarsActionTypes.delSuccess: {
      return {
        ...state,
        list: {
          ...state.list,
          loading: true,
          success: false,
          error: null,
        },
        del: {
          loading: false,
          success: true,
          error: null,
        },
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
        update: {
          loading: true,
          success: false,
          error: null,
        },
      };
    }

    case CarsActionTypes.updateSuccess: {
      return {
        ...state,
        list: {
          ...state.list,
          loading: true,
          success: false,
          error: null,
        },
        update: {
          loading: false,
          success: true,
          error: null,
        },
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
