import { Loading } from '../../../../shared/utils/interfaces/loading.interface';

export interface Dictionary<Items> extends Loading {
  items: Items[];
}
