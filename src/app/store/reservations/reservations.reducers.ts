import { InitialLoadingHandler } from 'src/app/shared/utils/models/initial-loading-handler.model';
import { ReservationsActions, ReservationsActionTypes } from './reservations.actions';
import { reservationsInitialState, ReservationsState } from './reservations.state';
import { LoadingHandler } from '../../shared/utils/models/loading-handler.model';
import { SuccessLoadingHandler } from '../../shared/utils/models/success-loading-handler.model';

export function ReservationsReducers(
  state = reservationsInitialState,
  action: ReservationsActions,
): ReservationsState {
  switch (action.type) {

    // ========== Get Reservations
    case ReservationsActionTypes.getList: {
      return {
        ...state,
        list: {
          ...state.list,
          ...LoadingHandler,
        },
      };
    }

    case ReservationsActionTypes.getListSuccess: {
      return {
        ...state,
        list: {
          items: action.payload,
          ...SuccessLoadingHandler,
        },
      };
    }

    case ReservationsActionTypes.getListFail: {
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
          error: action.payload.error,
        },
      };
    }

    case ReservationsActionTypes.getListClear: {
      return {
        ...state,
        list: {
          items: [],
          ...InitialLoadingHandler
        },
      };
    }

    case ReservationsActionTypes.getListClearError: {
      return {
        ...state,
        list: {
          ...state.list,
          error: null,
        },
      };
    }

    // ========== Get Details Reservation
    case ReservationsActionTypes.getDetails: {
      return {
        ...state,
        details: {
          ...state.details,
          ...LoadingHandler,
        },
      };
    }

    case ReservationsActionTypes.getDetailsSuccess: {
      return {
        ...state,
        details: {
          item: action.payload,
          ...SuccessLoadingHandler,
        },
      };
    }

    case ReservationsActionTypes.getDetailsFail: {
      return {
        ...state,
        details: {
          ...state.details,
          loading: false,
          error: action.payload.error,
        },
      };
    }

    case ReservationsActionTypes.getDetailsClear: {
      return {
        ...state,
        details: {
          item: null,
          ...InitialLoadingHandler
        },
      };
    }

    case ReservationsActionTypes.getDetailsClearError: {
      return {
        ...state,
        details: {
          ...state.details,
          error: null,
        },
      };
    }

    // ========== Add Reservation
    case ReservationsActionTypes.add: {
      return {
        ...state,
        add: LoadingHandler,
      };
    }

    case ReservationsActionTypes.addSuccess: {
      return {
        ...state,
        add: SuccessLoadingHandler,
      };
    }

    case ReservationsActionTypes.addFail: {
      return {
        ...state,
        add: {
          ...state.add,
          loading: false,
          error: action.payload.error,
        },
      };
    }

    case ReservationsActionTypes.addClear: {
      return {
        ...state,
        add: InitialLoadingHandler,
      };
    }

    case ReservationsActionTypes.addClearError: {
      return {
        ...state,
        add: {
          ...state.add,
          error: null,
        },
      };
    }

    // ========== Del Reservation
    case ReservationsActionTypes.del: {
      return {
        ...state,
        del: LoadingHandler,
      };
    }

    case ReservationsActionTypes.delSuccess: {
      return {
        ...state,
        del: SuccessLoadingHandler,
      };
    }

    case ReservationsActionTypes.delFail: {
      return {
        ...state,
        del: {
          ...state.del,
          loading: false,
          error: action.payload.error,
        },
      };
    }

    case ReservationsActionTypes.delClear: {
      return {
        ...state,
        del: InitialLoadingHandler,
      };
    }

    case ReservationsActionTypes.delClearError: {
      return {
        ...state,
        del: {
          ...state.del,
          error: null,
        },
      };
    }

    // ========== Update Reservation
    case ReservationsActionTypes.update: {
      return {
        ...state,
        update: LoadingHandler,
      };
    }

    case ReservationsActionTypes.updateSuccess: {
      return {
        ...state,
        update: SuccessLoadingHandler,
      };
    }

    case ReservationsActionTypes.updateFail: {
      return {
        ...state,
        update: {
          ...state.add,
          loading: false,
          error: action.payload.error,
        },
      };
    }

    case ReservationsActionTypes.updateClear: {
      return {
        ...state,
        update: InitialLoadingHandler,
      };
    }

    case ReservationsActionTypes.updateClearError: {
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
