export const selectOptionsGenerator = <T>(
  data: T[],
  valueKey: keyof T,
  labelKey: keyof T
) => {
  return data.map((item) => ({
    value: item[valueKey],
    label: item[labelKey],
  }));
};
