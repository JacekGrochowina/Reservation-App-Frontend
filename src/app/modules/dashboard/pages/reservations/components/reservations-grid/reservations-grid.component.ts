import { Component, Input, OnInit } from '@angular/core';
import { DialogService, DialogSize } from '../../../../../../shared/services/dialog.service';
import { AddEditMode } from '../../../../../../shared/utils/enums/add-edit-mode.enum';
import { AddEditReservationDialogData } from '../../utils/interfaces/add-edit-reservation-dialog-data.interface';
import { Observable, Subject } from 'rxjs';
import { Item } from '../../../../../../store/items/interfaces/item.interface';
import { isEmpty } from 'lodash';
import { AddEditReservationComponent } from '../add-edit-reservation/add-edit-reservation.component';
import { getDayName } from '../../../../../../shared/utils/extensions/getDayName';
import { ReservationsFacade } from '../../../../../../store/reservations/reservations.facade';
import { map, takeUntil } from 'rxjs/operators';

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

  // ========== Selectors Reservations List
  reservationsListItems$ = this.reservationsFacade.reservationsListItems$;
  reservationsListLoading$ = this.reservationsFacade.reservationsListLoading$;
  reservationsListSuccess$ = this.reservationsFacade.reservationsListSuccess$;
  reservationsListError$ = this.reservationsFacade.reservationsListError$;

  public visibleDaysAmount: number = 14;
  public daysRange: Date[] = [];

  public isTodayDaysRange: boolean = true;
  public firstDate: Date = new Date();
  public prevRangeOffset: number = 0;
  public nextRangeOffset: number = 0;

  private unsubscribe$ = new Subject<boolean>();

  constructor(
    private reservationsFacade: ReservationsFacade,
    private dialogService: DialogService,
  ) {}

  public ngOnInit(): void {
    this.reservationsFacade.getReservationsList();
    this.setDaysRange();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

  public onClickDayCell(item: Item, day: Date): void {
    console.log(item, day);
  }

  public isReservationCellVisible(item: Item, day: Date): Observable<boolean> {
    return this.reservationsListItems$
      .pipe(
        takeUntil(this.unsubscribe$),
        map((reservationsListItems) => {
          const reservationsForCurrentItem = reservationsListItems
            .filter((reservationsItem) => reservationsItem.itemId === item.id);

          let isReservationCellVisible = false;
          let datesBetweenList: Date[][] = [];

          reservationsForCurrentItem.forEach((reservation) => {
            datesBetweenList.push(this.getDatesBetween(
              new Date(reservation.dateStart),
              new Date(reservation.dateFinish),
            ));
          });

          datesBetweenList.forEach((datesBetween) => {
            datesBetween.forEach((date) => {
              if (this.isTwoDaysSameDay(date, day)) {
                isReservationCellVisible = true;
              }
            });
          });

          return isReservationCellVisible;
        })
      )
  }

  public isReservationCellVisibleEdge(item: Item, day: Date, isStart = true): Observable<boolean> {
    return this.reservationsListItems$
      .pipe(
        takeUntil(this.unsubscribe$),
        map((reservationsListItems) => {
          const reservationsForCurrentItem = reservationsListItems
            .filter((reservationsItem) => reservationsItem.itemId === item.id);

          let isReservationCellVisibleStart = false;

          reservationsForCurrentItem.forEach((reservation) => {
            const date = isStart
              ? new Date(reservation.dateStart)
              : new Date(reservation.dateFinish);

            if (this.isTwoDaysSameDay(date, day)) {
              isReservationCellVisibleStart = true;
            }
          });

          return isReservationCellVisibleStart;
        })
      )
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
    return getDayName(date);
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

  // Returns an array of dates between the two dates
  // https://www.tutorialsandyou.com/javascript/how-to-get-all-dates-between-two-dates-in-javascript-137.html
  private getDatesBetween(startDate: Date, endDate: Date): Date[] {
    let dates: Date[] = [];

    let tempDate = new Date(startDate.getTime());
    tempDate.setDate(tempDate.getDate() + 1);

    while(tempDate < endDate){
      dates.push(new Date(tempDate));
      tempDate.setDate(tempDate.getDate() + 1);
    }

    return dates;
  }

  private isTwoDaysSameDay(firstDate: Date, secondDate: Date): boolean {
    return firstDate.getFullYear() === secondDate.getFullYear() &&
      firstDate.getMonth() === secondDate.getMonth() &&
      firstDate.getDate() === secondDate.getDate();
  }

}
