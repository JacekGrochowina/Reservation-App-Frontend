import { Loading } from '../../../shared/utils/interfaces/loading.interface';

export interface User extends Loading {
  name: string | null;
  surname: string | null;
  email: string | null;
}
