import { ReservationAddPayload } from './reservation-add.payload';

export interface ReservationUpdatePayload {
  id: number | undefined;
  body: ReservationAddPayload;
}
