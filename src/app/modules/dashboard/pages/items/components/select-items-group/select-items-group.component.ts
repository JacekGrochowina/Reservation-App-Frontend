import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GroupsFacade } from '../../../../../../store/groups/groups.facade';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Group } from '../../../../../../store/groups/interfaces/group.interface';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { ItemsFacade } from '../../../../../../store/items/items.facade';

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
export class SelectItemsGroupComponent implements OnInit {

  // ========== Selectors List
  public groupsListItems$ = this.groupsFacade.groupsListItems$;
  public groupsListLoading$ = this.groupsFacade.groupsListLoading$;
  public groupsListSuccess$ = this.groupsFacade.groupsListSuccess$;
  public groupsListError$ = this.groupsFacade.groupsListError$;

  public groupsListItems: Group[] = [];

  public form!: FormGroup;

  private unsubscribe$ = new Subject<void>();

  get selectedGroups(): FormControl {
    return this.form.get('selectedGroups') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private groupsFacade: GroupsFacade,
    private itemsFacade: ItemsFacade,
  ) {}

  public ngOnInit(): void {
    this.groupsFacade.getGroupsList();
    this.groupsListItems$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((groupsListItems) => {
        this.groupsListItems = groupsListItems;
      });

    this.initForm();
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
