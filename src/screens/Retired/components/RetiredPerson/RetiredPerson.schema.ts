// IMPORTS
import { FormStructure } from "@/shared/types/form";
import { NAME, FAMILY_NAME } from "@/constants/fields";
import {
  REQUIRED_MESSAGE,
  PERSIAN_LETTERS_MESSAGE,
} from "@/constants/messages";
import { PERSIAN_LETTERS_VALIDATION_REGEX } from "@/constants/regex";
import { INPUT_TYPES } from "@/constants/const";

export const RetiredPersonSchema: FormStructure[] = [
  {
    id: 1,
    label: NAME,
    name: NAME,
    type: INPUT_TYPES.TEXT,
    validators: {
      required: REQUIRED_MESSAGE,
      pattern: {
        value: PERSIAN_LETTERS_VALIDATION_REGEX,
        message: PERSIAN_LETTERS_MESSAGE,
      },
    },
  },
  {
    id: 2,
    label: FAMILY_NAME,
    name: FAMILY_NAME,
    type: INPUT_TYPES.TEXT,
    validators: {
      required: REQUIRED_MESSAGE,
      pattern: {
        value: PERSIAN_LETTERS_VALIDATION_REGEX,
        message: PERSIAN_LETTERS_MESSAGE,
      },
    },
  },
];
