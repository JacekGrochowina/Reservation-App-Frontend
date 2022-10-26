import { AddEditMode } from 'src/app/shared/utils/enums/add-edit-mode.enum';
import { Car } from '../../../../../../store/cars/interfaces/car.interface';

export interface AddEditCarDialogData {
  car?: Car;
  mode: AddEditMode;
}
