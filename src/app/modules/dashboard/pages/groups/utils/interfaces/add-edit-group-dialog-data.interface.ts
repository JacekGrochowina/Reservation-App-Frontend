import { AddEditMode } from 'src/app/shared/utils/enums/add-edit-mode.enum';
import { Group } from '../../../../../../store/groups/interfaces/group.interface';

export interface AddEditGroupDialogData {
  group?: Group;
  mode: AddEditMode;
}
