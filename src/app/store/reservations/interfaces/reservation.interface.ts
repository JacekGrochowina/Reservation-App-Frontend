export interface Reservation {
  id: number;
  dateStart: string;
  dateFinish: string;
  clientName: string | null;
  clientSurname: string | null;
  clientPhone: string | null;
  clientEmail: string | null;
  isAdvance: true;
  advanceTotal: number | null;
  advancePaid: number | null;
  isDiscount: false;
  discount: number | null;
  priceTotal: number;
  paidAmount: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
  groupId: number;
  itemId: number;
}
