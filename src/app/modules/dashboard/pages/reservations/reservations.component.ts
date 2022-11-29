import { Component, OnInit } from '@angular/core';
import { ItemsFacade } from '../../../../store/items/items.facade';
import { DictionariesFacade } from '../../../../store/dictionaries/dictionaries.facade';
import { Dictionaries } from '../../../../store/dictionaries/dictionaries.state';

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

  constructor(
    private itemsFacade: ItemsFacade,
    private dictionariesFacade: DictionariesFacade,
  ) {}

  public ngOnInit(): void {
    this.itemsFacade.getItemsList();

    this.dictionariesFacade.getDictionary(Dictionaries.items, { group: 1 });
    this.dictionariesFacade.getDictionary(Dictionaries.groups);
  }

}
