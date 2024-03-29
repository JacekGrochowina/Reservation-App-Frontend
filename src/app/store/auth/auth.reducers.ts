import { authInitialState, AuthState } from './auth.state';
import { AuthActions, AuthActionTypes } from './auth.actions';
import { LoadingHandler } from '../../shared/utils/models/loading-handler.model';
import { SuccessLoadingHandler } from '../../shared/utils/models/success-loading-handler.model';
import { InitialLoadingHandler } from '../../shared/utils/models/initial-loading-handler.model';

export function AuthReducers(
  state = authInitialState,
  action: AuthActions,
): AuthState {
  switch (action.type) {

    // ========== Login
    case AuthActionTypes.login: {
      return {
        ...state,
        login: LoadingHandler,
      };
    }

    case AuthActionTypes.loginSuccess: {
      return {
        ...state,
        login: SuccessLoadingHandler,
      };
    }

    case AuthActionTypes.loginFail: {
      return {
        ...state,
        login: {
          ...state.login,
          loading: false,
          error: action.payload.error,
        },
      };
    }

    case AuthActionTypes.loginClear: {
      return {
        ...state,
        login: InitialLoadingHandler,
      };
    }

    case AuthActionTypes.loginClearError: {
      return {
        ...state,
        login: {
          ...state.login,
          error: null,
        },
      };
    }

    // ========== Logout
    case AuthActionTypes.logout: {
      return {
        ...state,
        isLogged: false,
        jwt: {
          ...state.jwt,
          token: null,
        },
      };
    }

    // ========== Register
    case AuthActionTypes.register: {
      return {
        ...state,
        register: LoadingHandler,
      };
    }

    case AuthActionTypes.registerSuccess: {
      return {
        ...state,
        register: SuccessLoadingHandler,
      };
    }

    case AuthActionTypes.registerFail: {
      return {
        ...state,
        register: {
          ...state.login,
          loading: false,
          error: action.payload.error,
        },
      };
    }

    case AuthActionTypes.registerClear: {
      return {
        ...state,
        register: InitialLoadingHandler,
      };
    }

    case AuthActionTypes.registerClearError: {
      return {
        ...state,
        register: {
          ...state.register,
          error: null,
        },
      };
    }

    // ========== Set Jwt Token
    case AuthActionTypes.setJwtToken: {
      return {
        ...state,
        isLogged: true,
        jwt: {
          ...state.jwt,
          token: action.payload.jwt,
        },
      };
    }

    // ========== Get Current User
    case AuthActionTypes.getCurrentUser: {
      return {
        ...state,
        user: {
          ...state.user,
          ...LoadingHandler,
        },
      };
    }

    case AuthActionTypes.getCurrentUserSuccess: {
      return {
        ...state,
        user: {
          name: action.payload.name,
          surname: action.payload.surname,
          email: action.payload.email,
          ...SuccessLoadingHandler,
        },
      };
    }

    case AuthActionTypes.getCurrentUserFail: {
      return {
        ...state,
        user: {
          ...state.user,
          loading: false,
          error: action.payload.error,
        },
      };
    }

    case AuthActionTypes.getCurrentUserClear: {
      return {
        ...state,
        user: {
          name: null,
          surname: null,
          email: null,
          ...InitialLoadingHandler,
        },
      };
    }

    case AuthActionTypes.getCurrentUserClearError: {
      return {
        ...state,
        user: {
          ...state.user,
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
