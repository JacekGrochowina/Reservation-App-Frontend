import { AddEditMode } from 'src/app/shared/utils/enums/add-edit-mode.enum';
import {
  ReservationExtendsResponse
} from '../../../../../../store/reservations/interfaces/responses/reservation-extends.response';

export interface AddEditReservationDialogData {
  reservation?: ReservationExtendsResponse;
  mode: AddEditMode;
}
