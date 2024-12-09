// IMPORTS
import { PERSIAN_NUMBERS } from "@/constants/const";

export class NumberHelper {
  num: string;
  separator = ",";

  constructor(num: string = "") {
    this.num = num;
  }

  // CONVERT TO PERSIAN
  toPersian(): string {
    if (this.num || this.num === "0") {
      const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
      return String(this.num).replace(
        /\d/g,
        (match) => persianDigits[parseInt(match)]
      );
    }
    return "";
  }

  // CONVERT TO ENG
  toEnglish(): string {
    let result = this.num;
    if (typeof result === "string") {
      for (let i = 0; i < 10; i++) {
        result = result.replace(PERSIAN_NUMBERS[i], String(i));
      }
    }
    return result;
  }

  // SEPARATOR
  toSeparated(): string {
    const num = parseFloat(this.toEnglish());
    if (isNaN(num)) {
      return "";
    }

    if (num === 0) {
      return "۰";
    }

    let result = "";
    const isNegative = num < 0;
    const absoluteNum = Math.abs(num);
    const [integerPart, decimalPart] = absoluteNum.toString().split(".");

    for (let i = 0; i < integerPart.length; i++) {
      const c = integerPart.substr(integerPart.length - i - 1, 1);
      if (i % 3 === 0 && i > 0) {
        result = c + this.separator + result;
      } else {
        result = c + result;
      }
    }

    result = decimalPart ? result + "." + decimalPart : result;

    this.num = result;
    result = this.toPersian();

    return isNegative ? "-" + result : result;
  }
}

export const convertToPersianNumber = (num: number | string) => {
  if (num || num === 0) {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    const result = String(num).replace(
      /\d/g,
      (match) => persianDigits[parseInt(match, 10)]
    );
    return result;
  }
  return "";
};

export const convertToEnglishNumber = (str: string) => {
  if (typeof str === "string") {
    for (let i = 0; i < 10; i++) {
      str = str.replace(PERSIAN_NUMBERS[i], i.toString());
    }
  }
  return str;
};

export const separateByThousand = (num: number | string) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
