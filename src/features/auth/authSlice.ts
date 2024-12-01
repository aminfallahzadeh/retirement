// IMPORTS
import { createSlice } from "@reduxjs/toolkit";
import { storageHelper } from "@/helpers/storageHelper";

// CONSTS
const storage = storageHelper("session");

const initialState: {
  token: string | null;
  refreshToken: string | null;
  userID: string | null;
} = {
  token: (() => {
    const userInfo = storage.get("userInfo");
    return userInfo ? JSON.parse(userInfo).token : null;
  })(),
  refreshToken: (() => {
    const userInfo = storage.get("userInfo");
    return userInfo ? JSON.parse(userInfo).refreshToken : null;
  })(),

  userID: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, refreshToken } = action.payload.itemList[0];
      state.token = token;
      state.refreshToken = refreshToken;
      sessionStorage.setItem(
        "userInfo",
        JSON.stringify({
          token,
          refreshToken,
        })
      );
    },

    setNewCredentials: (state, action) => {
      const { token } = action.payload.itemList[0];
      const oldCredentials = JSON.parse(storage.get("userInfo"));
      state.token = token;
      sessionStorage.clear();
      sessionStorage.setItem(
        "userInfo",
        JSON.stringify({ ...oldCredentials, token })
      );
    },

    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      sessionStorage.removeItem("userInfo");
      sessionStorage.removeItem("permissions");
    },

    setUserID: (state, action) => {
      state.userID = action.payload;
    },
  },
});

export const { setCredentials, setNewCredentials, logout, setUserID } =
  authSlice.actions;

export default authSlice.reducer;
