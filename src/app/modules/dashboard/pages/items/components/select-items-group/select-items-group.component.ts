import { Component, OnDestroy, OnInit } from '@angular/core';
import { GroupsFacade } from '../../../../../../store/groups/groups.facade';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { ItemsFacade } from '../../../../../../store/items/items.facade';
import { DictionariesFacade } from '../../../../../../store/dictionaries/dictionaries.facade';
import { Dictionaries } from '../../../../../../store/dictionaries/dictionaries.state';

// https://stackblitz.com/edit/angular-material-with-angular-v5-jsgvx6?file=app%2Fapp.component.ts,app%2Fapp.component.html
// https://stackoverflow.com/questions/51580095/select-all-mat-option-and-deselect-all

// https://stackblitz.com/edit/angular-select-all-option?file=src%2Fmain.ts
// https://stackblitz.com/edit/select-all-option-angular-material?file=src%2Fapp%2Fapp.component.html
// https://stackblitz.com/edit/angular-material-select-all?file=src%2Fapp%2Fselect-check-all.component.ts

@Component({
  selector: 'app-select-items-group',
  templateUrl: './select-items-group.component.html',
  styleUrls: ['./select-items-group.component.scss']
})
export class SelectItemsGroupComponent implements OnInit, OnDestroy {

  public dictionaryGroupsItems$ = this.dictionariesFacade.dictionaryGroupsItems$;
  public form!: FormGroup;

  private unsubscribe$ = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private groupsFacade: GroupsFacade,
    private itemsFacade: ItemsFacade,
    private dictionariesFacade: DictionariesFacade,
  ) {}

  public ngOnInit(): void {
    this.dictionariesFacade.getDictionary(Dictionaries.groups);

    this.initForm();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();

    this.dictionariesFacade.clearDictionary(Dictionaries.groups);
  }

  private initForm(): void {
    this.form = this.fb.group({
      selectedGroups: [''],
    });
  }

  public optionChanged(event: MatSelectChange): void {
    this.itemsFacade.getItemsList({
      groups: event.value,
    });
  }
}
