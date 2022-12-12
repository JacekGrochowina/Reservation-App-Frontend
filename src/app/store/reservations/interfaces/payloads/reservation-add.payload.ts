export interface ReservationAddPayload {
  dateStart: string;
  dateFinish: string;
  clientName: string | null;
  clientSurname: string | null;
  clientPhone: string | null;
  clientEmail: string | null;
  isAdvance: boolean;
  advanceTotal: number | null;
  advancePaid: number | null;
  isDiscount: boolean;
  discount: number | null;
  priceTotal: number;
  paidAmount: number;
  groupId: number;
  itemId: number;
}
