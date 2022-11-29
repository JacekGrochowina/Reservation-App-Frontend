import { Component, Input, OnInit } from '@angular/core';
import { DialogService, DialogSize } from '../../../../../../shared/services/dialog.service';
import { AddEditMode } from '../../../../../../shared/utils/enums/add-edit-mode.enum';
import { AddEditReservationDialogData } from '../../utils/interfaces/add-edit-reservation-dialog-data.interface';
import { Observable } from 'rxjs';
import { Item } from '../../../../../../store/items/interfaces/item.interface';
import { isEmpty } from 'lodash';
import { AddEditReservationComponent } from '../add-edit-reservation/add-edit-reservation.component';

@Component({
  selector: 'app-reservations-grid',
  templateUrl: './reservations-grid.component.html',
  styleUrls: ['./reservations-grid.component.scss'],
})
export class ReservationsGridComponent implements OnInit {

  @Input() itemsListItems$!: Observable<Item[]>;
  @Input() itemsListLoading$!: Observable<boolean>;
  @Input() itemsListSuccess$!: Observable<boolean>;
  @Input() itemsListError$!: Observable<any>;

  public visibleDaysAmount: number = 14;
  public daysRange: Date[] = [];

  public isTodayDaysRange: boolean = true;
  public firstDate: Date = new Date();
  public prevRangeOffset: number = 0;
  public nextRangeOffset: number = 0;

  private dayNames: string[] = [
    'Ndz.',
    'Pon.',
    'Wt.',
    'Śr.',
    'Czw.',
    'Pt.',
    'Sob.',
  ];

  constructor(private dialogService: DialogService) {}

  public ngOnInit(): void {
    this.setDaysRange();
  }

  public openAddGroupDialog(): void {
    this.dialogService.open(AddEditReservationComponent, DialogSize.md, {
      data: {
        mode: AddEditMode.add,
      } as AddEditReservationDialogData,
    });
  }

  public todayRange(): void {
    this.firstDate = new Date();
    this.isTodayDaysRange = true;
    this.setDaysRange();
  }

  public prevRange(): void {
    this.firstDate.setDate(this.firstDate.getDate() - this.visibleDaysAmount);

    this.setIsTodayDaysRange();
    this.setDaysRange();
  }

  public nextRange(): void {
    this.firstDate.setDate(this.firstDate.getDate() + this.visibleDaysAmount);

    this.setIsTodayDaysRange();
    this.setDaysRange();
  }

  private getDayName(date: Date): string {
    return this.dayNames[date.getDay()];
  }

  private setDaysRange(): void {
    if (!isEmpty(this.daysRange)) { this.daysRange = [] };

    for (let i = 0; i < this.visibleDaysAmount; i++) {
      const date = new Date(this.firstDate.valueOf());

      date.setDate(date.getDate() + i);
      this.daysRange.push(date);
    }
  }

  private setIsTodayDaysRange(): void {
    const today = new Date();
    this.firstDate.getFullYear() === today.getFullYear() &&
    this.firstDate.getMonth() === today.getMonth() &&
    this.firstDate.getDate() === today.getDate()
      ? this.isTodayDaysRange = true
      : this.isTodayDaysRange = false;
  }

}
