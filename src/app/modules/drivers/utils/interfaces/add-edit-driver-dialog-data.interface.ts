import { AddEditMode } from 'src/app/shared/utils/enums/add-edit-mode.enum';
import { Driver } from './driver.interface';

export interface AddEditDriverDialogData {
  driver?: Driver;
  mode: AddEditMode;
}
