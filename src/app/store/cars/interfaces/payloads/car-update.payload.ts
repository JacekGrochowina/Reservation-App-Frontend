import { CarAddPayload } from './car-add.payload';

export interface CarUpdatePayload {
  id: number | undefined;
  body: CarAddPayload;
}
