import { GroupAddPayload } from './group-add.payload';

export interface GroupUpdatePayload {
  id: number | undefined;
  body: GroupAddPayload;
}
