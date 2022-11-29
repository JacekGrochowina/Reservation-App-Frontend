import { Reservation } from '../reservation.interface';
import { ItemResponse } from '../../../items/interfaces/responses/item.response';
import { GroupResponse } from '../../../groups/interfaces/responses/group.response';

export interface ReservationExtendsResponse extends Reservation {
  item: ItemResponse;
  group: GroupResponse;
}
