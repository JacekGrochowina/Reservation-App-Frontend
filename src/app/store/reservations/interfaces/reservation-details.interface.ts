import { Loading } from 'src/app/shared/utils/interfaces/loading.interface';
import { Reservation } from './reservation.interface';

export interface ReservationGroupDetailsState extends Loading {
  item: Reservation | null;
}
