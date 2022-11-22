import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemExtendsResponse } from '../../../../../../../../store/items/interfaces/responses/item-extends.response';

@Component({
  selector: 'app-item-details-info',
  templateUrl: './item-details-info.component.html',
  styleUrls: ['./item-details-info.component.scss']
})
export class ItemDetailsInfoComponent {

  @Input() itemDetailsItems$!: Observable<ItemExtendsResponse | null>;

}
