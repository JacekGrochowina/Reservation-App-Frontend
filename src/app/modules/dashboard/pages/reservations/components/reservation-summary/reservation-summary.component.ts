import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { getDayName } from '../../../../../../shared/utils/extensions/getDayName';

@Component({
  selector: 'app-reservation-summary',
  templateUrl: './reservation-summary.component.html',
  styleUrls: ['./reservation-summary.component.scss'],
})
export class ReservationSummaryComponent implements OnInit, OnChanges {

  @Input() dateStart!: string;
  @Input() dateEnd!: string;
  @Input() pricePerDay!: number;
  @Input() groupName!: string;
  @Input() itemName!: string;
  @Input() priceTotal!: number;
  @Input() name!: string;
  @Input() surname!: string;
  @Input() email!: string;
  @Input() phone!: string;
  @Input() isDiscount!: boolean;
  @Input() discount!: number;
  @Input() discountPercent!: number;
  @Input() isAdvance!: boolean;
  @Input() advance!: number;
  @Input() advancePercent!: number;

  public ngOnInit(): void {
    // console.log('dateStart', this.dateStart);
    // console.log('dateEnd', this.dateEnd);
    // console.log('pricePerDay', this.pricePerDay);
    // console.log('groupName', this.groupName);
    // console.log('itemName', this.itemName);
    // console.log('priceTotal', this.priceTotal);
    // console.log('name', this.name);
    // console.log('surname', this.surname);
    // console.log('email', this.email);
    // console.log('phone', this.phone);
    // console.log('isDiscount', this.isDiscount);
    // console.log('discount', this.discount);
    // console.log('discountPercent', this.discountPercent);
    // console.log('isAdvance', this.isAdvance);
    // console.log('advance', this.advance);
    // console.log('advancePercent', this.advancePercent);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes?.dateStart) { this.dateStart = changes?.dateStart.currentValue; }
    if (changes?.dateEnd) { this.dateEnd = changes?.dateEnd.currentValue; }
    if (changes?.pricePerDay) { this.pricePerDay = changes?.pricePerDay.currentValue; }
    if (changes?.groupName) { this.groupName = changes?.groupName.currentValue; }
    if (changes?.itemName) { this.itemName = changes?.itemName.currentValue; }
    if (changes?.priceTotal) { this.priceTotal = changes?.priceTotal.currentValue; }
    if (changes?.name) { this.name = changes?.name.currentValue; }
    if (changes?.surname) { this.surname = changes?.surname.currentValue; }
    if (changes?.email) { this.email = changes?.email.currentValue; }
    if (changes?.phone) { this.phone = changes?.phone.currentValue; }
    if (changes?.isDiscount) { this.isDiscount = changes?.isDiscount.currentValue; }
    if (changes?.discount) { this.discount = changes?.discount.currentValue; }
    if (changes?.discountPercent) { this.discountPercent = changes?.discountPercent.currentValue; }
    if (changes?.isAdvance) { this.isAdvance = changes?.isAdvance.currentValue; }
    if (changes?.advance) { this.advance = changes?.advance.currentValue; }
    if (changes?.advancePercent) { this.advancePercent = changes?.advancePercent.currentValue; }
  }

  public getPercentDisplayValue(percentValue: number): string {
    return `${(percentValue).toFixed(2)}%`;
  }

  public getPriceTotalWithDiscount(): string {
    return (this.priceTotal - this.discount).toFixed(2);
  }

  public getPersonalDataDisplayValue(): string {
    const name = this.name.trim();
    const surname = this.surname.trim();

    if (!name && !surname) return 'Brak danych';
    return `${name} ${surname}`;
  }

  public getOptionalSummaryDisplayValue(value: string): string {
    return value.trim() === ''
      ? 'Brak danych'
      : value;
  }

  public getDayName(date: string): string | null {
    if (!date) { return null; }
    return getDayName(new Date(date));
  }

  public getDateRange(): number {
    return !isNaN(this.calcDateRangeDiff()) ? this.calcDateRangeDiff() : 0;
  }

  private calcDateRangeDiff(): number {
    return this.dateDiff(
      this.dateStart,
      this.dateEnd,
    );
  }

  private dateDiff(startDate: string, finishDate: string): number {
    return Math.floor((Date.parse(finishDate) - Date.parse(startDate)) / 86400000);
  }

}
