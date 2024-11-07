// IMPORTS
import { createFields } from "@/helpers/FieldHelper";

// GRID FIELDS
export const REQUEST_ROW_NUM = createFields("requestRowNum", "ردیف");
export const REQUEST_NUMBER = createFields("requestNO", "شماره درخواست");
export const REQUEST_TYPE_NAME = createFields(
  "requestTypeNameFa",
  "نوع درخواست"
);
export const REQUEST_PERSON_NAME = createFields("personName", "درخواست کننده");
export const REQUEST_DATE = createFields("date", "تاریخ درخواست");
export const REQUEST_SENDER_INFO = createFields("senderInfo", "بررسی درخواست");
export const REQUEST_ACTION_OBSERVE = createFields("observe", "مشاهده درخواست");

// APP ROUTES
export const APP_LAYOUT = "AppLayout";
export const CARTABLE = "Cartable";
export const LOGIN = "Login";
export const ERROR = "Error";

// ARRAYS
export const PERSIAN_NUMBERS = [
  /۰/g,
  /۱/g,
  /۲/g,
  /۳/g,
  /۴/g,
  /۵/g,
  /۶/g,
  /۷/g,
  /۸/g,
  /۹/g,
];
