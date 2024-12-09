// IMPORTS
import { convertToPersianNumber } from "./numberConverter";
import momentj from "moment-jalaali";

// export class DateHelper {
//   date: string;
//   constructor(date: string) {
//     this.date = date;
//   }

//   toPersianDate(): momentj.Moment | null {
//     return this.date ? momentj(this.date) : null;
//   }

//   toPersianDateFormatted(): string {
//     if (this.date) {
//       const formattedDate = momentj(this.date).format("jYYYY/jMM/jDD");
//       const numberHelper = new NumberHelper(formattedDate);
//       return numberHelper.toPersian();
//     }
//     return "-";
//   }
// }

export const convertToPersianDate = (date: string) => {
  if (date) {
    const result = momentj(date);
    return result;
  }
  return null;
};

export const convertToPersianDateFormatted = (date: string) => {
  if (date) {
    const result = momentj(date).format("jYYYY/jMM/jDD");
    return convertToPersianNumber(result);
  }

  return "-";
};
