import { User } from './interfaces/user.interface';
import { JwtState } from './interfaces/jwt.interface';
import { InitialLoadingHandler } from '../../shared/utils/models/initial-loading-handler.model';
import { Loading } from '../../shared/utils/interfaces/loading.interface';

export interface AuthState {
  login: Loading;
  register: Loading;
  user: User;
  isLogged: boolean;
  jwt: JwtState;
}

export const authInitialState: AuthState = {
  login: InitialLoadingHandler,
  register: InitialLoadingHandler,
  user: {
    name: null,
    surname: null,
    email: null,
  },
  isLogged: false,
  jwt: {
    token: null,
    expirationTime: 10,
  },
};
