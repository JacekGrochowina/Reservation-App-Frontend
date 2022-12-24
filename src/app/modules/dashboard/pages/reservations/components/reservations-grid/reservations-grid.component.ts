import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DialogService, DialogSize } from '../../../../../../shared/services/dialog.service';
import { AddEditMode } from '../../../../../../shared/utils/enums/add-edit-mode.enum';
import { AddEditReservationDialogData } from '../../utils/interfaces/add-edit-reservation-dialog-data.interface';
import { Observable, Subject } from 'rxjs';
import { Item } from '../../../../../../store/items/interfaces/item.interface';
import { isEmpty, isNull } from 'lodash';
import { AddEditReservationComponent } from '../add-edit-reservation/add-edit-reservation.component';
import { getDayName } from '../../../../../../shared/utils/extensions/getDayName';
import { ReservationsFacade } from '../../../../../../store/reservations/reservations.facade';
import { first, map, takeUntil } from 'rxjs/operators';
import { Reservation } from '../../../../../../store/reservations/interfaces/reservation.interface';
import { ConfirmDialogComponent } from '../../../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ReservationSummaryDialogComponent } from '../reservation-summary-dialog/reservation-summary-dialog.component';
import { ReservationPaidDialogComponent } from '../reservation-paid-dialog/reservation-paid-dialog.component';
import { getDateFormat } from '../../../../../../shared/utils/extensions/dateFormatter';
import {
  ReservationListPayload
} from '../../../../../../store/reservations/interfaces/payloads/reservation-list.payload';

@Component({
  selector: 'app-reservations-grid',
  templateUrl: './reservations-grid.component.html',
  styleUrls: ['./reservations-grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
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

  // ========== Selectors Reservation Del
  reservationDelLoading$ = this.reservationsFacade.reservationDelLoading$;
  reservationDelSuccess$ = this.reservationsFacade.reservationDelSuccess$;
  reservationDelError$ = this.reservationsFacade.reservationDelError$;

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
    this.setDaysRange();

    this.reservationsFacade.getReservationsList(
      this.getReservationListPayload()
    );
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }

  public onClickDayCell(item: Item, day: Date): void {
    // console.log(item, day);
  }

  public onClickReservation(item: Item, day: Date, isStart?: boolean): void {
    // this.findReservation(item, day, isStart)
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe((reservation) => {
    //     console.log(reservation);
    //   });
  }

  private findReservation(item: Item, day: Date, isStart?: boolean): Observable<Reservation | null> {
    return this.reservationsListItems$
      .pipe(
        takeUntil(this.unsubscribe$),
        map((reservationsListItems) => {
          const reservationsForCurrentItem = reservationsListItems
            .filter((reservationsItem) => reservationsItem.itemId === item.id);

            return isStart
              ? reservationsForCurrentItem.find((reservation) =>
                this.isTwoDaysSameDay(new Date(reservation.dateStart), day)) ?? null
              : reservationsForCurrentItem.find((reservation) =>
                this.isTwoDaysSameDay(new Date(reservation.dateFinish), day)) ?? null;
        }),
      );
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

          let isReservationCellVisible = false;

          reservationsForCurrentItem.forEach((reservation) => {
            const date = isStart
              ? new Date(reservation.dateStart)
              : new Date(reservation.dateFinish);

            if (this.isTwoDaysSameDay(date, day)) {
              isReservationCellVisible = true;
            }
          });

          return isReservationCellVisible;
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

    this.reservationsFacade.getReservationsList(
      this.getReservationListPayload()
    );
  }

  public nextRange(): void {
    this.firstDate.setDate(this.firstDate.getDate() + this.visibleDaysAmount);

    this.setIsTodayDaysRange();
    this.setDaysRange();

    this.reservationsFacade.getReservationsList(
      this.getReservationListPayload()
    );
  }

  public detailsReservation(item: Item, day: Date, isStart?: boolean): void {
    this.findReservation(item, day, isStart)
      .pipe(
        first(),
        takeUntil(this.unsubscribe$),
      )
      .subscribe((reservation) => {
        if (isNull(reservation)) { return; }

        this.dialogService.open(ReservationSummaryDialogComponent, DialogSize.sm, {
          data: reservation,
        });
      });
  }

  public paidReservation(item: Item, day: Date, isStart?: boolean): void {
    this.findReservation(item, day, isStart)
      .pipe(
        first(),
        takeUntil(this.unsubscribe$),
      )
      .subscribe((reservation) => {
        if (isNull(reservation)) { return; }

        this.dialogService.open(ReservationPaidDialogComponent, DialogSize.xs, {
          data: reservation,
        });
      });
  }

  public editReservation(item: Item, day: Date, isStart?: boolean): void {
    this.findReservation(item, day, isStart)
      .pipe(
        first(),
        takeUntil(this.unsubscribe$),
      )
      .subscribe((reservation) => {
        if (isNull(reservation)) { return; }

        this.dialogService.open(AddEditReservationComponent, DialogSize.md, {
          data: {
            reservation: reservation,
            mode: AddEditMode.edit,
          } as AddEditReservationDialogData,
        });
      });
  }

  public delReservation(item: Item, day: Date, isStart?: boolean): void {
    this.findReservation(item, day, isStart)
      .pipe(
        first(),
        takeUntil(this.unsubscribe$),
      )
      .subscribe((reservation) => {
        if (isNull(reservation)) { return; }

        this.dialogService.open(ConfirmDialogComponent, DialogSize.xs, {
          data: {
            title: 'Usuwanie rezerwacji',
            message: 'Czy napewno chcesz usunąć tę rezerwację?',
            confirmLabel: 'Usuń',
            dismissLabel: 'Anuluj',
            isAsync: true,
            close$: this.reservationDelSuccess$,
            loading$: this.reservationDelLoading$,
            errors$: this.reservationDelError$,
            confirmed: () => {
              this.reservationsFacade.delReservation(reservation.id);
            },
          },
        });
      });
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
    console.log(this.daysRange);
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

  private getReservationListPayload(): ReservationListPayload {
    const from = this.daysRange[0];
    const to = this.daysRange[this.daysRange.length - 1];

    return {
      from: getDateFormat(from),
      to: getDateFormat(to),
    }
  }

}
