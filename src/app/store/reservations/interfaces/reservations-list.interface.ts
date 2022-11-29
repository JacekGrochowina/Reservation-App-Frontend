import { Loading } from 'src/app/shared/utils/interfaces/loading.interface';
import { ReservationExtendsResponse } from './responses/reservation-extends.response';

export interface ReservationsListState extends Loading {
  items: ReservationExtendsResponse[];
}
