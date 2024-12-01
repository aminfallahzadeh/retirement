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

// FORMS
export const INPUT_TYPES = {
  TEXT: "text",
};

// BUTTONS
export const YES = "بله";
export const NO = "خیر";
export const SCAN = "اسکن";
export const SAVE = "ذخیره";
export const UPLOAD = "بارگذاری";

// RETIRED
export const RETIRED_INFO = "اطلاعات بازنشسته";
export const RETIRED_PERSON_INFO = "اطلاعات فردی";
export const RETIRES_PENSIONARY_INFO = "اطلاعات پرسنلی";
export const RETIRED_ADDITIONAL_INFO = "اطلاعات تکمیلی";

// ARCHIVE
export const FOLDER_NAME = "نام پوشه";
export const ELECTRONIC_CASE = "پرونده الکترونیک";
export const EDIT_FOLDER_NAME = "ویرایش نام پوشه";
export const CREATE_NEW_FOLDER = "ایجاد پوشه جدید";
export const DELETE_FOLDER = "حذف پوشه";
export const ADD_NEW_IMAGE = "افزودن برگه جدید";
export const DELETE_IMAGE = "حذف برگه";
export const OBSERVE_FILE = "مشاهده برگه";
export const PARENT_FOLDER_ID = "97134493291b473f9b3bf8c4c15b27a0";

// GENERAL
export const NAVIGATE_BACK = "بازگشت";
export const RELATEDS = "وابستگان";
export const HEIRS = "موظفین";
export const STATEMENTS = "احکام";
export const PAYSLIP = "فیش حقوقی";
export const REQUESTS = "درخواست ها";
export const PREVIEW = "پیش نمایش";
