// IMPORTS
import { createSlice } from "@reduxjs/toolkit";
import { storageHelper } from "@/helpers/storageHelper";
import { jwtDecode, JwtPayload } from "jwt-decode";

// CONSTS
const storage = storageHelper("session");

const initialState: {
  token: string | null;
  refreshToken: string | null;
  firstName: string | null;
  lastName: string | null;
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

  firstName: (() => {
    const userInfo = storage.get("userInfo");
    return userInfo ? JSON.parse(userInfo).firstName : null;
  })(),

  lastName: (() => {
    const userInfo = storage.get("userInfo");
    return userInfo ? JSON.parse(userInfo).lastName : null;
  })(),
  userID: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, refreshToken } = action.payload.itemList[0];
      const decodedToken = jwtDecode(token) as JwtPayload & {
        name: string;
        familyName: string;
        id: string;
      };
      state.token = token;
      state.refreshToken = refreshToken;
      state.firstName = decodedToken.name;
      state.lastName = decodedToken.familyName;

      storage.set(
        "userInfo",
        JSON.stringify({
          token,
          refreshToken,
          firstName: decodedToken.name,
          lastName: decodedToken.familyName,
          userID: decodedToken.id,
        })
      );
    },

    setNewCredentials: (state, action) => {
      const { token } = action.payload.itemList[0];
      const oldCredentials = JSON.parse(storage.get("userInfo")!);
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
      state.firstName = null;
      state.lastName = null;
      sessionStorage.removeItem("userInfo");
    },

    setUserID: (state, action) => {
      state.userID = action.payload;
    },
  },
});

export const { setCredentials, setNewCredentials, logout, setUserID } =
  authSlice.actions;

export default authSlice.reducer;
