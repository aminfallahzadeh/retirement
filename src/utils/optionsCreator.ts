/**
 * Creates an array of option objects from an array of data.
 * Each option object contains a `value` and a `label` based on the specified keys in the data array.
 *
 * @param data - An array of objects (of any shape) that will be transformed into options.
 * @param valueKey - The key in each object that corresponds to the value of the option.
 * @param labelKey - The key in each object that corresponds to the label of the option.
 *
 * @returns An array of objects, each containing a `value` and a `label` based on the provided keys.
 *
 * @example
 * const data = [
 *   { id: 1, name: 'Option 1' },
 *   { id: 2, name: 'Option 2' },
 *   { id: 3, name: 'Option 3' },
 * ];
 * const options = createOptions(data, 'id', 'name');
 * console.log(options);
 * // Output: [
 * //   { value: 1, label: 'Option 1' },
 * //   { value: 2, label: 'Option 2' },
 * //   { value: 3, label: 'Option 3' },
 * // ]
 */
export const createOptions = <T>(
  data: T[],
  valueKey: keyof T,
  labelKey: keyof T
) => {
  return data.map((item) => ({
    value: item[valueKey],
    label: item[labelKey],
  }));
};
