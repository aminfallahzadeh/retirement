// IMPORTS
import { REQUIRED_MESSAGE, NOT_VALID_MESSAGE } from "./messages";
import { nationalCodeChecker } from "@/utils/nationalCodeChecker";
import {
  ONLY_NUMBERS_REGEX,
  PERSIAN_LETTERS_VALIDATION_REGEX,
  EMAIL_REGEX,
} from "./regex";

// NATIONAL CODE RULES
export const nationalCodeRules = {
  validate: (value: string) => {
    return nationalCodeChecker(value) || NOT_VALID_MESSAGE;
  },
};

// ONLY NUMBERS RULES
export const onlyNumbersRules = {
  pattern: {
    value: ONLY_NUMBERS_REGEX,
    message: NOT_VALID_MESSAGE,
  },
};

// ONLY PERSIAN ALPHABETS RULES
export const onlyPersianAlphabetsRules = {
  pattern: {
    value: PERSIAN_LETTERS_VALIDATION_REGEX,
    message: NOT_VALID_MESSAGE,
  },
};

// REQUIRED RULE
export const requiredRule = {
  required: REQUIRED_MESSAGE,
};

// MOBILE RULES
export const mobileRules = {
  pattern: {
    value: ONLY_NUMBERS_REGEX,
    message: NOT_VALID_MESSAGE,
  },
  minLength: {
    value: 11,
    message: NOT_VALID_MESSAGE,
  },
  maxLength: {
    value: 11,
    message: NOT_VALID_MESSAGE,
  },
};

// EMAIL RULES
export const emailRules = {
  pattern: {
    value: EMAIL_REGEX,
    message: NOT_VALID_MESSAGE,
  },
};

// POSTAL CODE RULES
export const postalCodeRules = {
  pattern: {
    value: ONLY_NUMBERS_REGEX,
    message: NOT_VALID_MESSAGE,
  },
  minLength: {
    value: 10,
    message: NOT_VALID_MESSAGE,
  },
  maxLength: {
    value: 10,
    message: NOT_VALID_MESSAGE,
  },
};

export const yearRules = {
  minLength: {
    value: 4,
    message: NOT_VALID_MESSAGE,
  },
  maxLength: {
    value: 4,
    message: NOT_VALID_MESSAGE,
  },
};
