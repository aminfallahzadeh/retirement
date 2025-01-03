// STYLES
export const selectStyles = {
  container: (base) => ({
    ...base,
    position: "relative",
    height: "100%",
  }),
  control: (base, state) => ({
    ...base,
    fontFamily: "IranYekan",
    cursor: "pointer",
    fontSize: "12px",
    height: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "auto",
    textOverflow: "ellipsis",
    position: "relative",
    borderColor: "var(--color-input-border)",
  }),
  menu: (base) => ({
    ...base,
    fontFamily: "IranYekan",
    zIndex: "5",
  }),
  option: (base) => ({
    ...base,
    cursor: "pointer",
  }),
  menuList: (base) => ({
    ...base,
    fontFamily: "IranYekan",
    zIndex: "5",
  }),
};

// COMO SETTINGS
export const selectSettings = {
  noOptionsMessage: () => "موردی یافت نشد!",
  loadingMessage: () => "در حال بارگذاری ...",
};

// OPTIONS CREATOR
export const optionsGenerator = (data, valueKey, labelKey) => {
  return data.map((item) => ({
    value: item[valueKey],
    label: item[labelKey],
  }));
};
