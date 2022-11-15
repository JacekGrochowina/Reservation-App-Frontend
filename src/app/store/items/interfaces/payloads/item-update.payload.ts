import { ItemAddPayload } from './item-add.payload';

export interface ItemUpdatePayload {
  id: number | undefined;
  body: ItemAddPayload;
}
