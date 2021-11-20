import { InitialLoadingHandler } from 'src/app/shared/utils/models/initial-loading-handler.model';
import { DriversActions, DriversActionTypes } from './drivers.actions';
import { driversInitialState, DriversState } from './drivers.state';

export function DriversReducer(
  state = driversInitialState,
  action: DriversActions
): DriversState {
  switch (action.type) {
    // ========== Get Drivers
    case DriversActionTypes.get: {
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

    case DriversActionTypes.getSuccess: {
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

    case DriversActionTypes.getFail: {
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
          error: action.payload.error,
        },
      };
    }

    // ========== Add Driver
    case DriversActionTypes.add: {
      return {
        ...state,
        add: {
          loading: true,
          success: false,
          error: null,
        },
      };
    }

    case DriversActionTypes.addSuccess: {
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

    case DriversActionTypes.addFail: {
      return {
        ...state,
        add: {
          ...state.add,
          loading: false,
          error: action.payload.error,
        },
      };
    }

    case DriversActionTypes.addClear: {
      return {
        ...state,
        add: InitialLoadingHandler,
      };
    }

    // ========== Del Driver
    case DriversActionTypes.del: {
      return {
        ...state,
        del: {
          loading: true,
          success: false,
          error: null,
        },
      };
    }

    case DriversActionTypes.delSuccess: {
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

    case DriversActionTypes.delFail: {
      return {
        ...state,
        del: {
          ...state.add,
          loading: false,
          error: action.payload.error,
        },
      };
    }

    case DriversActionTypes.delClear: {
      return {
        ...state,
        del: InitialLoadingHandler,
      };
    }

    // ========== Update Driver
    case DriversActionTypes.update: {
      return {
        ...state,
        update: {
          loading: true,
          success: false,
          error: null,
        },
      };
    }

    case DriversActionTypes.updateSuccess: {
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

    case DriversActionTypes.updateFail: {
      return {
        ...state,
        update: {
          ...state.add,
          loading: false,
          error: action.payload.error,
        },
      };
    }

    case DriversActionTypes.updateClear: {
      return {
        ...state,
        update: InitialLoadingHandler,
      };
    }

    default:
      return {
        ...state,
      };
  }
}
