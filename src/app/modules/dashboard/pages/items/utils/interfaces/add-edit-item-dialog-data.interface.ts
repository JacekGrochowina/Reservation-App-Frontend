import { AddEditMode } from 'src/app/shared/utils/enums/add-edit-mode.enum';
import { Item } from '../../../../../../store/items/interfaces/item.interface';

export interface AddEditItemDialogData {
  item?: Item;
  mode: AddEditMode;
}
