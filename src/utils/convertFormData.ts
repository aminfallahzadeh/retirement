/* eslint-disable @typescript-eslint/no-explicit-any */

// IMPORTS
import { convertToPersianDate } from "@/helpers/dateConverter";
import { convertToEnglishNumber } from "@/helpers/numberConverter";

type Option = {
  value: string;
  label: string;
};

type OptionsMap = { [key: string]: Option[] };

export const processDataForView = (
  data: any,
  selectKeys: string[],
  dateKeys: string[],
  options: OptionsMap
) => {
  if (!data) return {};

  const transformedData = { ...data };

  Object.keys(transformedData).forEach((key) => {
    if (dateKeys.includes(key)) {
      transformedData[key] =
        transformedData[key] === null
          ? null
          : convertToPersianDate(transformedData[key]);
    } else if (selectKeys.includes(key)) {
      transformedData[key] =
        transformedData[key] === null
          ? null
          : options[key]?.find(
              (option: Option) => option.value === transformedData[key]
            );
    } else if (!transformedData[key]) {
      transformedData[key] = "";
    }
  });

  return transformedData;
};

export const processDataForRequest = (
  data: any,
  selectKeys: string[],
  dateKeys: string[],
  intKeys: string[],
  floatKeys: string[]
) => {
  const result = { ...data };

  // Process date fields
  dateKeys.forEach((key) => {
    if (data[key]) {
      const date = new Date(data[key]);
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
      result[key] = date;
    } else {
      result[key] = null;
    }
  });

  // Process option fields
  selectKeys.forEach((key) => {
    if (data[key] && data[key].value !== undefined) {
      result[key] = data[key].value;
    }
  });

  Object.keys(result).forEach((key) => {
    if (!dateKeys.includes(key) && !selectKeys.includes(key)) {
      result[key] = convertToEnglishNumber(data[key]);
    }
    if (result[key] == null || result[key] === "") {
      result[key] = null;
    }
    if (intKeys.includes(key)) {
      result[key] = result[key]
        ? parseInt(convertToEnglishNumber(result[key]))
        : null;
    }
    if (floatKeys.includes(key)) {
      result[key] = result[key]
        ? parseFloat(convertToEnglishNumber(result[key]))
        : null;
    }
  });

  return result;
};
