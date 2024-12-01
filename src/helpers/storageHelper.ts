type StorageType = "session" | "local";

export const storageHelper = (type: StorageType) => {
  if (type === "session") {
    return {
      set(key: string, value: string) {
        sessionStorage.setItem(key, value);
      },
      get(key: string) {
        return sessionStorage.getItem(key);
      },
    };
  } else {
    return {
      set(key: string, value: string) {
        localStorage.setItem(key, value);
      },
      get(key: string) {
        return localStorage.getItem(key);
      },
    };
  }
};
