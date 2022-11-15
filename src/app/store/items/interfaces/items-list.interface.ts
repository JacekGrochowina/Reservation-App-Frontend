import { Loading } from 'src/app/shared/utils/interfaces/loading.interface';
import { Item } from './item.interface';

export interface ItemsListState extends Loading {
  items: Item[];
}
