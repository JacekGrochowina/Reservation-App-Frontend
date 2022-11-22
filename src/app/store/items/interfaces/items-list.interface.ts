import { Loading } from 'src/app/shared/utils/interfaces/loading.interface';
import { ItemExtendsResponse } from './responses/item-extends.response';

export interface ItemsListState extends Loading {
  items: ItemExtendsResponse[];
}
