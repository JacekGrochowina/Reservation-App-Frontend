import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../../../../../../../../store/items/interfaces/item.interface';

@Component({
  selector: 'app-item-details-title',
  templateUrl: './item-details-title.component.html',
  styleUrls: ['./item-details-title.component.scss']
})
export class ItemDetailsTitleComponent {

  @Input() itemDetailsItems$!: Observable<Item | null>;

}
