import { Injectable } from "@angular/core";
import { NativeDateAdapter } from "@angular/material/core";

@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {

  getFirstDayOfWeek() {
    return 1;
  }

  deserialize(value: any): Date | null {
    if ((typeof value === 'string') && (value.indexOf('-') > -1)) {
      const str = value.split('-');
      const dayArray = str[2].split('T');
      const year = Number(str[0]);
      const month = Number(str[1]) - 1;
      const day = Number(dayArray[0]);
      return new Date(Date.UTC(year, month, day));
    }

    const timestamp = typeof value === 'number' ? value : Date.parse(value);
    return isNaN(timestamp) ? null : new Date(timestamp);
  }

  createDate(year: number, month: number, date: number): Date {
    return new Date(Date.UTC(year, month, date));
  }

  parse(value: any): Date | null {
    if ((typeof value === 'string') && (value.indexOf('-') > -1)) {
      const str = value.split('-');
      const dayArray = str[2].split('T');

      const year = Number(str[0]);
      const month = Number(str[1]) - 1;
      const day = Number(dayArray[0]);

      return new Date(year, month, day);
    }

    const timestamp = typeof value === 'number' ? value : Date.parse(value);
    return isNaN(timestamp) ? null : new Date(timestamp);
  }

}
