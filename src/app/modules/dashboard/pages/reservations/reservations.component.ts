import { Component, OnInit } from '@angular/core';
import { ItemsFacade } from '../../../../store/items/items.facade';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss'],
})
export class ReservationsComponent implements OnInit {

  // ========== Selectors List
  public itemsListItems$ = this.itemsFacade.itemsListItems$;
  public itemsListLoading$ = this.itemsFacade.itemsListLoading$;
  public itemsListSuccess$ = this.itemsFacade.itemsListSuccess$;
  public itemsListError$ = this.itemsFacade.itemsListError$;

  constructor(private itemsFacade: ItemsFacade) {}

  public ngOnInit(): void {
    this.itemsFacade.getItemsList();
  }

}
