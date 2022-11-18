import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../../../../../../../../store/items/interfaces/item.interface';
import { Group } from '../../../../../../../../store/groups/interfaces/group.interface';

@Component({
  selector: 'app-item-details-info',
  templateUrl: './item-details-info.component.html',
  styleUrls: ['./item-details-info.component.scss']
})
export class ItemDetailsInfoComponent {

  @Input() itemDetailsItems$!: Observable<Item | null>;
  @Input() groupDetailsItems$!: Observable<Group | null>;

}
