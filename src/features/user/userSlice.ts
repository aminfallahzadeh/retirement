// IMPORTS
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  navPanelOpen: boolean;
} = {
  navPanelOpen: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setNavPanelOpen: (state, action) => {
      state.navPanelOpen = action.payload;
    },
  },
});

export const { setNavPanelOpen } = userSlice.actions;

export default userSlice.reducer;
