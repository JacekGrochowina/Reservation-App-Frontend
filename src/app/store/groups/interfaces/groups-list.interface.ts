import { Loading } from 'src/app/shared/utils/interfaces/loading.interface';
import { Group } from './group.interface';

export interface GroupsListState extends Loading {
  items: Group[];
}
