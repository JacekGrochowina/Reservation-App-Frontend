import { Loading } from 'src/app/shared/utils/interfaces/loading.interface';
import { Item } from './item.interface';

export interface ItemDetailsState extends Loading {
  item: Item | null;
}
