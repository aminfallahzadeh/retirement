// IMPORTS
import momentj from "moment-jalaali";
import { NumberHelper } from "./NumberHelper";

export class DateHelper {
  date: string;
  constructor(date: string) {
    this.date = date;
  }

  toPersianDate(): momentj.Moment | null {
    return this.date ? momentj(this.date) : null;
  }

  toPersianDateFormatted(): string {
    if (this.date) {
      const formattedDate = momentj(this.date).format("jYYYY/jMM/jDD");
      const numberHelper = new NumberHelper(formattedDate);
      return numberHelper.toPersian();
    }
    return "-";
  }
}
