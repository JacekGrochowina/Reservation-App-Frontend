import { Item } from '../item.interface';
import { GroupResponse } from '../../../groups/interfaces/responses/group.response';

export interface ItemExtendsResponse extends Item {
  group: GroupResponse;
}
